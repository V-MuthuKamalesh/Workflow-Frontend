export default function Input({ title, ...props }) {
  return (
    <div className="w-full mt-3">
      <p className="text-gray-600">{title}</p>
      <input
        className="w-full outline-none border border-gray-300 p-2 rounded-sm"
        {...props}
      />
    </div>
  );
}
