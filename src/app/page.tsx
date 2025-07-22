import { HeroSlider } from '@/components/HeroSlider';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Testimonials } from '@/components/Testimonials';
import { CustomizationShowcase } from '@/components/CustomizationShowcase';

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <FeaturedProducts />
      <Testimonials />
      <CustomizationShowcase />
    </main>
  );
}
