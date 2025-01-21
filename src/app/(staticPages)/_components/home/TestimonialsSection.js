import Image from "next/image";

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Mark Zuckerberg",
      role: "CEO, Meta",
      feedback:
        "The tools provided have made project management seamless and collaboration effortless. Highly recommend!",
      image: "/mark.png",
    },
    {
      name: "Elon Musk",
      role: "CEO, Tesla Motors",
      feedback:
        "This platform has revolutionized the way we work. The efficiency and results we've seen are unmatched!",
      image: "/elon.webp",
    },
    {
      name: "Bill Gates",
      role: "CEO, Microsoft Corporation",
      feedback:
        "Their support and expertise have been invaluable in scaling our operations globally. Truly exceptional.",
      image: "/gates.webp",
    },
  ];

  return (
    <div className="mt-20 mx-32">
      <h1 className="text-4xl text-purple-400 text-center font-bold leading-tight mb-8">
        What Our Clients Say
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                height={100}
                width={100}
                className="w-24 h-24 rounded-full mx-auto mb-4 transform transition-transform hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-purple-400">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-600 italic">{testimonial.role}</p>
            <p className="text-sm text-gray-700 mt-4">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
