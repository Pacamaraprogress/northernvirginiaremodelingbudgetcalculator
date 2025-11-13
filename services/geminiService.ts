import { GoogleGenAI, Type } from "@google/genai";
import { FormData, Estimate, ProjectType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    totalRange: {
      type: Type.OBJECT,
      properties: {
        low: { type: Type.NUMBER, description: 'The low end of the total estimated cost range as a whole number.' },
        high: { type: Type.NUMBER, description: 'The high end of the total estimated cost range as a whole number.' }
      },
      required: ['low', 'high'],
    },
    breakdown: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: 'The cost category (e.g., Cabinetry, Countertops, Tile Work, Labor, Materials, Additional Features).' },
          cost: { type: Type.NUMBER, description: 'The estimated cost for this category as a whole number.' },
          description: { type: Type.STRING, description: 'A brief description of what this category includes.' }
        },
        required: ['category', 'cost', 'description'],
      }
    },
    summary: {
      type: Type.STRING,
      description: 'A brief, one-sentence summary of the project inputs.'
    }
  },
  required: ['totalRange', 'breakdown', 'summary'],
};


export const calculateEstimate = async (formData: FormData): Promise<Estimate> => {
  const systemInstruction = `You are an expert remodeling cost estimator specializing in the Northern Virginia (NOVA) market. Your task is to provide a detailed and realistic cost breakdown for a home remodeling project based on user inputs. The location provided is a Northern Virginia zip code or city. Factor in that labor and material costs are higher in this region. 
  
  For kitchens, closets, and other custom projects, the 'Cabinet Line' is a specific product from our store; use this to infer the quality, style, and cost tier (e.g., Fabuwood Allure is a premium line, while CNC Luxor is more budget-friendly).
  
  For bathrooms, the 'Vanity Line' is a specific brand of vanity we carry; use this to infer quality and cost for bathroom vanities.

  For project types like Laundry Rooms, Home Offices, Entertainment Centers, and Bars, the cost is heavily dependent on the amount of custom cabinetry. A Wet Bar will also include plumbing costs for a sink. A Home Office may include premium countertops for desks. An Entertainment Center is almost entirely custom cabinetry. A Closet project's cost is driven by the complexity of the closet system selected. Use the Cabinet Line to estimate the quality and cost of materials.

  The user can also select cabinet and vanity hardware. The cost should be based on the number of cabinets/vanities and the selected tier: 'Standard Finish' is a basic, included cost. 'Mid-Range Finish' adds a moderate amount. 'Premium/Designer Hardware' can be a significant cost, as some knobs and pulls are expensive. If 'No New Hardware' is selected, do not include this cost.

  For countertops, 'Quartzite' and 'Soapstone' are premium materials, often more expensive than Marble and high-end Quartz. 'Granite' and 'Quartz' have a wide price range but are generally mid-to-high tier. If 'No Change' is selected for countertops, do not include countertop costs in the breakdown.

  The user may also select tile work. The 'Tile Work Scope' specifies the areas to be tiled (e.g., floor, backsplash, shower walls). The cost should be estimated based on the area and complexity. Shower walls require waterproofing and are more expensive per sq ft than floors. A kitchen backsplash is typically a smaller area (approx 30 sq ft). The 'Primary Tile Material' influences cost: 'Natural Stone' is premium, 'Glass / Mosaic' is high-end/decorative, and 'Ceramic / Porcelain' is standard. If the scope is 'No Tile Work', do not include any tile costs in the breakdown.

  For plumbing, the 'Sink Type' specifies the material and style. 'Fireclay' kitchen sinks are premium and heavy, requiring more labor. 'Composite' is mid-to-high range. 'Stainless Steel' is standard. For bathrooms, 'Vessel' sinks sit on top of the counter and may have different plumbing and faucet requirements than standard 'Undermount' sinks. If 'No New Sink' is selected, do not include sink costs. A 'New Faucet' selection implies a standard faucet and installation cost.

  For bathroom fixtures, consider the selected Toilet and Bathtub/Shower type. 'Smart Toilets', 'Freestanding/Soaking' tubs, and especially 'Custom Tile Showers' are premium, high-cost items that significantly increase both material and labor costs. A custom tile shower involves extensive waterproofing, plumbing work, and skilled tile installation, making it one of the most expensive single items in a bathroom remodel.
  
  ALWAYS respond with a valid JSON object matching the provided schema. Do not include any introductory text, markdown formatting like \`\`\`json, or explanations outside of the JSON structure. If the number of cabinets/vanities is not specified, estimate it based on the square footage and project type (e.g., a 150 sq ft kitchen has around 12-15 cabinets, a master bathroom might have 1-2 vanities). A 'complete gut renovation' or 'layout changes' will significantly increase labor costs compared to 'cosmetic updates only'. An older home (e.g., > 30 years) may have higher costs due to potential plumbing/electrical updates needed to meet current code.`;

  let projectDetails = `
    - Project Type: ${formData.projectType}
    - Room Size: ${formData.sqft} square feet
    - Location (City or Zip Code): ${formData.location}
  `;
  
  const projectTypesWithCabinetry: ProjectType[] = ['Kitchen', 'Closet', 'Laundry Room', 'Home Office', 'Entertainment Center', 'Wet & Dry Bar', 'Custom Project'];

  if (formData.projectType === 'Bathroom') {
    projectDetails += `
    - Bathroom Type: ${formData.bathroomType}
    - Vanity Line: ${formData.bathroomVanityLine}
    - Number of Vanities: ${formData.numCabinets || 'Please estimate based on room size and bathroom type'}
    - Project Scope: ${formData.projectScope?.length ? formData.projectScope.join(', ') : 'Not specified'}
    - Home Age: ${formData.homeAge ? `${formData.homeAge} years old` : 'Not specified'}
    `;
  } else if (projectTypesWithCabinetry.includes(formData.projectType)) {
      projectDetails += `
      - Cabinet Line: ${formData.cabinetLine}
      - Number of Cabinets / Units: ${formData.numCabinets || 'Please estimate based on room size and project type'}
      `;
  }

  if (formData.hardwareFinish && formData.hardwareFinish !== 'No New Hardware / Keep Existing') {
    projectDetails += `
    - Cabinet & Vanity Hardware: ${formData.hardwareFinish}
    `;
  }

  if (formData.countertopMaterial && formData.countertopMaterial !== 'No Change / Keep Existing') {
    projectDetails += `
    - New Countertop Material: ${formData.countertopMaterial}
    `;
  }

  const hasTileWork = formData.tileWorkScope && formData.tileWorkScope.length > 0 && !formData.tileWorkScope.includes('No Tile Work');
  if (hasTileWork) {
    projectDetails += `
    - Tile Work Scope: ${formData.tileWorkScope!.join(', ')}
    - Primary Tile Material: ${formData.tileMaterial}
    `;
  }
  
  if (formData.sinkType && formData.sinkType !== 'No New Sink / Keep Existing') {
    projectDetails += `
    - New Sink Type: ${formData.sinkType}
    `;
  }
  
  if (formData.projectType === 'Bathroom') {
    if (formData.toiletType && formData.toiletType !== 'No New Toilet / Keep Existing') {
      projectDetails += `\n    - New Toilet: ${formData.toiletType}`;
    }
    if (formData.showerType && formData.showerType !== 'No Change / Keep Existing Tub/Shower') {
        projectDetails += `\n    - New Bathtub/Shower: ${formData.showerType}`;
    }
  }

  projectDetails += `
    - Additional Features: ${formData.additionalFeatures.length > 0 ? formData.additionalFeatures.join(', ') : 'None'}
  `;

  const prompt = `
    Calculate the remodeling cost for the following project in Northern Virginia:
    ${projectDetails}

    Provide a cost breakdown including materials, labor, cabinetry, countertops, tile work (if selected), plumbing (if selected), and each selected extra feature.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    // Basic validation of the parsed response
    if (parsedResponse.totalRange && parsedResponse.breakdown) {
      return parsedResponse as Estimate;
    } else {
      throw new Error("Invalid response structure from API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate estimate from AI service.");
  }
};