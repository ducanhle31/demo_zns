import { ReactNode } from "react";
import { FaBatteryFull, FaSignal, FaWifi } from "react-icons/fa";

export const Mockup = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative w-[400px] h-[740px] mx-auto overflow-hidden bg-white">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-[url('/frame-ip.png')] bg-no-repeat bg-contain z-0"
      />
      <div className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] z-1 overflow-hidden w-[380px] h-[734px] p-2">
        <div className="flex justify-between items-center py-2 bg-white bg-opacity-80 h-[20px] text-[10px] rounded-t-[20px] px-4">
          <span>12:00</span>
          <div className="flex-grow" />
          <div>
            <img
              src="/cam.png"
              alt="camera icon"
              className="h-[20px] ml-[60px]"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <FaSignal />
            <FaWifi />
            <div className="flex items-center space-x-1">
              <span>100%</span>
              <FaBatteryFull />
            </div>
          </div>
        </div>
        <div
          className="relative z-2 bg-white rounded-[20px] h-[calc(100%-60px)] overflow-y-auto"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer and Edge
          }}
        >
          <div className="flex justify-center items-center flex-col relative">
            <div className="bg-[#82317f] w-full p-2">
              <div className="flex items-center mb-2">
                <img
                  className="rounded-full h-[40px] w-[40px]"
                  src="/smallsize.png"
                  alt="Profile"
                />
                <span className="ml-4 text-white text-[11px] text-left">
                  Username
                  <br />
                  VMC Việt Nam
                </span>
              </div>
            </div>
            <div className="bg-[#82317f] w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
