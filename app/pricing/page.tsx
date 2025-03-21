import Footer from "@/components/marketing/Footer";
import Pricing from "@/components/marketing/pricing";
import Nav2 from "@/components/marketing/Nav2";

const PricingPage = () => {
  return (
    <>
      <Nav2 />
      <main className="min-h-screen">
        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default PricingPage;
