import axios from "axios";

export const getCountry = async () => {
  try {
    const response = await axios.get("http://ip-api.com/json/");

    return {
      country: response.data.country,
      countryCode: response.data.countryCode,
      ip: response.data.query,
      city: response.data.city,
    };
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};
