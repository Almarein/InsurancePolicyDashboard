import {Stack} from '@mui/material'
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {State, store} from '../../store/store.tsx';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {applyActivationDateEndFilter, applyActivationDateStartFilter} from '../../store/policy-slice.tsx';

export const ActivationDateFilter = () => {
    const dateStart = useSelector((state: State) => state.policy.filters.activationDateStart);
    const dateEnd = useSelector((state: State) => state.policy.filters.activationDateEnd);

    const applyDateStartFilter = (date: dayjs.Dayjs | null) => {
        store.dispatch(applyActivationDateStartFilter(date));
    }

    const applyDateEndFilter = (date: dayjs.Dayjs | null) => {
        store.dispatch(applyActivationDateEndFilter(date));
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="column" spacing={2}>
                <DatePicker
                    value={dateStart}
                    label="Activation date start"
                    onChange={applyDateStartFilter}
                />
                <DatePicker
                    value={dateEnd}
                    label="Activation date end"
                    onChange={applyDateEndFilter}
                />
            </Stack>
        </LocalizationProvider>
    )
}