import { cookies } from "next/headers";
import Testimonials from "./_components/home/TestimonialsSection";
import CallToAction from "./_components/home/CallToActionSection";
import TrustedBySection from "./_components/home/TrustedBySection";
import OurImpactSection from "./_components/home/OurImpactSection";
import WhyChooseUsSection from "./_components/home/WhyChooseUs";
import HeroSection from "./_components/home/HeroSection";

export default async function HomePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || null;

  return (
    <section className="bg-purple-100 border border-purple-50 min-h-screen mb-10 pt-10 px-4 sm:px-6 md:px-10">
      <HeroSection userId={userId} />
      <TrustedBySection />
      <OurImpactSection />
      <WhyChooseUsSection />
      <Testimonials />
      <CallToAction userId={userId} />
    </section>
  );
}
