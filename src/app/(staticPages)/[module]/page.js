import { cookies } from "next/headers";
import { moduleStaticPagesData } from "./data";
import FeaturesSection from "../_components/moduleUI/FeaturesSection";
import ModuleHeroSection from "../_components/moduleUI/ModuleHeroSection";
import ModuleImpactSection from "../_components/moduleUI/ModuleImpactSection";
import ModuleTestimonials from "../_components/moduleUI/ModuleTestimonials";

export default async function ModulePageUI({ params }) {
  const { module } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || null;

  const moduleData = moduleStaticPagesData.find((data) => data.module === module);
  if (!moduleData) return <div className="text-center text-lg font-semibold mt-10">Module not found</div>;

  const { title, description, imageUrl, colorSchemes, features, testimonials, impact } = moduleData;

  return (
    <section className={`${colorSchemes.bg} ${colorSchemes.border} min-h-screen py-10 px-4 sm:px-6 md:px-10`}>
      <ModuleHeroSection userId={userId} moduleData={{ module, title, description, imageUrl, colorSchemes }} />
      <FeaturesSection features={features} />
      <ModuleImpactSection impact={impact} />
      <ModuleTestimonials testimonials={testimonials} />
    </section>
  );
}
