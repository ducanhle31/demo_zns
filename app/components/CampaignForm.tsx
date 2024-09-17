"use client";
import { TemplateSelect } from "./TemplateSelect";
import { useCampaign } from "../hook/useCampaign";
import { useState } from "react";
import PhoneSelector from "./PhoneSelector ";
import CustomerSelector from "./customersData";

const getLocalDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const CampaignForm = () => {
  const {
    name,
    description,
    sendMode,
    date,
    customer,
    templateId,
    phone,
    updateName,
    updateDescription,
    updateSendMode,
    updateDate,
  } = useCampaign();

  const handleSubmit = () => {
    const submissionDate = sendMode === "immediate" ? getLocalDateTime() : date;

    console.log({
      name,
      description,
      sendMode,
      date: submissionDate,
      templateId,
      customers: customer,
      phone: phone,
    });
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
      <h1 className="text-2xl font-bold mb-8 text-align">Thêm mới chiến dịch Zalo</h1>
      <div className="flex space-x-8">
        <div className="flex-1">
          <div className="py-4">
            <label className="font-bold">Tên chiến dịch:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(e.target.value)}
              placeholder="Tên chiến dịch"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="py-4">
            <label className="font-bold">Mô tả:</label>
            <textarea
              value={description}
              onChange={(e) => updateDescription(e.target.value)}
              placeholder="Mô tả chiến dịch"
              className="border p-2 rounded w-full"
            />
          </div>

          <label className="font-bold">Chế Độ Gửi:</label>
          <div>
            <label className="custom-radio">
              <input
                type="checkbox"
                name="sendMode"
                value="immediate"
                checked={sendMode === "immediate"}
                onChange={() => updateSendMode("immediate")}
                className="mr-2"
              />
              Gửi ngay
            </label>

            <label className="pl-4">
              <input
                type="checkbox"
                name="sendMode"
                value="auto"
                checked={sendMode === "auto"}
                onChange={() => updateSendMode("auto")}
                className="mr-2"
              />
              Gửi tự động
            </label>
          </div>

          {sendMode !== "immediate" && (
            <div className="py-4">
              <label className="font-bold">Thời gian gửi:</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => updateDate(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          <div className="py-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded text-sm"
            >
              Gửi Chiến Dịch
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="py-4">
            <button
              className={`px-4 py-2 rounded mr-2 ${selectedOption === "ZNS" ? "bg-green-500" : "bg-blue-500"} text-white`}
              onClick={() => handleButtonClick("ZNS")}
            >
              Gửi theo ZNS
            </button>
            <button
              className={`px-4 py-2 rounded ${selectedOption === "UID" ? "bg-green-500" : "bg-blue-500"} text-white`}
              onClick={() => handleButtonClick("UID")}
            >
              Gửi theo UID
            </button>
          </div>

          <div>
            {selectedOption === "ZNS" && (
              <>
                <h1 className="font-bold text-black text-md text-center  ">Gửi theo ZNS</h1>
                <div className="py-2">
                  <PhoneSelector /> 
                </div>
                <div className="py-4">
                  <TemplateSelect />
                </div>
              </>
            )}
            {selectedOption === "UID" && (
              <>
                <h1 className="font-bold text-black text-md text-center ">Gửi theo UID</h1>
                <div className="py-2">
                  <TemplateSelect />
                </div>
                <div className="py-2">
                  <CustomerSelector/>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
