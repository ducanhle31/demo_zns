"use client";
import { useState } from "react";
import { CampaignForm } from "./CampaignForm";
import { CampaignList } from "./CampaignList";
import { CampaignFile } from "./CampaignFile";
import { CampaignListFile } from "./CampaignListFile";
import { ListUser } from "./ListUser";

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>("Thêm mới");
  const tabs = [
    {
      id: "Thêm mới",
      label: "Thêm mới chiến dịch Zalo",
      content: <CampaignForm />,
    },
    {
      id: "Danh sách ",
      label: " Danh sách các chiến dịch",
      content: <CampaignList />,
    },
    {
      id: "Tạo tệp KH",
      label: " Tạo tệp KH",
      content: <CampaignFile />,
    },
    {
      id: "Danh sách tệp KH",
      label: "Danh sách tệp KH",
      content: <CampaignListFile />,
    },
    {
      id: "Danh sách SV tham gia khai giảng",
      label: "Danh sách SV tham gia khai giảng",
      content: <ListUser />,
    },
  ];
  return (
    <div>
      <div className="mb-4 border-b border-gray-200">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          {tabs.map((tab) => (
            <li className="me-2" key={tab.id} role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg  text-lg font-bold ${
                  activeTab === tab.id
                    ? "text-purple-600 border-purple-600"
                    : "hover:text-gray-600 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            </li>
          ))}{" "}
        </ul>
      </div>

      <div id="default-styled-tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`p-4 rounded-lg ${
              activeTab === tab.id ? "block" : "hidden"
            }`}
            id={`styled-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
          >
            <strong className="font-medium text-white">{tab.content}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};
