"use client";

export default function TooltipButton({
  onClick,
  icon,
  tooltipText,
  isActive,
  activeClass,
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`focus:outline-none ${isActive ? activeClass : ""}`}
        title={tooltipText}
      >
        {icon}
      </button>
    </div>
  );
}
