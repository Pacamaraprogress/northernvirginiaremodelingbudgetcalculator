import React, { useState, useCallback } from 'react';
import { FormData, Estimate, ProjectType, TileWorkScope } from './types';
import { INITIAL_FORM_DATA } from './constants';
import { calculateEstimate } from './services/geminiService';
import CalculatorForm from './components/CalculatorForm';
import EstimateDisplay from './components/EstimateDisplay';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleFormChange = useCallback((field: keyof FormData, value: any) => {
    if (field === 'projectType') {
      setFormData(prev => ({
        ...INITIAL_FORM_DATA,
        projectType: value as ProjectType,
        location: prev.location, // Keep location
      }));
    } else if (field === 'additionalFeatures' || field === 'projectScope') {
      setFormData(prev => {
        const currentValues = prev[field] as string[] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value];
        return { ...prev, [field]: newValues };
      });
    } else if (field === 'tileWorkScope') {
      setFormData(prev => {
        const currentValues = prev.tileWorkScope || [];
        let newValues: string[];

        const isAdding = !currentValues.includes(value);

        if (isAdding) {
          if (value === 'No Tile Work') {
            newValues = ['No Tile Work'];
          } else {
            newValues = [...currentValues.filter(item => item !== 'No Tile Work'), value];
          }
        } else { // is removing
          newValues = currentValues.filter(item => item !== value);
          if (newValues.length === 0) {
            newValues = ['No Tile Work'];
          }
        }
        return { ...prev, tileWorkScope: newValues as TileWorkScope[] };
      });
    }
     else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await calculateEstimate(formData);
      setEstimate(result);
      setIsSubmitted(true);
    } catch (err) {
      setError('Sorry, we couldn\'t calculate your estimate at this time. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleReset = () => {
    setIsSubmitted(false);
    setEstimate(null);
    setError(null);
    const currentLocation = formData.location;
    setFormData({...INITIAL_FORM_DATA, location: currentLocation});
  };
  
  const handleEdit = () => {
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 antialiased">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <Header />
        <main className="mt-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500">
            {isLoading ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                <LoadingSpinner />
                <p className="mt-4 text-lg font-medium text-gray-600">Calculating your custom estimate...</p>
                <p className="mt-1 text-sm text-gray-500">This may take a few moments.</p>
              </div>
            ) : isSubmitted && estimate ? (
              <EstimateDisplay 
                estimate={estimate} 
                formData={formData} 
                onReset={handleReset}
                onEdit={handleEdit}
              />
            ) : (
              <CalculatorForm
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
              />
            )}
          </div>
          {error && <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
        </main>
      </div>
    </div>
  );
};

export default App;