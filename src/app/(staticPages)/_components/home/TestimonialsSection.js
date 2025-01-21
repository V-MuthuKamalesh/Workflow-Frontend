import Image from "next/image";

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Karthikeyan",
      role: "Branch Head, Finestcoder",
      feedback:
        "The tools provided have made project management seamless and collaboration effortless. Highly recommend!",
      image: "/karthikeyan.jpeg",
    },
    {
      name: "Arshad Ali",
      role: "Head of Training, Codingmart",
      feedback:
        "This platform has revolutionized the way we work. The efficiency and results we've seen are unmatched!",
      image: "/arshad.jpeg",
    },
    {
      name: "Nihila Rangasamy",
      role: "Human Resource, Finestcoder",
      feedback:
        "Their support and expertise have been invaluable in scaling our operations globally. Truly exceptional.",
      image:
        "https://ca.slack-edge.com/T07MJ97HCD9-U07N7M8HQGY-85fd0dba6d71-512",
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
