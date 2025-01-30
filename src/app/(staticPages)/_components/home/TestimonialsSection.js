import Image from "next/image";

export default function Testimonials() {
  const testimonialsData = [
    {
      name: "Karthikeyan",
      role: "Branch Head, Finestcoder",
      feedback: "The tools provided have made project management seamless and collaboration effortless. Highly recommend!",
      image: "/karthikeyan.jpeg",
    },
    {
      name: "Arshad Ali",
      role: "Head of Training, Finestcoder",
      feedback: "This platform has revolutionized the way we work. The efficiency and results we've seen are unmatched!",
      image: "/arshad.jpeg",
    },
    {
      name: "Thamizharasan",
      role: "Head of Operations, Finestcoder",
      feedback: "Their support and expertise have been invaluable in scaling our operations globally. Truly exceptional.",
      image: "/tamil.png",
    },
  ];

  return (
    <div className="mt-16 sm:mt-20 mx-6 sm:mx-32">
      <h1 className="text-3xl sm:text-4xl text-purple-400 text-center font-bold leading-tight mb-6 sm:mb-8">What Our Clients Say</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="relative">
              <Image src={testimonial.image} alt={testimonial.name} height={100} width={100} className="w-24 h-24 rounded-full mx-auto mb-4 transform transition-transform hover:scale-110" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-purple-400">{testimonial.name}</h3>
            <p className="text-sm text-gray-600 italic">{testimonial.role}</p>
            <p className="text-sm sm:text-base text-gray-700 mt-4">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
