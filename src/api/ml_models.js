// This file simulates API calls to machine learning models.
// In a real application, this would make network requests to a backend server.

const simulateApiCall = (result) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(result);
        }, 1500); // Simulate a 1.5 second network delay
    });
};

export const detectDisease = async (imageFile) => {
    console.log("Simulating disease detection for:", imageFile.name);

    // Simulate different results based on a mock condition
    if (imageFile.name.toLowerCase().includes("healthy")) {
         return simulateApiCall({
            disease: "Healthy",
            confidence: 98.5,
            remedy: "No action needed. Keep monitoring the crop.",
            description: "The plant appears to be healthy with no visible signs of disease."
        });
    }

    return simulateApiCall({
        disease: "Late Blight",
        confidence: 95.2,
        remedy: "Apply a fungicide containing mancozeb or chlorothalonil. Ensure proper spacing for air circulation.",
        description: "Late blight is a fungal disease that primarily affects potatoes and tomatoes, causing lesions on leaves, stems, and tubers."
    });
};

export const getYieldPrediction = async (formData) => {
    console.log("Simulating yield prediction with data:", formData);
    
    // Updated mock logic using correct keys from the form
    const baseYield = 2500; // kg/acre
    const rainfallFactor = parseFloat(formData.rainfall_mm) > 500 ? 1.2 : 0.8;
    const tempFactor = parseFloat(formData.temperature_celsius) > 20 ? 1.1 : 0.9;
    const calculatedYield = baseYield * rainfallFactor * tempFactor;

    return simulateApiCall({
        yield: calculatedYield.toFixed(2),
        confidence: 88.9
    });
};

export const getCropRecommendation = async (formData) => {
    console.log("Simulating crop recommendation with data:", formData);

    // More nuanced mock logic
    let recommendedCrop = "Lentil"; // Default for low water conditions
    const n = parseFloat(formData.N);
    const p = parseFloat(formData.P);
    const k = parseFloat(formData.K);
    const rainfall = parseFloat(formData.rainfall);

    if (rainfall > 200 && p > 50) {
        recommendedCrop = "Rice";
    } else if (rainfall > 100 && k > 40) {
        recommendedCrop = "Wheat";
    } else if (rainfall > 50 && n > 80) {
        recommendedCrop = "Maize";
    } else {
        recommendedCrop = "Cotton";
    }
    
    return simulateApiCall({
        crop: recommendedCrop,
        confidence: 92.5
    });
};

export const getFertilizerRecommendation = async (formData) => {
    console.log("Simulating fertilizer recommendation with data:", formData);

    // More nuanced mock logic
    let recommendedFertilizer = "17-17-17"; // A balanced default
    const nitrogen = parseFloat(formData.nitrogen);
    const phosphorous = parseFloat(formData.phosphorous);
    const potassium = parseFloat(formData.potassium);

    if (nitrogen > 60 && phosphorous < 30) {
        recommendedFertilizer = "Urea"; // High nitrogen need
    } else if (phosphorous > 60 && nitrogen < 40) {
        recommendedFertilizer = "DAP"; // High phosphorous need
    } else if (nitrogen > 40 && phosphorous > 40 && potassium < 30) {
        recommendedFertilizer = "28-28-0";
    } else if (nitrogen < 30 && phosphorous < 30 && potassium < 30) {
        recommendedFertilizer = "20-20-20"; // General purpose
    }

    return simulateApiCall({
        fertilizer: recommendedFertilizer,
        confidence: 94.7
    });
};

export const getBotResponse = async (userInput) => {
  await apiDelay(300);
  const input = userInput.toLowerCase();
  
  if (input.includes('yield') || input.includes('wheat') || input.includes('ਝਾੜ') || input.includes('उपज')) {
    return 'predict_yield_wheat';
  }
  if (input.includes('fertilizer') || input.includes('ਖਾਦ') || input.includes('उर्वरक')) {
    return 'recommend_fertilizer';
  }
  if (input.includes('crop') || input.includes('next') || input.includes('ਫਸਲ') || input.includes('फसल')) {
    return 'recommend_crop';
  }
  if (input.includes('ph') || input.includes('soil') || input.includes('ਮਿੱਟੀ')) {
    return 'soil_ph_info';
  }

  return 'default';
};