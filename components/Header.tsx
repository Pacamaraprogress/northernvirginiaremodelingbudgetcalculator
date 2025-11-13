import React from 'react';

const LOGO_URL = "https://www.usacabinetstore.com/wp-content/uploads/2021/03/usa-logo.png";

export const Header: React.FC = () => {
  return (
    <header className="text-center print:flex print:items-center print:mb-8">
        <div className="flex justify-center mb-4 print:mb-0 print:justify-start print:flex-shrink-0">
          <img 
            src={LOGO_URL} 
            alt="USA Cabinet Store Logo" 
            className="w-48 sm:w-56 h-auto" 
          />
        </div>
      <div className="print:ml-6 print:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Northern Virginia Remodeling Budget Planner
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Provided by <span className="font-semibold text-blue-600">USA Cabinet Store</span>
        </p>
      </div>
    </header>
  );
};
