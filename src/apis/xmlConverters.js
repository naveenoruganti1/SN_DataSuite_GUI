import axios from 'axios';
import config from '../common/Properties.json';

export const convertXMLToJSON = async (payLoad) => {
  try {
    const API_URL = `${config.XML_API_URL}/xml_to_json`;  // Ensure correct URL format
    console.log("API URL:", API_URL);

    const response = await axios.post(API_URL, payLoad, {
      headers: {
        'Content-Type': 'application/xml',
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

export const convertXMLToYaml = async (payLoad) => {
    try {
      const API_URL = `${config.XML_API_URL}/xml_to_yaml`;  // Ensure correct URL format
      console.log("API URL:", API_URL);
  
      const response = await axios.post(API_URL, payLoad, {
        headers: {
          'Content-Type': 'application/xml',
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

  export const convertXMLToCSV= async (payLoad) => {
    try {
      const API_URL = `${config.XML_API_URL}/xml_to_csv`;  // Ensure correct URL format
      console.log("API URL:", API_URL);
  
      const response = await axios.post(API_URL, payLoad, {
        headers: {
          'Content-Type': 'application/xml',
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

