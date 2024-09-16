"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setName,
  setDescription,
  setSendMode,
  setDate,
} from "../store/campaignSlice";
import { CustomerSelect } from "./CustomerSelect";
import { TemplateSelect } from "./TemplateSelect";

export const CampaignForm = () => {
  const dispatch = useDispatch();
  const { name, description, sendMode, date, customer, templateId } =
    useSelector((state: RootState) => state.campaign);

  const handleSubmit = () => {
    // Logic gửi form đi
    console.log({
      name,
      description,
      sendMode,
      date,
      templateId,
      customers: customer,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Thêm mới chiến dịch Zalo</h1>
      <div className="py-4 space-x-4">
        <label className="font-bold">Tên chiến dịch:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          placeholder="Tên chiến dịch"
        />
      </div>
      <div className="flex space-x-4">
        <label className="font-bold">Mô tả:</label>
        <textarea
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          placeholder="Mô tả chiến dịch"
        />
      </div>
      <div >
        <CustomerSelect />
        
      </div>
      <div>
        <TemplateSelect />
      </div>
      <div>
        <label>Chế Độ Gửi:</label>
        <select
          value={sendMode}
          onChange={(e) =>
            dispatch(setSendMode(e.target.value as "auto" | "immediate"))
          }
        >
          <option value="immediate">Gửi ngay</option>
          <option value="auto">Gửi tự động</option>
        </select>
      </div>
      <div>
        <label>Thời gian gửi:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => dispatch(setDate(e.target.value))}
        />
      </div>
      <button onClick={handleSubmit}>Gửi Chiến Dịch</button>
    </div>
  );
};
