import Brands from "./(landing)/Brands";
import Categories from "./(landing)/Categories";
import HeroSection from "./(landing)/Hero";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Categories />
      <Brands/>
    </main>
  );
}
