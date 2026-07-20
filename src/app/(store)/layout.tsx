import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
    </>
  );
}
