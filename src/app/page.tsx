
import React from "react";
import Branches from "./(landing)/Branches";
import Brands from "./(landing)/Brands";
import Categories from "./(landing)/Categories";
import Contact from "./(landing)/Contact";
import Footer from "./(landing)/Footer";
import Header from "./(landing)/Header";
import Hero from "./(landing)/Hero";

export default function Home() {
  return (
    <React.Fragment>
      <Header />

      <main>
        <Hero />
        <Categories />
        <Brands />
        <Branches />
        <Contact />
        <Footer />
      </main>
    </React.Fragment>
  );
}
