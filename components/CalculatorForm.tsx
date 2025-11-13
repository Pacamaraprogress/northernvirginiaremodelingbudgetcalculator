import React from 'react';
import { FormData, ProjectType } from '../types';
import { PROJECT_TYPES, CABINET_LINES, COUNTERTOP_MATERIALS, ADDITIONAL_FEATURES, BATHROOM_TYPES, PROJECT_SCOPES, BATHROOM_VANITY_LINES, TILE_WORK_SCOPES, TILE_MATERIALS, SINK_TYPES, TOILET_TYPES, SHOWER_TYPES, HARDWARE_FINISHES } from '../constants';

interface CalculatorFormProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
  onSubmit: () => void;
}

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="py-6 border-b border-gray-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const FormField: React.FC<{ label: string; children: React.ReactNode; fullWidth?: boolean }> = ({ label, children, fullWidth = false }) => (
  <div className={fullWidth ? 'md:col-span-2' : ''}>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    {children}
  </div>
);

const SelectInput: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: readonly string[] }> = ({ value, onChange, options }) => (
  <select value={value} onChange={onChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
    {options.map(option => <option key={option} value={option}>{option}</option>)}
  </select>
);

const TextInput: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string }> = ({ value, onChange, placeholder, type = 'text' }) => (
  <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
);

const CheckboxGroup: React.FC<{ selected: string[]; onChange: (value: string) => void; options: readonly string[]; fullWidth?: boolean }> = ({ selected, onChange, options, fullWidth=true }) => (
    <div className={`${fullWidth ? 'md:col-span-2' : ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3`}>
        {options.map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400">
                <input type="checkbox" checked={selected.includes(option)} onChange={() => onChange(option)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-sm font-medium text-gray-700">{option}</span>
            </label>
        ))}
    </div>
);


const CalculatorForm: React.FC<CalculatorFormProps> = ({ formData, onFormChange, onSubmit }) => {
  const projectTypesWithDetails: ProjectType[] = ['Kitchen', 'Bathroom', 'Custom Project', 'Laundry Room', 'Home Office', 'Entertainment Center', 'Wet & Dry Bar'];
  const projectTypesWithCabinetry: ProjectType[] = ['Kitchen', 'Closet', 'Laundry Room', 'Home Office', 'Entertainment Center', 'Wet & Dry Bar', 'Custom Project'];

  const showProjectSpecificSections = projectTypesWithDetails.includes(formData.projectType);
  const showTileMaterialSelector = formData.tileWorkScope && !formData.tileWorkScope.includes('No Tile Work');
  
  const kitchenSinkOptions = SINK_TYPES.filter(s => s.includes('Kitchen') || s.includes('No New Sink'));
  const bathroomSinkOptions = SINK_TYPES.filter(s => s.includes('Bathroom') || s.includes('No New Sink'));
  const remainingAdditionalFeatures = ADDITIONAL_FEATURES.filter(f => f !== 'New Faucet');


  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Get Your Instant Remodeling Estimate</h2>
      <p className="text-gray-600 mb-6">Fill out the details below to see a cost breakdown for your Northern Virginia project.</p>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <FormSection title="Project Basics">
          <FormField label="Project Type">
            <SelectInput value={formData.projectType} onChange={(e) => onFormChange('projectType', e.target.value)} options={PROJECT_TYPES} />
          </FormField>
          <FormField label="Room Size (sq ft)">
            <TextInput value={formData.sqft} onChange={(e) => onFormChange('sqft', e.target.value)} placeholder="e.g., 150" type="number" />
            <p className="text-xs text-gray-500 mt-1">Not sure of your room size? Try 10×10 = 100 sq ft or 12×15 = 180 sq ft.</p>
          </FormField>
          <FormField label="Zip Code or City" fullWidth>
            <TextInput value={formData.location} onChange={(e) => onFormChange('location', e.target.value)} placeholder="e.g., 22030 or Fairfax" />
          </FormField>
        </FormSection>

        {formData.projectType === 'Bathroom' && (
           <FormSection title="Bathroom Details">
                <FormField label="Bathroom Type">
                    <SelectInput value={formData.bathroomType} onChange={(e) => onFormChange('bathroomType', e.target.value)} options={BATHROOM_TYPES} />
                </FormField>
                <FormField label="Home Age (years)">
                    <TextInput value={formData.homeAge} onChange={(e) => onFormChange('homeAge', e.target.value)} placeholder="e.g., 25" type="number" />
                </FormField>
                <FormField label="Select Vanity Line" fullWidth>
                    <SelectInput value={formData.bathroomVanityLine || ''} onChange={(e) => onFormChange('bathroomVanityLine', e.target.value)} options={BATHROOM_VANITY_LINES} />
                </FormField>
                <FormField label="Number of Vanities (Optional)" >
                    <TextInput value={formData.numCabinets} onChange={(e) => onFormChange('numCabinets', e.target.value)} placeholder="e.g., 1 or 2" type="number" />
                </FormField>
                 <FormField label="Vanity Hardware Finish">
                    <SelectInput value={formData.hardwareFinish || 'No New Hardware / Keep Existing'} onChange={(e) => onFormChange('hardwareFinish', e.target.value)} options={HARDWARE_FINISHES} />
                </FormField>
                 <FormField label="Project Scope" fullWidth>
                    <CheckboxGroup selected={formData.projectScope || []} onChange={(value) => onFormChange('projectScope', value)} options={PROJECT_SCOPES} />
                </FormField>
            </FormSection>
        )}
        
        {projectTypesWithCabinetry.includes(formData.projectType) && (
            <FormSection title="Cabinetry & Custom Built-ins">
                <FormField label="Select Cabinet Line" fullWidth>
                    <SelectInput value={formData.cabinetLine} onChange={(e) => onFormChange('cabinetLine', e.target.value)} options={CABINET_LINES} />
                </FormField>
                 <FormField label="Number of Cabinets / Units (Optional)">
                    <TextInput value={formData.numCabinets} onChange={(e) => onFormChange('numCabinets', e.target.value)} placeholder="Leave blank to estimate" type="number" />
                </FormField>
                <FormField label="Cabinet Hardware Finish">
                    <SelectInput value={formData.hardwareFinish || 'No New Hardware / Keep Existing'} onChange={(e) => onFormChange('hardwareFinish', e.target.value)} options={HARDWARE_FINISHES} />
                </FormField>
            </FormSection>
        )}

        {showProjectSpecificSections && (
            <FormSection title="Countertops">
                <FormField label="Countertop Material" fullWidth>
                    <SelectInput value={formData.countertopMaterial} onChange={(e) => onFormChange('countertopMaterial', e.target.value)} options={COUNTERTOP_MATERIALS} />
                </FormField>
            </FormSection>
        )}
        
        {showProjectSpecificSections && (
            <FormSection title="Plumbing Fixtures">
                <FormField label="Sink Selection">
                    <SelectInput 
                        value={formData.sinkType || 'No New Sink / Keep Existing'}
                        onChange={(e) => onFormChange('sinkType', e.target.value)}
                        options={
                            formData.projectType === 'Kitchen' ? kitchenSinkOptions :
                            formData.projectType === 'Bathroom' ? bathroomSinkOptions :
                            SINK_TYPES
                        }
                    />
                </FormField>
                <FormField label="Faucet">
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition h-full has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400">
                        <input type="checkbox" checked={formData.additionalFeatures.includes('New Faucet')} onChange={() => onFormChange('additionalFeatures', 'New Faucet')} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Install New Faucet</span>
                    </div>
                </FormField>
                {formData.projectType === 'Bathroom' && (
                  <>
                    <FormField label="Toilet Selection">
                      <SelectInput
                        value={formData.toiletType || 'No New Toilet / Keep Existing'}
                        onChange={(e) => onFormChange('toiletType', e.target.value)}
                        options={TOILET_TYPES}
                      />
                    </FormField>
                    <FormField label="Bathtub / Shower">
                      <SelectInput
                        value={formData.showerType || 'No Change / Keep Existing Tub/Shower'}
                        onChange={(e) => onFormChange('showerType', e.target.value)}
                        options={SHOWER_TYPES}
                      />
                    </FormField>
                  </>
                )}
            </FormSection>
        )}

        {showProjectSpecificSections && (
            <FormSection title="Tile Work">
                 <FormField label="Installation Areas" fullWidth>
                    <CheckboxGroup 
                        selected={formData.tileWorkScope || []} 
                        onChange={(value) => onFormChange('tileWorkScope', value)} 
                        options={TILE_WORK_SCOPES}
                    />
                </FormField>
                {showTileMaterialSelector && (
                    <FormField label="Primary Tile Material" fullWidth>
                        <SelectInput 
                            value={formData.tileMaterial || ''}
                            onChange={(e) => onFormChange('tileMaterial', e.target.value)}
                            options={TILE_MATERIALS}
                        />
                    </FormField>
                )}
                <div className="md:col-span-2 mt-2 p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
                  <p><span className="font-semibold">🎨 Designer's Note:</span> The options above represent our most popular choices. Many more styles and materials are available in our showrooms. Speak with a designer to see the full collection and find the perfect tile for your project!</p>
                </div>
            </FormSection>
        )}

        <FormSection title="Additional Features">
            <CheckboxGroup selected={formData.additionalFeatures} onChange={(value) => onFormChange('additionalFeatures', value)} options={remainingAdditionalFeatures} />
        </FormSection>

        <div className="mt-8">
          <button type="submit" disabled={!formData.location || !formData.sqft} className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
            Calculate My Estimate
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;