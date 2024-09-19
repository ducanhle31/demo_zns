import React, { useState } from "react";
import { TemplateSelect } from "./TemplateSelect";
import { useCampaign } from "../hook/useCampaign";
import CustomerSelector from "./customersData";
import axios from "axios";
import PhoneSelector from "./PhoneSelector ";

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
    campaign_name,
    campaign_description,
    sendMode,
    campaign_time,
    templateId,
    updateName,
    updateDescription,
    updateSendMode,
    updateDate,
  } = useCampaign();

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [campaignType, setCampaignType] = useState<string>("");

  const handleButtonClick = (option: string) => {
    setSelectedOption(option);
    setCampaignType(option);
  };

  const handleSubmit = async () => {
    if (!campaign_name.trim()) {
      alert("Tên chiến dịch không được để trống.");
      return;
    }

    if (!campaign_description.trim()) {
      alert("Mô tả chiến dịch không được để trống.");
      return;
    }
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn gửi chiến dịch này không?"
    );

    if (!isConfirmed) {
      return;
    }

    const submissionDate =
      sendMode === "immediate" ? getLocalDateTime() : campaign_time;

    const finalTemplateId = selectedOption === "UID" ? "123456" : templateId;

    const combinedCustomers = [
      ...selectedPhones.map((phone) => ({
        id: 1,
        phone,
        customer_name: "Nguyễn Thị Hoàng Anh",
        order_date: "20/03/2020",
        order_code: "PE010299485",
        tuition_code: "PD010299485",
        price_number: "2000",
        custom_date: "30/03/2020",
      })),
      ...selectedCustomers.map((customers) => ({
        id: 1,
        customers,
        customer_name: "Nguyễn Thị Hoàng Anh",
        order_date: "20/03/2020",
        order_code: "PE010299485",
      })),
    ];

    const requestData = {
      campaign_name,
      campaign_description,
      sendMode,
      campaign_time: submissionDate,
      templateId: finalTemplateId,
      customers: combinedCustomers,
      campaign_type: campaignType,
    };

    try {
      const response = await axios.post(
        "http://10.10.51.16:3001/api/v1/campaign",
        requestData
      );
      console.log("Success:", response.data);

      alert("Chiến dịch đã được gửi thành công!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
      <div className="flex space-x-8">
        <div className="flex-1">
          <div className="py-4">
            <label htmlFor="campaign-name" className="font-bold">
              Tên chiến dịch:
            </label>
            <input
              id="campaign-name"
              type="text"
              value={campaign_name}
              onChange={(e) => updateName(e.target.value)}
              placeholder="Tên chiến dịch"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="py-4">
            <label htmlFor="campaign-description" className="font-bold">
              Mô tả:
            </label>
            <textarea
              id="campaign-description"
              value={campaign_description}
              onChange={(e) => updateDescription(e.target.value)}
              placeholder="Mô tả chiến dịch"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex-1">
            <div className="py-4 space-x-4">
              <label htmlFor="campaign-type" className="font-bold">
                Loại tin:
              </label>
              <select
                id="campaign-type"
                className="px-4 py-2 rounded bg-blue-500 text-white"
                value={selectedOption}
                onChange={(e) => handleButtonClick(e.target.value)}
              >
                <option value="">Chọn loại tin</option>
                <option value="ZNS">Gửi theo ZNS</option>
                <option value="UID">Gửi theo UID</option>
              </select>
            </div>

            <div>
              {selectedOption === "ZNS" && (
                <>
                  <div className="py-2">
                    <PhoneSelector onSelectPhones={setSelectedPhones} />
                  </div>
                  <div className="py-4">
                    <TemplateSelect />
                  </div>
                </>
              )}
              {selectedOption === "UID" && (
                <>
                  <div className="py-2">
                    <CustomerSelector
                      onSelectCustomers={setSelectedCustomers}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="py-4">
            <label className="font-bold">Chế Độ Gửi:</label>
            <div>
              <label className="custom-radio">
                <input
                  type="radio"
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
                  type="radio"
                  name="sendMode"
                  value="auto"
                  checked={sendMode === "auto"}
                  onChange={() => updateSendMode("auto")}
                  className="mr-2"
                />
                Gửi tự động
              </label>
            </div>
          </div>
          {sendMode !== "immediate" && (
            <div className="py-4">
              <label htmlFor="campaign-time" className="font-bold">
                Thời gian gửi:
              </label>
              <input
                id="campaign-time"
                type="datetime-local"
                value={campaign_time}
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
      </div>
    </div>
  );
};
