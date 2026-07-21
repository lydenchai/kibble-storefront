import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlugAction } from '@/actions/product.actions';
import ProductActions from '@/components/product/ProductActions';
import ProductRating from '@/components/product/ProductRating';
import ShareButton from '@/components/product/ShareButton';
import ClientTranslate from '@/components/ui/ClientTranslate';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugAction(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.length > 0 ? [product.images[0]] : ['/product-placeholder.png'],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlugAction(slug);

  if (!product) {
    notFound();
  }

  // Calculate price range
  const prices = product.variants?.map(v => v.price) || [0];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceDisplay = minPrice === maxPrice ? `$${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;

  // Generate Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.[0] ? product.images[0] : `https://kibble.com/product-placeholder.png`,
    "description": product.description,
    "sku": product.variants?.[0]?.sku || product._id,
    "offers": {
      "@type": "Offer",
      "url": `https://kibble.com/products/${slug}`,
      "priceCurrency": "USD",
      "price": minPrice,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square bg-white rounded-xl border border-gray-100">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-contain p-8"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <span className="text-6xl">🐾</span>
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button key={i} className={`relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg border cursor-pointer ${i === 0 ? 'border-brand-500' : 'border-gray-200'}`}>
                  <Image src={img} alt={`${product.name} ${i+1}`} fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <div className="text-sm font-bold text-brand-600 tracking-widest uppercase mb-2">{product.brand}</div>
            <div className="flex justify-between items-start gap-4 mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.name}</h1>
              <ShareButton />
            </div>
            
            <div className="mb-4">
              <ProductRating rating={product.ratingAvg || 0} count={product.ratingCount || 0} />
            </div>
          </div>
          
          <div className="prose prose-sm sm:prose text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <ProductActions product={product} />
          
          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center text-accent-600">🚚</div>
              <span className="text-sm font-medium text-gray-700">
                <ClientTranslate translationKey="product.freeShipping" />
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">⭐</div>
              <span className="text-sm font-medium text-gray-700">
                <ClientTranslate translationKey="product.guarantee" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
