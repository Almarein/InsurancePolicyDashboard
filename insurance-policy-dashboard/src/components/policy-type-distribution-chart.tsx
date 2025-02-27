import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import {State} from '../store/store';
import {PieChart} from '@mui/x-charts/PieChart';
import {getPolicyDistribution} from '../services/distribution-service';
import {Stack, Typography} from '@mui/material';

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
        <Stack direction="column" spacing={3} sx={{alignItems: 'center'}}>
            <Typography sx={{fontSize: 20}}>Type distribution</Typography>
            <PieChart
                series={[{
                    data: chartData
                }]}
                height={300}
                width={500}
            />
        </Stack>
    )
}