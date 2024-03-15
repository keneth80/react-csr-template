import {Navigate, useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/auth/useAuth';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

const defaultTheme = createTheme();

export const Verify2FA = () => {
    const navigate = useNavigate();
    const {user, verify2FACode} = useAuth();
    console.log('Verify2FA : ', user);
    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const isValid = await verify2FACode(data.get('verify'));
        if (isValid) {
            navigate('/dashboard');
        } else {
            alert('Invalid code. Please try again.');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{m: 2, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enter verification code
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="verify"
                            label="Verify"
                            type="text"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Verify
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
