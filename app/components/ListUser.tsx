import React, { useEffect, useState } from "react";
import { Loading } from "./Loading";

interface Customer {
  id: number;
  phone: string;

  customer_name: string;
}

interface CampaignTemplate {
  confirm_name: string;
  confirm_description: string;
  confirm_id: string;
  customers: Customer[];
}

export const ListUser = () => {
  const [templates, setTemplates] = useState<CampaignTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://zaloapp.ongdev.online/api/v1/config/user"
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

  // Utility function to format phone numbers from 84xxxxxxxxx to 0xxxxxxxxx
  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith("84")) {
      return "0" + phone.slice(2);
    }
    return phone;
  };

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
            <th className="border border-gray-300 p-2">Trường</th>
            <th className="border border-gray-300 p-2">Ngày khai giảng</th>
            <th className="border border-gray-300 p-2">Sinh viên</th>
            <th className="border border-gray-300 p-2">Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <React.Fragment key={template.confirm_id}>
              {/* Render file details row */}
              <tr>
                <td
                  rowSpan={template.customers.length}
                  className="border border-gray-300 p-2"
                >
                  {template.confirm_description}
                </td>
                <td
                  rowSpan={template.customers.length}
                  className="border border-gray-300 p-2"
                >
                  {template.confirm_name}
                </td>

                <td className="border border-gray-300 p-2">
                  {template.customers[0].customer_name}
                </td>
                <td className="border border-gray-300 p-2">
                  {formatPhoneNumber(template.customers[0].phone)}
                </td>
              </tr>
              {template.customers.slice(1).map((customer) => (
                <tr key={customer.id}>
                  <td className="border border-gray-300 p-2">
                    {customer.customer_name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formatPhoneNumber(customer.phone)}
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
