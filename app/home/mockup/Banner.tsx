"use client";
import { useAppDispatch, useBanners } from "@/app/hook/useBanners";
import { fetchBannersThunk } from "@/lib/redux/banners.Slice";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

interface BannerProps {
  displayAll?: boolean;
}

export const Banner = ({
  displayAll: initialDisplayAll = false,
}: BannerProps) => {
  const { banners, selectBanner, loading } = useBanners();
  const dispatch = useAppDispatch();
  const [displayAll, setDisplayAll] = useState(initialDisplayAll);

  useEffect(() => {
    dispatch(fetchBannersThunk());
  }, [dispatch]);

  const handleProductClick = (id: number) => {
    selectBanner(id);
  };

  const handleDisplayAllClick = () => {
    setDisplayAll(true);
  };

  if (loading) {
    return (
      <div className="pt-6">
        <Swiper>
          {Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="pb-10 px-2">
                <div className="border border-gray-200 rounded-lg overflow-hidden p-4 text-center font-sm h-[220px] bg-white">
                  <div className="skeleton h-[180px] w-full rounded-lg" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  if (displayAll) {
    return (
      <div className="bg-[#82317f] w-full pb-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="cursor-pointer"
              onClick={() => handleProductClick(banner.id)}
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden p-4 bg-white">
                <img
                  src={banner.thumbnail || "blog.jpeg"}
                  alt={`Banner ${banner.id}: ${banner.label}`}
                  className="h-[180px] w-full object-contain rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#82317f] w-full pb-2.5">
      <Swiper className="mySwiper w-full">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <SwiperSlide
              key={banner.id}
              onClick={() => handleProductClick(banner.id)}
            >
              <img
                src={banner.thumbnail || "blog.jpeg"}
                alt={`Slide ${banner.id}: ${banner.label}`}
                className="h-[220px] w-full object-cover p-1 rounded-lg cursor-pointer"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-white text-center">No banners available</p>
          </SwiperSlide>
        )}
      </Swiper>
      <div className="flex justify-center">
        <button
          onClick={handleDisplayAllClick}
          className="bg-none hover:bg-none py-1 text-white"
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
};
