import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white text-gray-800 p-6 rounded-2xl shadow-xl border-2 border-gray-100 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
