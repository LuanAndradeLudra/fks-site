import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WinnersTicker from "@/components/WinnersTicker";
import Giveaways from "@/components/Giveaways";
import Offers from "@/components/Offers";
import Videos from "@/components/Videos";
import TwitchPanels from "@/components/TwitchPanels";
import Sponsors from "@/components/Sponsors";
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
        {/* <TwitchPanels /> */}
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
