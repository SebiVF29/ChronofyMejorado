import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-card text-card-foreground p-6 rounded-2xl shadow-lg border border-foreground/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
