"use client";
import { CustomerSelect } from "./CustomerSelect";
import { TemplateSelect } from "./TemplateSelect";
import { useCampaign } from "../hook/useCampaign";

export const CampaignForm = () => {
  const {
    name,
    description,
    sendMode,
    date,
    customer,
    templateId,
    updateName,
    updateDescription,
    updateSendMode,
    updateDate,
  } = useCampaign();

  const handleSubmit = () => {
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
    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
      <h1 className="text-2xl font-bold mb-8 text-align">
        Thêm mới chiến dịch Zalo
      </h1>
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
          <div className="py-4">
            <label className="font-bold">Thời gian gửi:</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => updateDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
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
            <CustomerSelect />
          </div>
          <div className="py-4">
            <TemplateSelect />
          </div>
        </div>
      </div>
    </div>
  );
};
