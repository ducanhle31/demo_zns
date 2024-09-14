import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CampaignState {
  name: string;
  description: string;
  customer: string | null;
  sendMode: "auto" | "immediate";
  date: string;
  templateId: number | null;
}

const initialState: CampaignState = {
  name: "",
  description: "",
  customer: null,
  sendMode: "immediate",
  date: "",
  templateId: null,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setCustomer: (state, action: PayloadAction<string>) => {
      state.customer = action.payload;
    },
    setTemplateId(state, action: PayloadAction<number | null>) {
      state.templateId = action.payload;
    },

    setSendMode: (state, action: PayloadAction<"auto" | "immediate">) => {
      state.sendMode = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
});

export const {
  setName,
  setDescription,
  setCustomer,
  setTemplateId,
  setSendMode,
  setDate,
} = campaignSlice.actions;
export default campaignSlice.reducer;
