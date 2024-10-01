"use client";

import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "./components/Loading";
import PageTitle from "./login/PageTitle";
import { Login } from "./login/Login";
import PageIndex from "./login/page";


export default function Home() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Đăng nhập" />
              <Login />
            </>
          }
        />
        <Route path="/*" element={<PageIndex />}></Route>
      </Routes>
    </>
  );
}
