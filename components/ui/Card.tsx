import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-card text-card-foreground p-6 rounded-lg shadow-md border border-foreground/10 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
