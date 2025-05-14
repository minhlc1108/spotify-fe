import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "primary",
  message = "Loading..."
}) => {
  // Map size to actual pixel values
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16"
  };

  // Map color to Tailwind classes
  const colorMap = {
    primary: "text-blue-500",
    secondary: "text-gray-400",
    white: "text-white",
    success: "text-green-500",
    danger: "text-red-500"
  };

  // Determine what classes to use based on props
  const spinnerSize = sizeMap[size];
  const spinnerColor = colorMap[color as keyof typeof colorMap] || "text-blue-500";

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-12">
      <div className={`${spinnerSize} ${spinnerColor} inline-block animate-spin`} role="status">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      {message && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;