import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  
  // MOCK FETCH
  const productTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: productTitle,
    description: `Buy ${productTitle} - The best quality for your pet.`,
    openGraph: {
      title: productTitle,
      description: `Buy ${productTitle} - The best quality for your pet.`,
      images: ['/product-placeholder.png'],
    }
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Mock fetch product data
  // In a real app: const res = await fetch(`http://localhost:5000/api/products/${slug}`);
  const product = {
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: "This is a premium product designed to provide the best nutrition and entertainment for your furry friend.",
    price: 29.99,
    image: "/next.svg", // Using next.svg as a placeholder image
    inStock: true,
    sku: `SKU-${slug.toUpperCase()}`
  };

  if (!product) {
    notFound();
  }

  // Generate Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://kibble.com${product.image}`,
    "description": product.description,
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "url": `https://kibble.com/products/${slug}`,
      "priceCurrency": "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image - Performance & A11y */}
        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={`Image of ${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // Critical for LCP
            className="object-contain p-8"
          />
        </div>

        {/* Product Info - A11y & Semantic HTML */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl text-gray-900 font-semibold mb-6">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="mt-auto">
            <button 
              className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-full hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
