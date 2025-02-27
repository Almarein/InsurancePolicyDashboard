import {Policy} from '../models/policy';
import {getPolicyDistribution} from './distribution-service';

describe('Distribution service testing', () => {
    it('Should calculate policy count with the same factor', () => {
        const policies = [{ status: 'Active' }, { status: 'Active'}] as Policy[];
        const distribution = getPolicyDistribution(policies, policy => policy.status);
        expect(Object.keys(distribution).length).toEqual(1);
        expect(distribution['Active']).toEqual(2);
    });
    
    it('Should not combine policies with the different factor', () => {
        const policies = [{ status: 'Active' }, { status: 'Inactive'}] as Policy[];
        const distribution = getPolicyDistribution(policies, policy => policy.status);
        expect(Object.keys(distribution).length).toEqual(2);
        expect(distribution['Active']).toEqual(1);
        expect(distribution['Inactive']).toEqual(1);
    })
})