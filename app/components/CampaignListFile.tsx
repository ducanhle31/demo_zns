import React, { useEffect, useState } from "react";
import { Loading } from "./Loading";

interface Customer {
  id: number;
  phone: string;
  customers: string;
  customer_name: string;
}

interface CampaignTemplate {
  file_name: string;
  file_description: string;
  file_id: string;
  customers: Customer[];
}

export const CampaignListFile: React.FC = () => {
  const [templates, setTemplates] = useState<CampaignTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://zaloapp.ongdev.online/api/v1/config"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID tệp</th>
            <th className="border border-gray-300 p-2">Tên tệp</th>
            <th className="border border-gray-300 p-2">Mô tả</th>
            <th className="border border-gray-300 p-2">Customer ID</th>
            <th className="border border-gray-300 p-2">Customer Name</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">UID</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <React.Fragment key={template.file_id}>
              {/* Render file details row */}
              <tr>
                <td
                  rowSpan={template.customers.length}
                  className="border border-gray-300 p-2"
                >
                  {template.file_id}
                </td>
                <td
                  rowSpan={template.customers.length}
                  className="border border-gray-300 p-2"
                >
                  {template.file_name}
                </td>
                <td
                  rowSpan={template.customers.length}
                  className="border border-gray-300 p-2"
                >
                  {template.file_description}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.customers[0].id}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.customers[0].customer_name}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.customers[0].phone}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.customers[0].customers}
                </td>
              </tr>
              {template.customers.slice(1).map((customer) => (
                <tr key={customer.id}>
                  <td className="border border-gray-300 p-2">{customer.id}</td>
                  <td className="border border-gray-300 p-2">
                    {customer.customer_name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {customer.phone}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {customer.customers}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
