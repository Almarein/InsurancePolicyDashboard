import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import {State} from '../store/store.tsx';
import {PieChart} from '@mui/x-charts/PieChart';
import {getPolicyDistribution} from '../services/distribution-service.tsx';

interface ChartData {
    label: string;
    value: number;
}

export const PolicyTypeDistributionChart = () => {
    const policies = useSelector((state: State) => state.policy.filteredPolicyList);

    const chartData = useMemo(() => {
        if (!policies?.length) return [];

        const policyTypeDistribution = getPolicyDistribution(policies, policy => policy.policyType);

        return Object.keys(policyTypeDistribution).reduce((data: ChartData[], policyType: string) => {
            return [...data, {label: policyType, value: policyTypeDistribution[policyType]}];
        }, [])
    }, [policies]);

    return (
        <PieChart
            series={[{
                data: chartData
            }]}
            height={300}
            width={500}
        />
    )
}