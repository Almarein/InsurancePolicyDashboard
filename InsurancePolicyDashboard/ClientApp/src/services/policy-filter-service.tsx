import {Policy} from '../models/policy';
import dayjs from 'dayjs';

export interface PolicyFilters {
    policyTypes: string[];
    premiumAmount: number[];
    activationDateStart: dayjs.Dayjs | null;
    activationDateEnd: dayjs.Dayjs | null;
    statuses: string[];
}

export const applyPolicyFilters = (policies: Policy[], filters: PolicyFilters): Policy[] => {
    let filteredPolicies = [...policies];
    if (filters.policyTypes.length > 0) {
        filteredPolicies = filteredPolicies.filter(policy => filters.policyTypes.includes(policy.policyType));
    }
    filteredPolicies = filteredPolicies.filter(policy => 
        policy.premiumAmount >= filters.premiumAmount[0] && policy.premiumAmount <= filters.premiumAmount[1]);
    if (filters.activationDateStart) {
        filteredPolicies = filteredPolicies.filter(policy => dayjs(policy.startDate).isAfter(filters.activationDateStart));
    }
    if (filters.activationDateEnd) {
        filteredPolicies = filteredPolicies.filter(policy => dayjs(policy.startDate).isBefore(filters.activationDateEnd));
    }
    if (filters.statuses.length > 0) {
        filteredPolicies = filteredPolicies.filter(policy => filters.statuses.includes(policy.status));
    }
    return filteredPolicies;
}