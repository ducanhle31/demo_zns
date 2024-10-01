import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MediasPage from "../medias/page";
import ListCourses from "../list-courses/page";
import Home from "../zns/page";
import Loginadmin from "../loginadmin/page";
import ZnsPage from "../zns/page";

export default function PageIndex() {
  return (
    <PrivateRoute>
      <Page />
    </PrivateRoute>
  );
}

const Page = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list-courses" element={<ListCourses />} />
      <Route path="/medias" element={<MediasPage />} />

      <Route path="/zns" element={<ZnsPage />} />
      <Route path="/login" element={<Loginadmin />} />
    </Routes>
  );
};
