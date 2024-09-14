import axios from "axios";

const apiUrl = "http://localhost:3001/api/v1/template"; // URL API thực tế
const templateInfoUrl = "http://localhost:3001/api/v1/template/info"; // URL API thực tế cho thông tin template

export const fetchTemplates = async (offset: number) => {
  try {
    const response = await axios.post(`${apiUrl}?offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw new Error("Failed to fetch templates from the API.");
  }
};

export const fetchTemplateInfo = async (templateId: number) => {
  try {
    const response = await axios.post(
      `${templateInfoUrl}?template_id=${templateId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching template info:", error);
    throw new Error("Failed to fetch template info from the API.");
  }
};
