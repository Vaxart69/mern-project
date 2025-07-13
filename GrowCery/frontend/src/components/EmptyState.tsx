import React from "react";

// this is just for showing an empty state when there are no orders or products. 
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full text-center px-4">
    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#43A047] to-[#388E3C] mb-6">
      <span className="text-5xl text-white">{icon}</span>
    </div>
    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
    {description && (
      <p className="text-gray-500 mb-6 text-sm md:text-base">{description}</p>
    )}
    {buttonText && onButtonClick && (
      <button
        onClick={onButtonClick}
        className="bg-[#43A047] hover:bg-[#388E3C] text-white px-6 py-2 rounded-lg font-medium transition"
      >
        {buttonText}
      </button>
    )}
  </div>
);

export default EmptyState;