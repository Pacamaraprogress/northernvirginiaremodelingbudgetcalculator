
import React from 'react';
import { Estimate, FormData } from '../types';
import { CONTACT_URL } from '../constants';
import { Disclaimer } from './Disclaimer';

interface EstimateDisplayProps {
  estimate: Estimate;
  formData: FormData;
  onReset: () => void;
  onEdit: () => void;
}

const EstimateDisplay: React.FC<EstimateDisplayProps> = ({ estimate, formData, onReset, onEdit }) => {
  const { totalRange, breakdown, summary } = estimate;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="estimate-results" className="p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Estimated Project Cost</h2>
      <p className="text-gray-600 mb-6">{summary}</p>
      
      <Disclaimer />

      <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
        <p className="text-lg text-blue-800 font-medium">Estimated Cost Range</p>
        <p className="text-4xl sm:text-5xl font-bold text-blue-900 tracking-tight my-2">
          {formatCurrency(totalRange.low)} – {formatCurrency(totalRange.high)}
        </p>
      </div>

      <div className="my-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Cost Breakdown</h3>
        <div className="space-y-3">
          {breakdown.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{item.category}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <p className="font-bold text-lg text-gray-900">{formatCurrency(item.cost)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="my-8">
        <Disclaimer />
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        <a 
          href={CONTACT_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="col-span-1 sm:col-span-2 lg:col-span-2 w-full bg-green-600 text-white font-bold py-3 px-5 rounded-lg text-center hover:bg-green-700 transition-colors focus:outline-none focus:ring-4 focus:ring-green-300">
          Request a Professional Quote
        </a>
        <button 
          onClick={handlePrint}
          className="bg-gray-200 text-gray-800 font-bold py-3 px-5 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300">
          Print / Save PDF
        </button>
        <button 
          onClick={onEdit} 
          className="bg-gray-200 text-gray-800 font-bold py-3 px-5 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300">
          Edit Details
        </button>
      </div>
       <div className="mt-4 text-center no-print">
        <button 
          onClick={onReset} 
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
          Start a New Estimate
        </button>
      </div>

    </div>
  );
};

export default EstimateDisplay;
