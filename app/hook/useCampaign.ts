import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { 
  setCustomerPhone,
  setCustomerString, 
  setDate, 
  setDescription, 
  setName, 
  setSendMode, 
  setTemplateId,
} from "../redux/campaign.Slice";

export const useCampaign = () => {
  const dispatch = useDispatch();

  const { campaign_name, campaign_description, sendMode, campaign_time, customers, templateId,campaign_type } = useSelector((state: RootState) => state.campaign);

  const updateName = (campaign_name: string) => dispatch(setName(campaign_name));
  const updateDescription = (campaign_description: string) => dispatch(setDescription(campaign_description));
  const updateTemplateId = (templateId: number | null) => dispatch(setTemplateId(templateId));
  const updateSendMode = (sendMode: "auto" | "immediate") => dispatch(setSendMode(sendMode));
  const updateDate = (campaign_time: string) => dispatch(setDate(campaign_time));

  const updateCustomerPhone = (customerIndex: number, phone: string) => {
    dispatch(setCustomerPhone({ customerIndex, phone })); 
  };
  const updateCustomers = (customerIndex: number, customerName: string) => {
    dispatch(setCustomerString({ customerIndex, customers: customerName }));
  };

  return {
    campaign_name,
    campaign_description,
    sendMode,
    campaign_time,
    customers,
    templateId,
    campaign_type,
    updateName,
    updateDescription,
    updateCustomers,
    updateTemplateId,
    updateSendMode,
    updateDate,
    updateCustomerPhone,
  };
};
