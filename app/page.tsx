import Hero from "@/sections/Hero";
import Categories from "@/sections/Categories";
import FeaturedProducts from "@/sections/FeaturedProducts";
import Reviews from "@/sections/Reviews";
import Location from "@/sections/Location";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Reviews />
      <Location />
      <Contact />
    </main>
  );
}
