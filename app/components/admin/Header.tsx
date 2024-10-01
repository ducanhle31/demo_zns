import { useAuth } from "@/app/login/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import Import, { ExportToExcel } from "./Import";
import {
  setProduct,
  updateProductDescription,
} from "@/lib/redux/products.Slice";
import { useAppDispatch } from "@/app/hook/useProducts";

export const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất không?"
    );
    if (confirmLogout) {
      logout();
      navigate("/auth/signin");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImport = (importedProducts: any[]) => {
    importedProducts.forEach((product, index) => {
      dispatch(setProduct(product));
      if (product.th_zalo_app_info) {
        dispatch(
          updateProductDescription({
            index,
            desc: product.th_zalo_app_info?.desc,
          })
        );
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white shadow-md py-2 flex justify-between items-center">
      <button
        onClick={handleLogout}
        className="flex items-center text-teal-500 hover:text-teal-600"
        title="Đăng xuất"
        aria-label="Đăng xuất"
      >
        <MdLogout />
      </button>

      {location.pathname === "/list-courses" && (
        <div className="flex items-center space-x-4">
          <Import onImport={handleImport} />
          <ExportToExcel />
        </div>
      )}

      <img
        src="/smallsize.png"
        alt="logo"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 py-2"
      />
    </div>
  );
};
export default Header;
