"use client";
import { Provider } from "react-redux";
import { CampaignForm } from "./components/CampaignForm";
import { ListTabs } from "./components/ListTabs";


import { store } from "./store";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <main className="max-w-6xl mx-auto  py-14">
          <div className="text-3xl text-center">DEMO TIN OA & ZNS</div>
          {/* <ListTabs /> */}
          <CampaignForm />
          
         
       
        </main>
      </div>
    </Provider>
  );
}
