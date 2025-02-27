import {applyPolicyFilters, PolicyFilters} from './policy-filter-service';
import {Policy} from '../models/policy';
import dayjs from 'dayjs';

describe('Policy filter service', () => {
    it('Should return unchanged list in case there are no filters', () => {
        const policies = [{ premiumAmount: 1000 }] as Policy[];
        const filteredPolicies = applyPolicyFilters(policies, defaultFilters);
        expect(filteredPolicies).toEqual(policies);
    });


    it('Should leave only compatible types if type filter is set', () => {
        const policies = [
            { premiumAmount: 1000, policyType: 'Car' },
            { premiumAmount: 1000, policyType: 'Home' }
        ] as Policy[];
        const filteredPolicies = applyPolicyFilters(policies, {...defaultFilters, policyTypes: ['Home']});
        expect(filteredPolicies.length).toEqual(1);
        expect(filteredPolicies[0].policyType).toEqual('Home');
    });

    it('Should remove policies outside of premium amount range', () => {
        const policies = [{ premiumAmount: 1000 }, { premiumAmount: 2000 }, { premiumAmount: 3000 }] as Policy[];
        const filteredPolicies = applyPolicyFilters(policies, {...defaultFilters, premiumAmount: [1500, 2500]});
        expect(filteredPolicies.length).toEqual(1);
        expect(filteredPolicies[0].premiumAmount).toEqual(2000);
    });

    it('Should leave only compatible statuses if type filter is set', () => {
        const policies = [
            { premiumAmount: 1000, status: 'Active' },
            { premiumAmount: 1000, status: 'Inactive' }
        ] as Policy[];
        const filteredPolicies = applyPolicyFilters(policies, {...defaultFilters, statuses: ['Active']});
        expect(filteredPolicies.length).toEqual(1);
        expect(filteredPolicies[0].status).toEqual('Active');
    });

    it('Should remove policies with activation date less than start one', () => {
        const policies = [
            { premiumAmount: 1000, startDate: '2021-01-01' },
            { premiumAmount: 1000, startDate: '2023-01-01' }
        ] as Policy[];
        const filteredPolicies = applyPolicyFilters(policies, {...defaultFilters, activationDateStart: dayjs('2022-01-01')});
        expect(filteredPolicies.length).toEqual(1);
        expect(filteredPolicies[0].startDate).toEqual('2023-01-01');
    });

    it('Should remove policies with activation date greater than end one', () => {
        const policies = [
            { premiumAmount: 1000, startDate: '2021-01-01' },
            { premiumAmount: 1000, startDate: '2023-01-01' }
        ] as Policy[];
        const filteredPolicies = applyPolicyFilters(policies, {...defaultFilters, activationDateEnd: dayjs('2022-01-01')});
        expect(filteredPolicies.length).toEqual(1);
        expect(filteredPolicies[0].startDate).toEqual('2021-01-01');
    });
})

const defaultFilters: PolicyFilters = {
    policyTypes: [],
    statuses: [],
    premiumAmount: [Number.MIN_VALUE, Number.MAX_VALUE],
    activationDateStart: null,
    activationDateEnd: null
}