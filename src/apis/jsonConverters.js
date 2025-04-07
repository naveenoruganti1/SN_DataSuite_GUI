import axios from 'axios';
import config from '../common/Properties.json';

export const convertJSONToXml = async (payLoad) => {
  try {
    const API_URL = `${config.JSON_API_URL}/json_to_xml`;  // Ensure correct URL format
    console.log("API URL:", API_URL);

    const response = await axios.post(API_URL, payLoad, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return { success: true, data: response.data }; // Return success response
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      success: false,
      error: error.response?.data?.message || error.message || "Unknown error",
    }; // Return structured error response
  }
};

export const convertJSONToYaml = async (payLoad) => {
    try {
      const API_URL = `${config.JSON_API_URL}/json_to_yaml`;  // Ensure correct URL format
      console.log("API URL:", API_URL);
  
      const response = await axios.post(API_URL, payLoad, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return { success: true, data: response.data }; // Return success response
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Unknown error",
      }; // Return structured error response
    }
  };

  export const convertJSONToCSV= async (payLoad) => {
    try {
      const API_URL = `${config.JSON_API_URL}/json_to_csv`;  // Ensure correct URL format
      console.log("API URL:", API_URL);
  
      const response = await axios.post(API_URL, payLoad, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return { success: true, data: response.data }; // Return success response
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Unknown error",
      }; // Return structured error response
    }
  };

