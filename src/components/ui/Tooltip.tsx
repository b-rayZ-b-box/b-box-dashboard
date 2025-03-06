import { useState, ReactNode } from 'react';
import Transition from '../../utils/Transition';

interface TooltipProps {
  tooltipTitle: ReactNode; // The title of the tooltip
  children: ReactNode; // The content inside the tooltip
  className?: string; // Optional additional classes
  bg?: 'light' | 'dark' | 'default'; // Background color
  size?: 'sm' | 'md' | 'lg' | 'default'; // Size of the tooltip
  position?: 'top' | 'right' | 'bottom' | 'left'; // Tooltip position
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipTitle,
  children,
  className = '',
  bg = 'light',
  size = 'md',
  position = 'top',
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Define tooltip position styles
  const positionOuterClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2',
    right: 'left-full top-1/2 -translate-y-1/2',
    bottom: 'top-full left-1/2 -translate-x-1/2',
    left: 'right-full top-1/2 -translate-y-1/2',
  }[position];

  // Define tooltip size styles
  const sizeClasses = {
    lg: 'min-w-72 px-3 py-2',
    md: 'min-w-56 px-3 py-2',
    sm: 'min-w-44 px-2 py-1',
    default: 'px-3 py-2',
  }[size];

  // Define tooltip color styles
  const colorClasses = {
    light: 'bg-white text-gray-600 border border-gray-200 shadow-md',
    dark: 'bg-gray-800 text-gray-100 border border-gray-700/60 shadow-lg',
    default:
      'text-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700/60 shadow-md',
  }[bg];

  // Define tooltip spacing styles (inner padding)
  const positionInnerClasses = {
    top: 'mb-2',
    right: 'ml-2',
    bottom: 'mt-2',
    left: 'mr-2',
  }[position];

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}
    >
      {children}

      {/* Tooltip Content */}
      <div className={`absolute z-10 ${positionOuterClasses}`}>
        <Transition
          show={tooltipOpen}
          tag="div"
          className={`rounded-lg border overflow-hidden ${sizeClasses} ${colorClasses} ${positionInnerClasses}`}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 scale-95"
          enterEnd="opacity-100 scale-100"
          leave="transition ease-in duration-150 transform"
          leaveStart="opacity-100 scale-100"
          leaveEnd="opacity-0 scale-95"
        >
          {tooltipTitle}
        </Transition>
      </div>
    </div>
  );
};

export default Tooltip;
