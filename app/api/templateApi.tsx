import axios from "axios";

const apiUrl = "http://10.10.50.217:3001/api/v1/template"; 
const templateInfoUrl = "http://10.10.50.217:3001/api/v1/template/info"; 

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

export interface Campaign {
  campaign_id: number;
  campaign_name: string;
  campaign_description: string;
  campaign_time: string;
  campaign_type: string;
  templateId: string;
  sendMode: string;
}

// Fetch campaigns from API
export const fetchCampaignData = async (): Promise<Campaign[]> => {
  try {
    const response = await fetch("http://10.10.50.217:3001/api/v1/campaign");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Campaign[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch campaign data:", error);
    return [];
  }
};