import Grid from '@mui/material/Grid2';
import {useSelector} from 'react-redux';
import {State, store} from '../store/store';
import {useEffect} from 'react';
import {LoadingScreen} from '../components/loading-screen';
import {ErrorIndicator} from '../components/error-indicator';
import {PolicyActivationChart} from '../components/policy-activation-chart';
import {fetchPolicyList} from '../store/policy-slice';
import {PolicyTypeDistributionChart} from '../components/policy-type-distribution-chart';
import {PolicyFilters} from '../components/policy-filters';

export const PolicyDashboard = () => {
    const loading = useSelector((state: State) => state.policy.loading);

    useEffect(() => {
        store.dispatch(fetchPolicyList());
    }, []);

    return (
        <>
            {loading && <LoadingScreen/>}
            <Grid container>
                <Grid size={2}>
                    <PolicyFilters/>
                </Grid>
                <Grid size={5}>
                    <PolicyActivationChart/>
                </Grid>
                <Grid size={5}>
                    <PolicyTypeDistributionChart/>
                </Grid>
            </Grid>
            <ErrorIndicator/>
        </>
    )
}
