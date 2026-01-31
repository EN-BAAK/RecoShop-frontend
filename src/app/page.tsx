import Branches from "./(landing)/Branches";
import Brands from "./(landing)/Brands";
import Categories from "./(landing)/Categories";
import Contact from "./(landing)/Contact";
import Footer from "./(landing)/Footer";
import HeroSection from "./(landing)/Hero";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Categories />
      <Brands />
      <Branches />
      <Contact />
      <Footer />
    </main>
  );
}
