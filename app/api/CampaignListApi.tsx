import axios from "axios";
import { useState, useEffect } from "react";

const ApiUrl = "http://10.10.50.217:3001/api/v1/campaign";

interface ICampaign {
  campaign_id: string;
  campaign_name: string;
  campaign_description: string;
  campaign_time: string;
  campaign_type: string;
  templateId: string;
  sendMode: string;
  total_successful_requests: string;
  status: string;
  success: string;
}

export const useFetchCampaignList = () => {
  const [templates, setTemplates] = useState<ICampaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(ApiUrl);
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return { templates, loading };
};