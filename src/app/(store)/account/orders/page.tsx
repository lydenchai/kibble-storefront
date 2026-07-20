'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchUserOrdersAction } from '@/actions/account.actions';
import AccountSidebar from '@/components/account/AccountSidebar';

interface OrderItem {
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  createdAt: string;
}

const statusConfig: Record<Order['status'], { label: string; color: string; icon: React.ElementType }> = {
  pending:    { label: 'Pending',    color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800',    icon: AlertCircle },
  shipped:    { label: 'Shipped',    color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered:  { label: 'Delivered',  color: 'bg-green-100 text-green-800',  icon: CheckCircle },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-800',      icon: XCircle },
};

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) router.push('/login');
  }, [mounted, user, router]);

  useEffect(() => {
    if (!mounted || !user) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetchUserOrdersAction(page, 8, token);
        setOrders(res.data || []);
        setTotalPages(res.pagination?.pages || 1);
        setTotal(res.pagination?.total || 0);
      } catch {
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [mounted, user, page]);

  if (!mounted || !user) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-6">
        <AccountSidebar />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            {total > 0 && (
              <span className="text-sm text-gray-500">{total} order{total !== 1 ? 's' : ''} total</span>
            )}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-100/50 p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
              <p className="text-red-700 font-medium">{error}</p>
              <button
                onClick={() => setPage(1)}
                className="mt-4 text-sm text-red-600 hover:underline cursor-pointer"
              >
                Try again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-100/50 p-16 text-center">
              <Package className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
              <p className="text-gray-500 text-sm mb-6">When you place an order, it will appear here.</p>
              <Link
                href="/products"
                className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {orders.map((order) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;
                  const date = new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  });

                  return (
                    <div
                      key={order._id}
                      className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-100/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                            <p className="font-mono font-semibold text-gray-900 text-sm">
                              #{order._id.slice(-8).toUpperCase()}
                            </p>
                          </div>
                          <div className="h-8 w-px bg-gray-200" />
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Placed</p>
                            <p className="text-sm text-gray-700">{date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.label}
                          </span>
                          <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="px-6 py-4">
                        <div className="space-y-2">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700 truncate max-w-[60%]">
                                {item.name}
                                <span className="text-gray-400 ml-1 text-xs">× {item.quantity}</span>
                              </span>
                              <span className="text-gray-600 font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="text-xs text-gray-400">
                              +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-3 bg-gray-50/40 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <div className="flex gap-4">
                          {order.discount > 0 && (
                            <span>Discount: <span className="text-green-600">-${order.discount.toFixed(2)}</span></span>
                          )}
                          <span>Shipping: ${order.shipping.toFixed(2)}</span>
                          <span>Tax: ${order.tax.toFixed(2)}</span>
                        </div>
                        <button className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium cursor-pointer">
                          Details <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex justify-center items-center mt-8 gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    ← Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        page === n
                          ? 'bg-brand-600 text-white'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Next →
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
