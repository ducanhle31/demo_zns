// In your campaign.Slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CampaignState {
  name: string;
  description: string;
  sendMode: "auto" | "immediate";
  date: string;
  customer: string;
  templateId: number | null;
  phone: string[];
}

const initialState: CampaignState = {
  name: '',
  description: '',
  sendMode: 'immediate',
  date: '',
  customer: '',
  templateId: null,
  phone: [], 
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setCustomer(state, action: PayloadAction<string>) {
      state.customer = action.payload;
    },
    setTemplateId(state, action: PayloadAction<number | null>) {
      state.templateId = action.payload;
    },
    setSendMode(state, action: PayloadAction<'auto' | 'immediate'>) {
      state.sendMode = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setPhone(state, action: PayloadAction<string[]>)
   { 
      state.phone = action.payload;
    },
  },
});

export const { setName, setDescription, setCustomer, setTemplateId, setSendMode, setDate, setPhone } = campaignSlice.actions;
export default campaignSlice.reducer;
