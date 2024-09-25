"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <main className="max-w-7xl mx-auto  py-14">
          <div className="text-3xl text-center py-2">DEMO TIN OA & ZNS</div>
          <Navbar />
        </main>
      </div>
    </Provider>
  );
}
