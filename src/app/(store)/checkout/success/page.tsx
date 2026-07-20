import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Order Confirmed!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your purchase. Your furry friend is going to love it!
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
            Order number: <span className="font-bold">#KBL-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="/account/orders"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            View Order Status
          </Link>
          <Link
            href="/"
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
