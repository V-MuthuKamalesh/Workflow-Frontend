"use client";

export default function TooltipButton({
  children,
  onClick,
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
        {children}
      </button>
    </div>
  );
}
