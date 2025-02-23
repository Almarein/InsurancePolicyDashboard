import {Box, CircularProgress, Modal, SxProps, Theme} from '@mui/material';

const dialogStyle: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none'
};

export const LoadingScreen = () => (
    <Box justifyContent="center">
        <Modal open={true} aria-labelledby="modal-loading">
            <Box sx={dialogStyle}>
                <CircularProgress size={50}/>
            </Box>
        </Modal>
    </Box>
);