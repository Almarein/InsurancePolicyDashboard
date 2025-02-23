import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getPolicyList} from '../services/policy-service.tsx';
import {Policy} from '../models/policy.tsx';
import {applyPolicyFilters, PolicyFilters} from '../services/policy-filter-service.tsx';
import dayjs from 'dayjs';

interface PolicyState {
    policyList: Policy[];
    filteredPolicyList: Policy[];
    filters: PolicyFilters;
    loading: boolean;
    error?: string;
}

export const fetchPolicyList = createAsyncThunk(
    'policyList/fetch',
    async () => {
        return await getPolicyList() as Policy[];
    }
)

const policySlice = createSlice({
    name: 'policy',
    initialState: {
        policyList: [],
        filteredPolicyList: [],
        filters: {
            policyTypes: [],
            premiumAmount: [0, 0],
            activationDateEnd: null,
            activationDateStart: null,
            statuses: []
        },
        loading: false
    } as PolicyState,
    reducers: {
        applyPolicyTypeFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.policyTypes = action.payload;
            state.filteredPolicyList = applyPolicyFilters(state.policyList, state.filters);
        },
        applyPremiumAmountFilter: (state, action: PayloadAction<number[]>) => {
            state.filters.premiumAmount = action.payload;
            state.filteredPolicyList = applyPolicyFilters(state.policyList, state.filters);
        },
        applyActivationDateStartFilter: (state, action: PayloadAction<dayjs.Dayjs | null>) => {
            state.filters.activationDateStart = action.payload;
            state.filteredPolicyList = applyPolicyFilters(state.policyList, state.filters);
        },
        applyActivationDateEndFilter: (state, action: PayloadAction<dayjs.Dayjs | null>) => {
            state.filters.activationDateEnd = action.payload;
            state.filteredPolicyList = applyPolicyFilters(state.policyList, state.filters);
        },
        applyStatusFilter: (state, action: PayloadAction<string[]>) => {
            state.filters.statuses = action.payload;
            state.filteredPolicyList = applyPolicyFilters(state.policyList, state.filters);
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPolicyList.pending, state => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchPolicyList.fulfilled, (state, action) => {
            state.loading = false;
            state.policyList = action.payload;
        });
        builder.addCase(fetchPolicyList.rejected, (state, action) => {
            state.loading = false;
            state.policyList = [];
            state.error = action.error.message;
        });
    }
})

export const {
    applyPolicyTypeFilter,
    applyPremiumAmountFilter,
    applyActivationDateStartFilter,
    applyActivationDateEndFilter,
    applyStatusFilter
} = policySlice.actions;
export default policySlice.reducer;