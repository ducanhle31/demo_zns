import ProductList from "./mockup/ProductList";
import EditProduct from "./edit-area/EditProduct";
import { LayoutDefault } from "../components/admin/LayoutDefault";
import { Mockup } from "../components/admin/Mockup";

export default function ListCourses  ()  {
  return (
    <LayoutDefault>
      <div className="grid grid-cols-12 gap-4">
        {/* Product List Section */}
        <div className="col-span-6 flex justify-center">
          <div className="w-full max-w-screen-lg">
            <Mockup>
              <ProductList displayAll={true} />
            </Mockup>
          </div>
        </div>

        {/* Edit Product Section */}
        <div className="col-span-4">
          <EditProduct />
        </div>
      </div>
    </LayoutDefault>
  );
};
