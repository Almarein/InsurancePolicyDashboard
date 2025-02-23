import {FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent} from '@mui/material'
import {State, store} from '../../store/store.tsx';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import {applyStatusFilter} from '../../store/policy-slice.tsx';

export const PolicyStatusFilter = () => {
    const policies = useSelector((state: State) => state.policy.policyList);
    const statusFilter = useSelector((state: State) => state.policy.filters.statuses);

    const policyStatuses = useMemo(() => {
        const statuses = new Set<string>();
        policies.forEach(policy => statuses.add(policy.status));
        return Array.from(statuses);
    }, [policies]);

    const handleChange = (event: SelectChangeEvent<typeof statusFilter>) => {
        const { target: { value } } = event;
        store.dispatch(applyStatusFilter(typeof value === 'string' ? value.split(',') : value));
    };

    return (
        <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
                multiple
                value={statusFilter}
                onChange={handleChange}
                input={<OutlinedInput label="Status"/>}
                renderValue={(selected) => selected.join(', ')}
            >
                {policyStatuses.map((type) => (
                    <MenuItem key={type} value={type}>
                        <Checkbox checked={statusFilter.includes(type)}/>
                        <ListItemText primary={type}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}