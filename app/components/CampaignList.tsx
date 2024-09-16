import { useFetchCampaignList } from "../api/CampaignListApi";

export const CampaignList = () => {
  const { templates, loading } = useFetchCampaignList();

  if (loading) {
    return <p>Loading templates...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Id</th>
            <th className="border border-gray-300 p-2">Tên Chiến Dịch</th>
            <th className="border border-gray-300 p-2">Mô Tả</th>
            <th className="border border-gray-300 p-2">Thời Gian</th>
            <th className="border border-gray-300 p-2">Loại tin gửi</th>
            <th className="border border-gray-300 p-2">Số tin đã gửi</th>
            <th className="border border-gray-300 p-2">Trạng thái gửi</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => {
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
                  {status === "success" ? "Success" : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
