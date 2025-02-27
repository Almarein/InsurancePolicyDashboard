import {FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent} from '@mui/material'
import {State, store} from '../../store/store';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import {applyPolicyTypeFilter} from '../../store/policy-slice';

export const PolicyTypeFilter = () => {
    const policies = useSelector((state: State) => state.policy.policyList);
    const policyTypeFilter = useSelector((state: State) => state.policy.filters.policyTypes);
    
    const policyTypes = useMemo(() => {
        const types = new Set<string>();
        policies.forEach(policy => types.add(policy.policyType));
        return Array.from(types);
    }, [policies]);

    const handleChange = (event: SelectChangeEvent<typeof policyTypeFilter>) => {
        const { target: { value } } = event;
        store.dispatch(applyPolicyTypeFilter(typeof value === 'string' ? value.split(',') : value));
    };

    return (
        <FormControl>
            <InputLabel>Policy type</InputLabel>
            <Select
                multiple
                value={policyTypeFilter}
                onChange={handleChange}
                input={<OutlinedInput label="Policy type"/>}
                renderValue={(selected) => selected.join(', ')}
            >
                {policyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                        <Checkbox checked={policyTypeFilter.includes(type)}/>
                        <ListItemText primary={type}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}