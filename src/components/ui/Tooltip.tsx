import { useState, ReactNode } from 'react';
import Transition from '../../utils/Transition';

interface TooltipProps {
  tooltipTitle: ReactNode;
  children: ReactNode;
  className?: string;
  bg?: 'light' | 'dark' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'default';
  position?: 'top' | 'right' | 'bottom' | 'left';
  cursor?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipTitle,
  children,
  className = '',
  bg = 'light',
  size = 'md',
  position = 'top',
  cursor = 'default',
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const positionOuterClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  }[position];

  const sizeClasses = {
    lg: 'min-w-72 px-4 py-2',
    md: 'min-w-56 px-3 py-2',
    sm: 'min-w-24 px-2 py-1',
    default: 'px-3 py-2',
  }[size];

  const colorClasses = {
    light: 'bg-white text-gray-600 border border-gray-200 shadow-md',
    dark: 'bg-gray-800 text-gray-100 border border-gray-700/60 shadow-lg',
    default:
      'text-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700/60 shadow-md',
  }[bg];

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}
      onClick={(e) => e.preventDefault()}
      aria-describedby="tooltip"
      style={{ cursor: cursor }}
    >
      {children}

      {/* Tooltip Content */}
      <div className={`absolute z-40 ${positionOuterClasses} pointer-events-none`}>
        <div className="flex max-w-xs flex-col items-center shadow-lg">
          <Transition
            show={tooltipOpen}
            tag="div"
            className={`rounded-lg border overflow-hidden ${sizeClasses} ${colorClasses} p-2 text-xs font-medium text-center shadow-lg pointer-events-auto`}
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
    </div>
  );
};

export default Tooltip;
