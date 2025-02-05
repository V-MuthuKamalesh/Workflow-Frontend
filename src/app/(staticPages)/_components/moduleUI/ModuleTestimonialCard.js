export default function ModuleTestimonialCard({ quote, author, role }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
      <h3 className="text-lg sm:text-xl font-semibold text-purple-400">{author}</h3>
      <p className="text-sm text-gray-600 italic">{role}</p>
      <p className="text-sm sm:text-base text-gray-700 mt-4">“{quote}”</p>
    </div>
  );
}
