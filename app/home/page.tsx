import ProductList from "../list-courses/mockup/ProductList";
import { Banner } from "./mockup/Banner";
import { EditBanners } from "./edit-area/EditBanners";
import { LayoutDefault } from "../components/admin/LayoutDefault";
import { Mockup } from "../components/admin/Mockup";

export default function Home() {
  return (
    <LayoutDefault>
      <div className="col-span-6 flex justify-center">
        <Mockup>
          <Banner displayAll={false} />
          <ProductList displayAll={false} />
        </Mockup>
      </div>
      <div className="col-span-4">
        <EditBanners />
      </div>
    </LayoutDefault>
  );
}
