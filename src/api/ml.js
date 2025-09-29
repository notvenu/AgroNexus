/**
 * This file simulates calls to a backend with ML models.
 * In a real application, these functions would make network requests (e.g., using axios)
 * to a server that hosts the trained machine learning models.
 */

// Simulates a delay to mimic network latency.
const apiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulates predicting crop yield.
 * @param {object} soilData - The soil test results.
 * @param {string} crop - The name of the crop.
 * @returns {Promise<number>} - The predicted yield in tons/acre.
 */
export const predictYield = async (soilData, crop) => {
  await apiDelay(500);
  // Simple mock logic: returns a value based on soil pH and crop type.
  const baseYield = crop.toLowerCase() === 'wheat' ? 2.2 : 1.8;
  const phFactor = 1 - Math.abs(6.8 - soilData.ph) * 0.2;
  return parseFloat((baseYield * phFactor).toFixed(2));
};

/**
 * Simulates recommending fertilizer.
 * @param {object} soilData - The soil test results.
 * @returns {Promise<object>} - An object with recommended nutrient dosages.
 */
export const recommendFertilizer = async (soilData) => {
  await apiDelay(600);
  // Mock logic based on organic carbon.
  if (soilData.organicCarbon > 0.7) {
    return { Urea: '45kg/acre', DAP: '20kg/acre', Potash: '15kg/acre' };
  }
  return { Urea: '50kg/acre', DAP: '25kg/acre', Potash: '20kg/acre' };
};

/**
 * Simulates recommending a crop for the next season.
 * @returns {Promise<object>} - An object with the recommended crop and its market price.
 */
export const recommendCrop = async () => {
  await apiDelay(700);
  // Mock logic: randomly pick between two crops.
  const crops = [
    { crop: 'Mustard (Sarson)', marketPrice: 5500 },
    { crop: 'Cotton (Kapas)', marketPrice: 7200 },
  ];
  return crops[Math.floor(Math.random() * crops.length)];
};

/**
 * Simulates detecting a crop disease from an image.
 * @param {File} imageFile - The uploaded image file.
 * @returns {Promise<object>} - An object with the detected disease and remedy.
 *
 * NOTE: The function name in translation files must match the `disease` key returned here.
 * For example, if it returns { disease: 'mock_disease_name', ... },
 * the key in translation.json should be "mock_disease_name".
 */
export const detectDisease = async (imageFile) => {
  await apiDelay(1500);
  console.log('Simulating disease detection for:', imageFile.name);
  return {
    disease: 'mock_disease_name',
    remedy: 'mock_remedy_info',
  };
};

/**
 * Simulates the AgriBot's Natural Language Understanding (NLU).
 * In a real app, this would be a call to a service like Dialogflow or a custom NLU model.
 * It maps keywords in the user's input to predefined intent keys.
 * @param {string} userInput - The text from the user.
 * @returns {Promise<string>} - A key corresponding to a response in the translation files.
 */
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

  // If no keywords match, return a key for the default response.
  return 'default';
};
