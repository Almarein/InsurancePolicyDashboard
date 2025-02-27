import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import {State} from '../store/store';
import {Policy} from '../models/policy';
import {LineChart} from '@mui/x-charts/LineChart';
import {getPolicyDistribution} from '../services/distribution-service';
import { Stack, Typography } from '@mui/material';

export const PolicyActivationChart = () => {
    const policies = useSelector((state: State) => state.policy.filteredPolicyList);

    const getPolicyStartYear = (policy: Policy) => {
        return new Date(policy.startDate).getUTCFullYear().toString();
    }

    const chartData = useMemo(() => {
        if (!policies?.length) return [];

        const dateDistribution = getPolicyDistribution(policies, getPolicyStartYear);

        const minYear = Object.keys(dateDistribution).reduce((minYear, year) => Math.min(minYear, Number(year)), Number.MAX_VALUE);
        const maxYear = Object.keys(dateDistribution).reduce((minYear, year) => Math.max(minYear, Number(year)), Number.MIN_VALUE);

        const chartData = [];
        for (let year = minYear; year <= maxYear; year += 1) {
            chartData.push({year: year, policyActivations: dateDistribution[year] ?? 0});
        }

        return chartData;
    }, [policies]);

    return (
        <Stack direction='column' spacing={3} sx={{ alignItems: 'center' }}>
            <Typography sx={{ fontSize: 20 }}>Policy activations</Typography>
            <LineChart
                dataset={chartData}
                xAxis={[{
                    dataKey: 'year',
                    scaleType: 'linear',
                    tickMinStep: 1,
                    label: 'Year',
                    valueFormatter: (year: number) => year.toString()
                }]}
                yAxis={[{
                    min: 0,
                    dataKey: 'policyActivations',
                    tickMinStep: 1,
                    label: 'Policy activations'
                }]}
                series={[{dataKey: 'policyActivations'}]}
                height={300}
                width={500}
            />
        </Stack>
    )
}