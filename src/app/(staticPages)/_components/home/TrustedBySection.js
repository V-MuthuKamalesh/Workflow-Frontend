import Image from "next/image";

export default function TrustedBySection() {
  const logos = [
    { src: "/codingmart.jpg", alt: "Codingmart logo" },
    { src: "/finestcoder.webp", alt: "Finest coder logo" },
    { src: "/quickrecruit.png", alt: "Quick Recruit logo" },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-28 py-12 bg-gradient-to-br from-zinc-900 to-gray-800 text-white rounded-lg shadow-lg">
      <div className="text-center space-y-5">
        <h1 className="text-3xl font-extrabold text-purple-400">
          Trusted By The Best
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Join a growing community of industry leaders and innovators who trust
          us to deliver excellence.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md transform transition duration-300 hover:scale-105"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              className={
                index === 1
                  ? "-mt-2 rounded-md"
                  : index === 2
                  ? "-mt-1 rounded-md"
                  : "rounded-md"
              }
              height={120}
              width={120}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
