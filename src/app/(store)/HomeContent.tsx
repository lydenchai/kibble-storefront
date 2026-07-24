'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/hooks/useTranslation";
import ProductCard from "@/components/ui/ProductCard";
import { Truck, ShieldCheck, RefreshCw, Headset, Star, ArrowRight, Sparkles, CheckCircle2, Heart, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function HomeContent({ featuredProducts }: { featuredProducts: any[] }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you for subscribing! Check your inbox for 15% off.");
    setEmail("");
  };

  return (
    <div className="flex flex-col gap-16 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-50/80 via-amber-50/40 to-white pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-brand-200/70 shadow-xs text-xs font-semibold text-brand-700 mb-6 backdrop-blur-xs">
                  <Sparkles className="h-3.5 w-3.5 text-brand-500 fill-brand-500" />
                  <span>{t('home.heroBadge') || "🐾 Premium Nutrition & Pet Essentials"}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
                  {t('home.heroTitle')}
                </h1>

                <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                  {t('home.heroDesc')}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link 
                    href="/category/dog" 
                    className="px-8 py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-full hover:from-brand-700 hover:to-brand-600 transition-all duration-300 shadow-md shadow-brand-500/25 flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{t('home.shopDog')}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link 
                    href="/category/cat" 
                    className="px-8 py-3.5 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-50 border border-gray-200 transition-all duration-300 shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t('home.shopCat')}</span>
                  </Link>
                </div>

                {/* Social Proof Stats */}
                <div className="pt-6 border-t border-brand-200/50 flex flex-wrap items-center gap-6 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">4.9/5 Rating</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>25,000+ Happy Pet Parents</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Hero Image Badge Card */}
            <div className="lg:col-span-5 relative">
              <FadeIn direction="left" delay={0.2}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Outer Glow Circle */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-300 to-amber-300 rounded-3xl blur-2xl opacity-40 animate-pulse" />
                  
                  {/* Hero Main Card */}
                  <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100/80 overflow-hidden">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-50 mb-6">
                      <Image
                        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800"
                        alt="Happy Dog with Pet Food"
                        fill
                        priority
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-brand-700 shadow-sm border border-white/60">
                        ⭐️ Bestseller
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Featured Dog Nutrition</p>
                        <h3 className="text-lg font-bold text-gray-900 mt-0.5">Organic Salmon & Rice Kibble</h3>
                      </div>
                      <Link 
                        href="/products" 
                        className="p-3 rounded-full bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>

        {/* Decorative blur blobs */}
        <div className="absolute top-10 right-0 w-96 h-96 bg-brand-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      </section>

      {/* Trust & Feature Highlights Bar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Truck, title: "Free Express Shipping", desc: "On all orders over $49", color: "text-brand-600 bg-brand-50" },
            { icon: ShieldCheck, title: "100% Vet Approved", desc: "Certified natural ingredients", color: "text-emerald-600 bg-emerald-50" },
            { icon: RefreshCw, title: "30-Day Money Back", desc: "Hassle-free return policy", color: "text-sky-600 bg-sky-50" },
            { icon: Headset, title: "24/7 Pet Care Support", desc: "Expert advice anytime", color: "text-purple-600 bg-purple-50" },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`p-3.5 rounded-xl ${item.color} shrink-0`}>
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Shop By Category */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <FadeIn className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{t('home.categories') || "Shop by Category"}</h2>
          <p className="text-gray-500 text-sm mt-2">Tailored food, treats, and toys carefully selected for your beloved companions</p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { nameKey: "home.catDogFood", href: "/category/dog?type=food", icon: "🦴", color: "from-amber-50 to-orange-100/60", border: "hover:border-amber-300", badge: "120+ Products" },
            { nameKey: "home.catCatFood", href: "/category/cat?type=food", icon: "🐟", color: "from-sky-50 to-teal-100/60", border: "hover:border-sky-300", badge: "95+ Products" },
            { nameKey: "home.catTreats", href: "/category/all?type=treats", icon: "🍖", color: "from-yellow-50 to-amber-100/60", border: "hover:border-yellow-300", badge: "60+ Treats" },
            { nameKey: "home.catAccessories", href: "/category/all?type=accessories", icon: "🎾", color: "from-purple-50 to-indigo-100/60", border: "hover:border-purple-300", badge: "150+ Items" },
          ].map((cat, index) => (
            <FadeIn key={cat.href} delay={index * 0.1}>
              <Link 
                href={cat.href} 
                className={`group flex flex-col items-center p-6 bg-gradient-to-b ${cat.color} rounded-2xl border border-gray-100 ${cat.border} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-brand-600 transition-colors">
                  {t(cat.nameKey)}
                </h3>
                <span className="text-xs font-medium text-gray-500 mt-1">{cat.badge}</span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="left" className="flex items-end justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">Top Rated Essentials</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{t('home.featuredProducts')}</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors group">
            <span>{t('general.viewAll') || "View All Products"}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
        
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <FadeIn key={product._id} delay={index * 0.08}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4">{t('general.noData')}</p>
          </div>
        )}
      </section>

      {/* Pet Parents Reviews / Testimonials */}
      <section className="bg-gray-50/80 py-16 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">Loved By Thousands</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">What Pet Parents Say</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Jenkins",
                role: "Golden Retriever Owner",
                comment: "Kibble's organic salmon formula completely transformed my dog's coat and energy levels! Delivery is always right on time.",
                rating: 5,
                pet: "Golden Retriever 🐕"
              },
              {
                name: "Marcus Vance",
                role: "Cat Lover",
                comment: "My cats are extremely picky eaters, but they devoured the Kibble gourmet wet food instantly. Highly recommend subscription!",
                rating: 5,
                pet: "2 Siamese Cats 🐈"
              },
              {
                name: "Emily Watson",
                role: "French Bulldog Parent",
                comment: "Customer support is top notch! Helped me pick the hypoallergenic treats for my puppy. 10/10 quality and care.",
                rating: 5,
                pet: "Frenchie 🐶"
              }
            ].map((review, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="flex text-amber-400 mb-4">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">"{review.comment}"</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                      {review.pet}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Subscription Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <FadeIn className="relative bg-gradient-to-r from-brand-900 via-brand-800 to-amber-900 rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-2xl">
          {/* Decorative Glow Blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold mb-4 backdrop-blur-xs border border-white/10">
              <Mail className="h-3.5 w-3.5 text-brand-400" /> Exclusive Newsletter Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Subscribe & Save 15% On First Order
            </h2>
            <p className="text-brand-100/90 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Get secret discounts, expert vet nutrition tips, and new product releases delivered straight to your inbox.
            </p>

            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-6 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>You're subscribed! Use code <strong className="text-white">KIBBLE15</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-5 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 shadow-md"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 px-8 py-3.5 bg-gradient-to-r from-brand-500 to-amber-500 text-white font-bold rounded-full hover:from-brand-600 hover:to-amber-600 transition-all duration-300 shadow-lg cursor-pointer text-sm"
                >
                  Join & Save
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
