"use client";
import SearchInput from "@/app/components/admin/SearchInput ";
import { useAppDispatch, useProducts } from "@/app/hook/useProducts";
import { fetchProductsThunk } from "@/lib/redux/products.Slice";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface IProductListProps {
  displayAll: boolean;
  height?: string;
}

const ProductList = (props: IProductListProps) => {
  const { products, selectProduct, loading } = useProducts();
  const { displayAll } = props;
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleProductClick = (id: number) => {
    selectProduct(id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-wrap pt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="pb-4 px-2 w-1/2">
            <div className="border border-gray-200 rounded-lg p-4 text-center text-sm bg-white h-full">
              <div className="bg-gray-200 h-24 mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-3/4 mx-auto animate-pulse"></div>
                <div className="bg-gray-200 h-4 w-2/4 mx-auto animate-pulse"></div>
              </div>
              <div className="bg-gray-200 h-4 w-1/4 mx-auto mt-4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {displayAll ? (
        <>
          <SearchInput value={searchTerm} onChange={handleSearchChange} />
          <div className="flex flex-wrap pt-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="pb-4 px-2 w-1/2 cursor-pointer"
              >
                <div className="border border-gray-200 rounded-lg p-4 text-center text-sm bg-white h-full">
                  <img
                    src={product.th_zalo_app_info?.image || "/blog.jpeg"}
                    alt={product.name}
                    className="h-20 object-cover rounded-lg mx-auto"
                  />
                  <p className="font-bold mt-2 line-clamp-1">{product.name}</p>
                  <p className="font-bold line-clamp-1">
                    {product.th_zalo_app_info?.desc}
                  </p>
                  <p className="text-red-500">{product.list_price}₫</p>
                  <p>Mua ngay</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Swiper
            spaceBetween={6}
            slidesPerView={1.5}
            className="mySwiper"
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination]}
          >
            {filteredProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <div
                  className="pb-10 px-2 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="border border-gray-200 rounded-lg p-4 text-center text-sm bg-white h-full">
                    <img
                      src={product.th_zalo_app_info?.image || "blog.jpeg"}
                      alt={product.name}
                      className="h-20 object-cover rounded-lg mx-auto"
                    />
                    <p className="font-bold mt-2 line-clamp-1">
                      {product.name || "Unnamed Product"}
                    </p>
                    <p className="font-bold line-clamp-1">
                      {product.th_zalo_app_info?.desc}
                    </p>
                    <p className="text-red-500">{product.list_price}₫</p>
                    <p>Mua ngay</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center">
            <NavLink to="/list-courses" className="py-1 text-white">
              Xem thêm
            </NavLink>
          </div>
        </>
      )}
    </>
  );
};
export default ProductList;
