import {Stack, Typography} from '@mui/material'
import {PolicyTypeFilter} from './filters/policy-type-filter.tsx';
import {PremiumAmountFilter} from './filters/premium-amount-filter.tsx';
import {ActivationDateFilter} from './filters/activation-date-filter.tsx';
import {PolicyStatusFilter} from './filters/policy-status-filter.tsx';

export const PolicyFilters = () => {
    return (
        <Stack direction="column" spacing={2}>
            <Typography sx={{ fontSize: 20 }}>Filters</Typography>
            <PolicyTypeFilter />
            <PremiumAmountFilter />
            <ActivationDateFilter />
            <PolicyStatusFilter />
        </Stack>
    )
}