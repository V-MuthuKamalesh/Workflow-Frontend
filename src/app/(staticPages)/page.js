import { Widgets } from "@mui/icons-material";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import AboutCard from "../_components/home/AboutCard";
import { Handshake, Settings2 } from "lucide-react";
import ImpactCard from "../_components/home/ImpactCard";
import Testimonials from "../_components/home/TestimonialsSection";
import CallToAction from "../_components/home/CallToActionSection";
import TrustedBySection from "../_components/home/TrustedBySection";
import OurImpactSection from "../_components/home/OurImpactSection";
import WhyChooseUsSection from "../_components/home/WhyChooseUs";
import HeroSection from "../_components/home/HeroSection";

export default async function HomePage() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value || null;

  return (
    <section className="bg-violet-100 border border-violet-50 rounded-3xl min-h-screen mb-10 mt-2 pt-10">
      <HeroSection userId={userId} />
      <TrustedBySection />
      <OurImpactSection />
      <WhyChooseUsSection />
      <Testimonials />
      <CallToAction />
    </section>
  );
}
