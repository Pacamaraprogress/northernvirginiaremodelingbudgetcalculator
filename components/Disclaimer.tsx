import React from 'react';

export const Disclaimer: React.FC = () => {
    return (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
            <h4 className="font-bold">Disclaimer</h4>
            <p className="text-sm">
                This calculator provides a general cost estimate for planning purposes only and is not a formal quote. Actual costs can vary significantly based on your specific project scope, material choices, site conditions, and current market pricing. For a detailed, site-specific quote and to finalize costs, please schedule a consultation at one of our showrooms with a design expert. Do not rely solely on this estimate for budgeting.
            </p>
        </div>
    );
};