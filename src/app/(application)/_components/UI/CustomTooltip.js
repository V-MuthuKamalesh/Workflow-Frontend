export function CustomTooltip({ children, text }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
        {text}
      </div>
    </div>
  );
}
