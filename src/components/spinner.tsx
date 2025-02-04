import { Backdrop, CircularProgress } from '@mui/material';

export default function Spinner() {
    return (
        <Backdrop sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
            <CircularProgress color="secondary" />
        </Backdrop>
    );
}