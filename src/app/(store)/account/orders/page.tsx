'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchUserOrdersAction } from '@/actions/account.actions';
import AccountSidebar from '@/components/account/AccountSidebar';
import { Order } from '@/types/order';

const statusConfig: Record<Order['status'], { label: string; color: string; icon: React.ElementType }> = {
  pending:    { label: 'Pending',    color: 'bg-gray-50 text-gray-600', icon: Clock },
  processing: { label: 'Processing', color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
  shipped:    { label: 'Shipped',    color: 'bg-gray-200 text-gray-900', icon: Truck },
  delivered:  { label: 'Delivered',  color: 'bg-black text-white',       icon: CheckCircle },
  cancelled:  { label: 'Cancelled',  color: 'bg-gray-50 text-gray-400 line-through', icon: XCircle },
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
        if (res.error) throw new Error(res.error);
        setOrders(res.data || []);
        setTotalPages(res.pagination?.pages || 1);
        setTotal(res.pagination?.total || 0);
      } catch (err: any) {
        console.warn('Orders fetch error:', err);
        const errorMsg = err.message || 'Failed to load orders. Please try again.';
        if (errorMsg === 'Invalid or expired token' || errorMsg === 'Unauthorized') {
          useAuthStore.getState().logout();
          router.push('/login?redirect=/account/orders');
          return;
        }
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [mounted, user, page, router]);

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
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-1/4 mb-3" />
                  <div className="h-3 bg-gray-50 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
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
            <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4 stroke-1" />
              <h2 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h2>
              <p className="text-gray-500 text-sm mb-6">When you place an order, it will appear here.</p>
              <Link
                href="/products"
                className="inline-block bg-black text-white font-medium px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
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
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-gray-50">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                            <p className="font-mono text-gray-900 text-sm">
                              #{order._id.slice(-8).toUpperCase()}
                            </p>
                          </div>
                          <div className="h-8 w-px bg-gray-100" />
                          <div>
                            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1">Placed</p>
                            <p className="text-sm text-gray-900">{date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.label}
                          </span>
                          <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="px-6 py-5">
                        <div className="space-y-3">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 truncate max-w-[70%]">
                                {item.name}
                                <span className="text-gray-400 ml-2 text-xs">× {item.quantity}</span>
                              </span>
                              <span className="text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="text-xs text-gray-400 pt-2">
                              +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-4 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-500">
                        <div className="flex gap-6">
                          {order.discount > 0 && (
                            <span>Discount: <span className="text-gray-900">-${order.discount.toFixed(2)}</span></span>
                          )}
                          <span>Shipping: <span className="text-gray-900">${order.shipping.toFixed(2)}</span></span>
                          <span>Tax: <span className="text-gray-900">${order.tax.toFixed(2)}</span></span>
                        </div>
                        <Link href={`/account/orders/${order._id}`} className="flex items-center gap-1 text-gray-900 hover:text-gray-600 font-medium transition-colors">
                          View Details <ChevronRight className="h-4 w-4" />
                        </Link>
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
