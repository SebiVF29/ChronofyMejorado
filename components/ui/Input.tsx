
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, id, icon, className, ...props }, ref) => {
  return (
    <div className="w-full group">
      {label && (
        <label htmlFor={id} className="block text-base font-semibold text-gray-700 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full p-4 ${icon ? 'pl-12' : ''} bg-white border-2 border-gray-200 rounded-2xl text-gray-800 text-lg font-medium placeholder:text-gray-400 placeholder:font-normal focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl ${className || ''}`}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
