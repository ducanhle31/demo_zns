import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCustomer, setDate, setDescription, setName, setSendMode, setTemplateId } from "../redux/campaign.Slice";

export const useCampaign = () => {
  const dispatch = useDispatch();

  const { name, description, sendMode, date, customer, templateId } =
    useSelector((state: RootState) => state.campaign);

  const updateName = (name: string) => dispatch(setName(name));
  const updateDescription = (description: string) =>
    dispatch(setDescription(description));
  const updateCustomer = (customer: string) => dispatch(setCustomer(customer));
  const updateTemplateId = (templateId: number | null) =>
    dispatch(setTemplateId(templateId));
  const updateSendMode = (sendMode: "auto" | "immediate") =>
    dispatch(setSendMode(sendMode));
  const updateDate = (date: string) => dispatch(setDate(date));

  return {
    name,
    description,
    sendMode,
    date,
    customer,
    templateId,
    updateName,
    updateDescription,
    updateCustomer,
    updateTemplateId,
    updateSendMode,
    updateDate,
  };
};

