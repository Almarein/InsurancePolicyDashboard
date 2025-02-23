import {useSelector} from 'react-redux';
import {State} from '../store/store.tsx';
import {Snackbar} from '@mui/material';
import {useEffect, useState} from 'react';

export const ErrorIndicator = () => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const errors = useSelector((state: State) => state.policy.error);

    useEffect(() => {
        if (!errors) return;
        setShowErrorMessage(true);
    }, [errors]);

    return (
        <Snackbar
            open={showErrorMessage}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            ContentProps={{sx: {backgroundColor: 'indianred'}}}
            onClose={() => setShowErrorMessage(false)}
            autoHideDuration={3000}
            message={errors}
        />
    )
}