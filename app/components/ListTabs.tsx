"use client";

import { useState } from "react";
import { TinGiaoDich } from "./TinGiaoDich";
import { Broadcast } from "./Broadcast";
import { CaNhan } from "./CaNhan";

const TOKEN = process.env.TOKEN || "1234567890";

export const ListTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSend = async () => {
    setIsSending(true);
    setResponseMessage("");

    try {
      const response = await fetch(
        "https://openapi.zalo.me/v3.0/oa/message/transaction",
        {
          method: "POST",
          headers: {
            access_token: TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient: { user_id: "2559231188943244647" },
            message: {
              attachment: {
                type: "template",
                payload: {
                  template_type: "transaction_order",
                  language: "VI",
                  elements: [
                    {
                      type: "banner",
                      attachment_id:
                        "a-JJEvLdkcEPxTOwb6gYTfhwm26VSBHjaE3MDfrWedgLyC0smJRiA8w...",
                    },
                    {
                      type: "header",
                      content: "Trạng thái đơn hàng",
                      align: "left",
                    },
                    {
                      type: "text",
                      align: "left",
                      content:
                        "• Cảm ơn bạn đã mua hàng tại cửa hàng.<br>• Thông tin đơn hàng của bạn như sau:",
                    },
                    {
                      type: "table",
                      content: [
                        { value: "F-01332973223", key: "Mã khách hàng" },
                        {
                          style: "yellow",
                          value: "Đang giao",
                          key: "Trạng thái",
                        },
                        { value: "250,000đ", key: "Giá tiền" },
                      ],
                    },
                    {
                      type: "text",
                      align: "center",
                      content: "📱Lưu ý điện thoại. Xin cảm ơn!",
                    },
                  ],
                  buttons: [
                    {
                      title: "Kiểm tra lộ trình",
                      type: "oa.open.url",
                      payload: { url: "https://oa.zalo.me/home" },
                    },
                    {
                      title: "Xem lại giỏ hàng",
                      type: "oa.query.show",
                      payload: "kiểm tra giỏ hàng",
                    },
                    {
                      title: "Liên hệ tổng đài",
                      type: "oa.open.phone",
                      payload: { phone_code: "84123456789" },
                    },
                  ],
                },
              },
            },
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Gửi tin thành công!");
      } else {
        setResponseMessage(`Lỗi: ${data.message || "Không thể gửi tin nhắn"}`);
      }
    } catch (error) {
      setResponseMessage(`Lỗi: ${error}`);
    }

    setIsSending(false);
  };

  const tabs = [
    {
      id: "profile",
      label: "Tin giao dịch",
      content: <TinGiaoDich />,
    },
    {
      id: "dashboard",
      label: "Tin truyền thông Broadcast",
      content: <Broadcast />,
    },
    {
      id: "settings",
      label: "Tin truyền thông cá nhân",
      content: <CaNhan />,
    },
    {
      id: "contacts",
      label: "Tin ZNS",
      content: "Contacts associated content",
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
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
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
          ))}
        </ul>
      </div>

      <div id="default-styled-tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`p-4 rounded-lg bg-gray-800 ${
              activeTab === tab.id ? "block" : "hidden"
            }`}
            id={`styled-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
          >
            <strong className="font-medium text-white">{tab.content}</strong>
          </div>
        ))}

        {/* Button and Response Message */}
        <div className="mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSend}
            disabled={isSending}
          >
            {isSending ? "Đang gửi..." : "Gửi tin nhắn"}
          </button>
          {responseMessage && (
            <p className="mt-4 text-red-600">{responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};
