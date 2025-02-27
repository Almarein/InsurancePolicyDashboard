import {Stack, Typography} from '@mui/material'
import {PolicyTypeFilter} from './filters/policy-type-filter';
import {PremiumAmountFilter} from './filters/premium-amount-filter';
import {ActivationDateFilter} from './filters/activation-date-filter';
import {PolicyStatusFilter} from './filters/policy-status-filter';

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