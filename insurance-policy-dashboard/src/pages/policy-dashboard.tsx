import Grid from "@mui/material/Grid2";
import {useSelector} from "react-redux";
import {State, store} from "../store/store.tsx";
import {useEffect} from "react";
import {LoadingScreen} from "../components/loading-screen.tsx";
import {ErrorIndicator} from "../components/error-indicator.tsx";
import {PolicyActivationChart} from "../components/policy-activation-chart.tsx";
import {fetchPolicyList} from "../store/policy-slice.tsx";
import {PolicyTypeDistributionChart} from "../components/policy-type-distribution-chart.tsx";
import {PolicyFilters} from '../components/policy-filters.tsx';

export const PolicyDashboard = () => {
    const loading = useSelector((state: State) => state.policy.loading);
    useEffect(() => {
        store.dispatch(fetchPolicyList());
    }, []);

    return (
        <>
            {loading && <LoadingScreen />}
            <Grid container spacing={5}>
                <Grid size={2}>
                    <PolicyFilters />
                </Grid>
                <Grid size={5}>
                    <PolicyActivationChart />
                </Grid>
                <Grid size={5}>
                    <PolicyTypeDistributionChart />
                </Grid>
            </Grid>
            <ErrorIndicator />
        </>
    )
}
