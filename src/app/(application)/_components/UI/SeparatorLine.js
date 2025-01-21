export default function SeparatorLine({ text }) {
  return (
    <div className="flex items-center my-4 w-full">
      <hr className="flex-grow border-gray-300" />
      <p className="px-2 text-sm md:text-base">{text}</p>
      <hr className="flex-grow border-gray-300" />
    </div>
  );
}
