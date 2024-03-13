import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingBar() {
    return (
        <Box sx={{width: '100%', height: 'calc(100% - 116px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress />
        </Box>
    );
}
