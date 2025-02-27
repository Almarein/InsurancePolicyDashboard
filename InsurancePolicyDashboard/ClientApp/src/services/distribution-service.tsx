import {Policy} from '../models/policy';

interface Distribution {
    [factor: string]: number;
}

export const getPolicyDistribution = (policies: Policy[], distributeBy: ((policy: Policy) => string)) => {
    return policies.reduce((distribution: Distribution, policy: Policy) => {
        const factor = distributeBy(policy);
        distribution[factor] = distribution[factor] ? distribution[factor] + 1 : 1;
        return distribution;
    }, {});
}