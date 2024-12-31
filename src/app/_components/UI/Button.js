export default function Button({ buttonText }) {
  return (
    <button className="w-full text-white bg-blue-600 hover:bg-blue-700 border border-gray-200 rounded-sm py-2 mt-3">
      {buttonText}
    </button>
  );
}
