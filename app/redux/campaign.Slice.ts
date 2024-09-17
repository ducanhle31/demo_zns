import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customer {
  phone: string;
  customers: string; // Added property
}

interface CampaignState {
  campaign_name: string;
  campaign_description: string;
  sendMode: 'auto' | 'immediate';
  campaign_time: string;
  customers: Customer[];
  templateId: number | null;
  campaign_type: string;
}

const initialState: CampaignState = {
  campaign_name: '',
  campaign_description: '',
  sendMode: 'immediate',
  campaign_time: '',
  customers: [],
  templateId: null,
  campaign_type: '',
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.campaign_name = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.campaign_description = action.payload;
    },
    setTemplateId(state, action: PayloadAction<number | null>) {
      state.templateId = action.payload;
    },
    setSendMode(state, action: PayloadAction<'auto' | 'immediate'>) {
      state.sendMode = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.campaign_time = action.payload;
    },
    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.customers = action.payload;
    },
    setCusType(state, action: PayloadAction<string>) {
      state.campaign_type = action.payload;
    },
    setCustomerPhone(
      state,
      action: PayloadAction<{ customerIndex: number; phone: string }>
    ) {
      const { customerIndex, phone } = action.payload;
      if (state.customers[customerIndex]) {
        state.customers[customerIndex].phone = phone;
      }
    },
    setCustomerString(
      state,
      action: PayloadAction<{ customerIndex: number; customers: string }>
    ) {
      const { customerIndex, customers } = action.payload;
      if (state.customers[customerIndex]) {
        state.customers[customerIndex].customers = customers;
      }
    },
  },
});

export const {
  setName,
  setDescription,
  setTemplateId,
  setSendMode,
  setDate,
  setCustomers,
  setCustomerPhone,
  setCustomerString, 
  setCusType
} = campaignSlice.actions;

export default campaignSlice.reducer;
