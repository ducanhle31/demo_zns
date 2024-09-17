import { useState } from "react";
import { useFetchCampaignList } from "../api/CampaignListApi";
import { Loading } from "./Loading";

export const CampaignList = () => {
  const { templates, loading } = useFetchCampaignList();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <Loading />;
  }

  // Filter campaigns based on the search term
  const filteredTemplates = templates.filter(template =>
    template.campaign_id.toString().includes(searchTerm)
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Tên chiến dịch</th>
            <th className="border border-gray-300 p-2">Mô tả</th>
            <th className="border border-gray-300 p-2">Thời gian</th>
            <th className="border border-gray-300 p-2">Loại tin gửi</th>
            <th className="border border-gray-300 p-2">Số tin đã gửi</th>
            <th className="border border-gray-300 p-2">Trạng thái gửi</th>
          </tr>
        </thead>
        <tbody>
          {filteredTemplates.map((template) => {
            const status = template.status || "undefined";
            return (
              <tr key={template.campaign_id}>
                <td className="border border-gray-300 p-2">
                  {template.campaign_id}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.campaign_name}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.campaign_description}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.campaign_time}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.campaign_type}
                </td>
                <td className="border border-gray-300 p-2">
                  {template.total_successful_requests}
                </td>
                <td className="border border-gray-300 p-2">
                  {status === "success" ? "Success" : "Pending"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
