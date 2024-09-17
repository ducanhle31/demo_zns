// "use client";
// import React, { useState, useEffect } from "react";
// import { fetchCustomers } from "../api/customerApi";
// import { useCampaign } from "../hook/useCampaign";

// interface User {
//   user_id: string;
// }

// export const CustomerSelect = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const usersPerPage = 50;

//   const { customer, updateCustomer } = useCampaign();

//   const fetchData = async (offset: number) => {
//     try {
//       const data = await fetchCustomers(offset);
//       if (data.data.users.length < usersPerPage) {
//         setHasMore(false);
//       }
//       setUsers((prevUsers) => {
//         const newUsers = [...prevUsers, ...data.data.users];
//         const uniqueUsers = newUsers.filter(
//           (user, index, self) =>
//             index === self.findIndex((u) => u.user_id === user.user_id)
//         );
//         return uniqueUsers;
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(page * usersPerPage);
//   }, [page]);

//   const loadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const handleSelect = (userId: string) => {
//     setSelectedUsers((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleSelectAll = () => {
//     const allUserIds = users.map((user) => user.user_id);
//     setSelectedUsers(
//       selectedUsers.length === allUserIds.length ? [] : allUserIds
//     );
//   };

//   const handleConfirmSelection = () => {
//     updateCustomer(selectedUsers.join(","));
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setShowModal(true)}
//         className="bg-blue-500 text-white p-2 rounded text text-sm"
//       >
//         Chọn Khách Hàng
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center ">
//           <div
//             className={`absolute right-0 top-0 h-full bg-white p-5 w-full max-w-lg transform transition-transform duration-300 ease-in-out ${
//               showModal ? "translate-x-0" : "translate-x-full"
//             }`}
//           >
//             <h2 className="text-lg font-bold my-2">Chọn người dùng</h2>
//             <p className="my-2">Số người dùng: {users.length}</p>
//             <button
//               onClick={handleSelectAll}
//               className="bg-gray-500 text-white p-2 rounded mb-4 text-sm"
//             >
//               {selectedUsers.length === users.length
//                 ? "Bỏ chọn tất cả"
//                 : "Chọn tất cả"}
//             </button>
//             <ul className="h-64 overflow-y-scroll mb-4">
//               {users.map((user) => (
//                 <li
//                   key={user.user_id}
//                   className="flex items-center justify-between"
//                 >
//                   <span>User ID: {user.user_id}</span>
//                   <input
//                     type="checkbox"
//                     checked={selectedUsers.includes(user.user_id)}
//                     onChange={() => handleSelect(user.user_id)}
//                   />
//                 </li>
//               ))}
//             </ul>

//             {hasMore && (
//               <button
//                 onClick={loadMore}
//                 disabled={loading}
//                 className="bg-green-500 text-white p-2 rounded"
//               >
//                 Xem thêm
//               </button>
//             )}

//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={handleConfirmSelection}
//                 className="bg-blue-500 text-white p-2 rounded"
//               >
//                 Xác Nhận
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-red-500 text-white p-2 rounded"
//               >
//                 Đóng
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="mt-2">
//         <h3 className="text-lg font-semibold">Khách Hàng Đã Chọn:</h3>
//         {customer && customer.length > 0 ? (
//           <ul className="border border-gray-400 p-4 rounded">
//             {customer.split(",").map((userId: string) => (
//               <li key={userId}>User ID: {userId}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>Chưa có khách hàng nào được chọn</p>
//         )}
//       </div>
//     </div>
//   );
// };
