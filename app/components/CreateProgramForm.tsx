"use client";
import React, { useState, useEffect } from "react";

interface Customer {
  id: number;
  name: string;
  phone: string;
}

interface Template {
  id: string;
  name: string;
}

export const CreateProgramForm = () => {
  const [data, setData] = useState({
    customers: [] as Customer[],
    selectedCustomers: [] as string[],
    templates: [] as Template[],
    templateId: "",
    campaignName: "",
    campaignDescription: "",
    isAutomatic: false,
    sendDate: "",
    sendTime: "",
    sendImmediately: false,
  });

  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/customers.json");
        if (!response.ok) throw new Error("Failed to fetch customers");
        const customersData: Customer[] = await response.json();
        setData((prev) => ({ ...prev, customers: customersData }));
      } catch (error) {
        console.error("Error fetching customers from JSON", error);
      }
    };

    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          "https://business.openapi.zalo.me/template/all?offset=0&limit=100&status=2",
          {
            method: "GET",
            headers: {
              access_token: ACCESS_TOKEN || "",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch templates");
        const templatesData = await response.json();
        setData((prev) => ({
          ...prev,
          templates: templatesData.templates || [],
        }));
      } catch (error) {
        console.error("Error fetching templates from Zalo", error);
      }
    };

    fetchCustomers();
    fetchTemplates();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData((prev) => ({
      ...prev,
      selectedCustomers: Array.from(
        e.target.selectedOptions,
        (option) => option.value
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      campaignName,
      campaignDescription,
      templateId,
      selectedCustomers,
      isAutomatic,
      sendDate,
      sendTime,
      sendImmediately,
    } = data;

    const sendDateTime =
      isAutomatic && sendDate && sendTime
        ? `${sendDate}T${sendTime}:00`
        : sendImmediately
        ? new Date().toISOString()
        : null;

    const programData = {
      campaignName,
      campaignDescription,
      templateId,
      customers: selectedCustomers,
      isAutomatic,
      sendDate: sendDateTime,
    };

    try {
      console.log("Chương trình tạo mới:", programData);
      alert("Chương trình đã được tạo!");
    } catch (error) {
      console.error("Error creating program", error);
      alert("Có lỗi xảy ra.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm mới chiến dịch</h2>

      <div>
        <label>Tên chiến dịch:</label>
        <input
          type="text"
          name="campaignName"
          value={data.campaignName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Mô tả chiến dịch:</label>
        <textarea
          name="campaignDescription"
          value={data.campaignDescription}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Chọn khách hàng:</label>
        <select
          multiple
          value={data.selectedCustomers}
          onChange={handleCustomerChange}
        >
          {data.customers.map((customer) => (
            <option key={customer.id} value={customer.phone}>
              {customer.name} - {customer.phone}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Template ID:</label>
        <select
          name="templateId"
          value={data.templateId}
          onChange={handleChange}
        >
          <option value="">Chọn template</option>
          {data.templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>
          Gửi tự động:
          <input
            type="checkbox"
            name="isAutomatic"
            checked={data.isAutomatic}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Gửi ngay:
          <input
            type="checkbox"
            name="sendImmediately"
            checked={data.sendImmediately}
            onChange={handleChange}
          />
        </label>
      </div>

      {data.isAutomatic && !data.sendImmediately && (
        <>
          <div>
            <label>Ngày gửi:</label>
            <input
              type="date"
              name="sendDate"
              value={data.sendDate}
              onChange={handleChange}
              required={data.isAutomatic}
            />
          </div>

          <div>
            <label>Giờ gửi:</label>
            <input
              type="time"
              name="sendTime"
              value={data.sendTime}
              onChange={handleChange}
              required={data.isAutomatic}
            />
          </div>
        </>
      )}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Tạo chương trình</button>
    </form>
  );
};
