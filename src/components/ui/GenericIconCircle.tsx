// GenericIconCircle.tsx
import type { LucideIcon } from "lucide-react";
import type React from "react";

type GenericIconCircleProps = {
  icon: LucideIcon;
  size?: number;
  iconSize?: number;
  bgColor?: string;
  iconColor?: string;
  x?: number;
  y?: number;
  className?: string;
};

export const GenericIconCircle: React.FC<GenericIconCircleProps> = ({
  icon: Icon,
  size = 24,
  iconSize = 13,
  bgColor = "#14171c",
  iconColor = "#ffffff",
  x,
  y,
  className = "",
}) => {
  const content = (
    <div
      className={`flex items-center justify-center rounded-full shadow-md ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        color: iconColor,
      }}
    >
      <Icon size={iconSize} />
    </div>
  );

  if (x !== undefined && y !== undefined) {
    return (
      <foreignObject
        x={x - size / 2}
        y={y - size / 2}
        width={size}
        height={size}
        className="overflow-visible"
      >
        {content}
      </foreignObject>
    );
  }

  return content;
};

