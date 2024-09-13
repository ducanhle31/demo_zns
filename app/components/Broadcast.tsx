"use client";

import Image from "next/image";
import { GrNext } from "react-icons/gr";

export const Broadcast = () => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4 text-black max-w-96">
      <div className="bg-white p-4">
        <Image alt="logo" src="/logo.png" width={100} height={100} />
        <div className="font-bold pb-2">Trạng thái đơn hàng</div>
        <div>Cảm ơn bạn đã mua hàng tại cửa hàng.</div>
        <div>Thông tin đơn hàng của bạn như sau:</div>
        <div className="flex space-x-4 py-2">
          <div>
            <div>Mã khách hàng </div>
            <div>Trạng thái</div>
            <div>Giá tiền</div>
          </div>
          <div>
            <div>F-01332973223</div>
            <div>Đang giao</div>
            <div>250.000đ</div>
          </div>
        </div>
        <div>Lưu ý điện thoại. Xin cảm ơn</div>
        <div className="border-b border-gray-300"></div>
        <div className="flex justify-between py-2">
          <div> Xem lại giỏ hàng</div>
          <div>
            <GrNext />
          </div>
        </div>
      </div>
    </div>
  );
};
