import axios from 'axios';
import config from '../common/Properties.json';

export const convertYamlToXml = async (payLoad) => {
  try {
    const API_URL = `${config.YAML_API_URL}/yaml_to_xml`;  // Ensure correct URL format
    console.log("API URL:", API_URL);

    const response = await axios.post(API_URL, payLoad, {
      headers: {
        'Content-Type': 'application/x-yaml',
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

export const convertYamlToJson = async (payLoad) => {
    try {
      const API_URL = `${config.YAML_API_URL}/yaml_to_json`;  // Ensure correct URL format
      console.log("API URL:", API_URL);
  
      const response = await axios.post(API_URL, payLoad, {
        headers: {
          'Content-Type': 'application/x-yaml',
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