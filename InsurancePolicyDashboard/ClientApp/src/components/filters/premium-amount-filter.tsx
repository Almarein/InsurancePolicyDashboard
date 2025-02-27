import {Slider, Stack, Typography} from '@mui/material';
import {State, store} from '../../store/store';
import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {applyPremiumAmountFilter} from '../../store/policy-slice';

export const PremiumAmountFilter = () => {
    const policies = useSelector((state: State) => state.policy.policyList);
    const premiumAmountFilter = useSelector((state: State) => state.policy.filters.premiumAmount);

    const minPremiumAmount = useMemo(() => {
        return policies.reduce((min, policy) => Math.min(min, policy.premiumAmount), Number.MAX_VALUE);
    }, [policies]);

    const maxPremiumAmount = useMemo(() => {
        return policies.reduce((max, policy) => Math.max(max, policy.premiumAmount), Number.MIN_VALUE);
    }, [policies]);

    useEffect(() => {
        store.dispatch(applyPremiumAmountFilter([minPremiumAmount, maxPremiumAmount]));
    }, [policies]);

    const handleChange = (_: Event, newValue: number | number[]) => {
        store.dispatch(applyPremiumAmountFilter(newValue as number[]));
    };

    return (
        <Stack direction="column" spacing={5}>
            <Typography sx={{ alignSelf: 'flex-start' }}>Premium amount</Typography>
            <Slider
                getAriaLabel={() => 'Premium amount range'}
                min={minPremiumAmount}
                max={maxPremiumAmount}
                value={premiumAmountFilter}
                onChange={handleChange}
                valueLabelDisplay="on"
            />
        </Stack>
    )
}