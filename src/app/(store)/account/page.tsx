"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Heart } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { fetchUserOrdersAction, fetchWishlistAction } from "@/actions/account.actions";
import AccountSidebar from "@/components/account/AccountSidebar";
import { useTranslation } from "@/hooks/useTranslation";

export default function AccountDashboard() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ totalOrders: 0, savedItems: 0, recentOrders: [] as any[] });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  useEffect(() => {
    if (!mounted || !user) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const [ordersRes, wishlistRes] = await Promise.all([
          fetchUserOrdersAction(1, 5, token),
          fetchWishlistAction(token)
        ]);

        if (ordersRes.error) throw new Error(ordersRes.error);
        if (wishlistRes.error) throw new Error(wishlistRes.error);

        setStats({
          totalOrders: ordersRes.pagination?.total || 0,
          recentOrders: ordersRes.data || [],
          savedItems: wishlistRes.data?.wishlist?.length || 0
        });
      } catch (error) {
        console.warn("Failed to fetch account data", error);
      }
    };
    fetchData();
  }, [mounted, user]);

  if (!mounted || !user) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-6">
        <AccountSidebar />

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('account.welcomeBack')}, {user.name.split(" ")[0]}!
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-8 flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {t('account.totalOrders')}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-8 flex items-center gap-6">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{t('account.savedItems')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.savedItems}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-8 flex items-center gap-6">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🦴</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{t('account.points')}</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 overflow-hidden">
            <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{t('account.recentOrders')}</h2>
              <Link
                href="/account/orders"
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                {t('account.viewAllOrders')} &rarr;
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {stats.recentOrders.length > 0 ? (
                    stats.recentOrders.map((order) => {
                      let statusColor = "bg-yellow-100 text-yellow-800";
                      if (order.status === "shipped" || order.status === "delivered") statusColor = "bg-green-100 text-green-800";
                      else if (order.status === "cancelled") statusColor = "bg-red-100 text-red-800";

                      return (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            #{order._id.slice(-8).toUpperCase()}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No recent orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
