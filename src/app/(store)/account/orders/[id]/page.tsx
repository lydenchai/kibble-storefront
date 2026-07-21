'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, CheckCircle, Truck, XCircle, AlertCircle, Package } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchUserOrderByIdAction } from '@/actions/account.actions';
import AccountSidebar from '@/components/account/AccountSidebar';
import { Order } from '@/types/order';
import { useTranslation } from '@/hooks/useTranslation';

const statusConfig: Record<Order['status'], { labelKey: string; color: string; icon: React.ElementType }> = {
  pending:    { labelKey: 'orders.pending',    color: 'bg-gray-50 text-gray-600', icon: Clock },
  processing: { labelKey: 'orders.processing', color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
  shipped:    { labelKey: 'orders.shipped',    color: 'bg-gray-200 text-gray-900', icon: Truck },
  delivered:  { labelKey: 'orders.delivered',  color: 'bg-black text-white',       icon: CheckCircle },
  cancelled:  { labelKey: 'orders.cancelled',  color: 'bg-gray-50 text-gray-400 line-through', icon: XCircle },
};

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'tracking'>('details');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) router.push('/login');
  }, [mounted, user, router]);

  useEffect(() => {
    if (!mounted || !user || !params?.id) return;

    const fetchOrder = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetchUserOrderByIdAction(params.id as string, token);
        if (res.error) throw new Error(res.error);
        setOrder(res.data);
      } catch (err: any) {
        console.warn('Order fetch error:', err);
        const errorMsg = err.message || 'Failed to load order details.';
        if (errorMsg === 'Invalid or expired token' || errorMsg === 'Unauthorized') {
          useAuthStore.getState().logout();
          router.push(`/login?redirect=/account/orders/${params.id}`);
          return;
        }
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [mounted, user, params?.id, router]);

  if (!mounted || !user) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-6">
        <AccountSidebar />

        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              {t('orders.backToOrders')}
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t('orders.orderDetails')}</h1>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
              {/* Header Skeleton */}
              <div className="px-6 py-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="h-6 bg-gray-100 rounded w-48 mb-2" />
                  <div className="h-4 bg-gray-50 rounded w-64" />
                </div>
                <div className="h-8 bg-gray-100 rounded-full w-28" />
              </div>

              {/* Tabs Skeleton */}
              <div className="px-6 border-b border-gray-50 flex gap-6">
                <div className="py-4">
                  <div className="h-5 bg-gray-100 rounded w-24" />
                </div>
                <div className="py-4">
                  <div className="h-5 bg-gray-100 rounded w-20" />
                </div>
              </div>

              {/* Items Skeleton */}
              <div className="px-6 py-6 border-b border-gray-50">
                <div className="h-5 bg-gray-100 rounded w-16 mb-4" />
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gray-100 rounded-lg flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                        <div className="h-3 bg-gray-50 rounded w-16" />
                      </div>
                      <div className="h-4 bg-gray-100 rounded w-16" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Skeleton */}
              <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="h-5 bg-gray-100 rounded w-32 mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-50 rounded w-full" />
                    <div className="h-3 bg-gray-50 rounded w-3/4" />
                  </div>
                </div>
                <div>
                  <div className="h-5 bg-gray-100 rounded w-32 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 bg-gray-50 rounded w-16" />
                        <div className="h-4 bg-gray-50 rounded w-12" />
                      </div>
                    ))}
                    <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                      <div className="h-5 bg-gray-100 rounded w-12" />
                      <div className="h-6 bg-gray-100 rounded w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : error || !order ? (
            <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
              <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
              <p className="text-red-700 font-medium">{error || 'Order not found'}</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{t('orders.orderId')} #{order._id.slice(-8).toUpperCase()}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('orders.placed')} {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                {(() => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;
                  return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {t(status.labelKey)}
                    </span>
                  );
                })()}
              </div>

              {/* Tabs */}
              <div className="px-6 border-b border-gray-100 flex gap-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {t('orders.orderDetails')}
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'tracking'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {t('orders.tracking')}
                </button>
              </div>

              {activeTab === 'details' ? (
                <>
                  {/* Items */}
              <div className="px-6 py-6 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{t('orders.items')}</h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      {item.image ? (
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <Package className="h-6 w-6 text-gray-300" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        {item.slug || item.product ? (
                          <Link href={`/products/${item.slug || item.product}`} className="text-sm font-medium text-gray-900 hover:text-brand-600 truncate block">
                            {item.name}
                          </Link>
                        ) : (
                          <span className="text-sm font-medium text-gray-900 truncate block">
                            {item.name}
                          </span>
                        )}
                        <p className="text-sm text-gray-500 mt-0.5">{t('orders.qty')}: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary & Addresses */}
              <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-50">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{t('orders.shippingAddress')}</h3>
                  <div className="text-sm text-gray-900 space-y-1">
                    <p>
                      {[
                        order.shippingAddress?.street,
                        order.shippingAddress?.village,
                        order.shippingAddress?.commune,
                        order.shippingAddress?.district,
                        order.shippingAddress?.province,
                        order.shippingAddress?.country
                      ].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{t('orders.summary')}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>{t('orders.subtotal')}</span>
                      <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>{t('orders.shipping')}</span>
                      <span className="text-gray-900">${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>{t('orders.tax')}</span>
                      <span className="text-gray-900">${order.tax.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-gray-900">
                        <span>{t('orders.discount')}</span>
                        <span>-${order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{t('orders.total')}</span>
                      <span className="font-semibold text-lg text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              </>
              ) : (
                <div className="px-6 py-8">
                  <div className="max-w-2xl">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t('orders.trackingHistory')}</h3>
                      {order.trackingNumber && (
                        <div className="text-right">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('orders.trackingDetails')}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{order.courier || 'Courier'}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm font-mono text-gray-600">{order.trackingNumber}</span>
                            {order.trackingUrl && (
                              <Link href={order.trackingUrl} target="_blank" className="ml-2 text-brand-600 hover:text-brand-700 text-sm font-medium">
                                {t('orders.track')}
                              </Link>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative pl-10 border-l border-gray-100 space-y-10 mt-8 ml-2">
                      {/* Order Placed Step */}
                      <div className="relative">
                        <div className="absolute w-8 h-8 -left-[56.5px] flex items-center justify-center rounded-full bg-black text-white ring-8 ring-white">
                          <Clock className="h-3.5 w-3.5" />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900">{t('orders.orderPlaced')}</h4>
                        <p className="text-sm text-gray-500 mt-1">{t('orders.receivedOrder')}</p>
                      </div>

                      {/* Processing Step */}
                      <div className="relative">
                        <div className={`absolute w-8 h-8 -left-[56.5px] flex items-center justify-center rounded-full ring-8 ring-white transition-all duration-300 ${
                          ['processing', 'shipped', 'delivered'].includes(order.status)
                            ? 'bg-black text-white'
                            : 'bg-white border border-gray-200 text-gray-400'
                        }`}>
                          <Package className="h-3.5 w-3.5" />
                        </div>
                        <h4 className={`text-sm font-semibold ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'text-gray-900' : 'text-gray-400'}`}>{t('orders.processing')}</h4>
                        <p className={`text-sm mt-1 transition-colors ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'text-gray-500' : 'text-gray-400'}`}>
                          {['processing', 'shipped', 'delivered'].includes(order.status) ? t('orders.preparingOrder') : t('orders.pendingProcessing')}
                        </p>
                      </div>

                      {/* Shipped Step */}
                      <div className="relative">
                        <div className={`absolute w-8 h-8 -left-[56.5px] flex items-center justify-center rounded-full ring-8 ring-white transition-all duration-300 ${
                          ['shipped', 'delivered'].includes(order.status) 
                            ? 'bg-black text-white' 
                            : 'bg-white border border-gray-200 text-gray-400'
                        }`}>
                          <Truck className="h-3.5 w-3.5" />
                        </div>
                        <h4 className={`text-sm font-semibold ${['shipped', 'delivered'].includes(order.status) ? 'text-gray-900' : 'text-gray-400'}`}>{t('orders.shipped')}</h4>
                        <p className={`text-sm mt-1 transition-colors ${['shipped', 'delivered'].includes(order.status) ? 'text-gray-500' : 'text-gray-400'}`}>
                          {['shipped', 'delivered'].includes(order.status) ? t('orders.onTheWay') : t('orders.waitingShipped')}
                        </p>
                      </div>

                      {/* Delivered Step */}
                      <div className="relative">
                        <div className={`absolute w-8 h-8 -left-[56.5px] flex items-center justify-center rounded-full ring-8 ring-white transition-all duration-300 ${
                          order.status === 'delivered' 
                            ? 'bg-black text-white' 
                            : 'bg-white border border-gray-200 text-gray-400'
                        }`}>
                          <CheckCircle className="h-3.5 w-3.5" />
                        </div>
                        <h4 className={`text-sm font-semibold ${order.status === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>{t('orders.delivered')}</h4>
                        <p className={`text-sm mt-1 transition-colors ${order.status === 'delivered' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {order.status === 'delivered' ? t('orders.orderDelivered') : t('orders.waitingDelivery')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
