import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WinnersTicker from "@/components/WinnersTicker";
import Sponsors from "@/components/Sponsors";
import Offers from "@/components/Offers";
import Giveaways from "@/components/Giveaways";
import Videos from "@/components/Videos";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WinnersTicker />
        <Giveaways />
        <Offers />
        <Videos />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
