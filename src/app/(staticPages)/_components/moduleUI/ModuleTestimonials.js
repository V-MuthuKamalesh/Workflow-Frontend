import ModuleTestimonialCard from "./ModuleTestimonialCard";

export default function ModuleTestimonials({ testimonials }) {
  return (
    <div className="mt-16 sm:mt-20 mx-6 sm:mx-32">
      <h1 className="text-3xl sm:text-4xl text-purple-400 text-center font-bold leading-tight mb-6 sm:mb-8">
        What Our Clients Say
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <ModuleTestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
}
