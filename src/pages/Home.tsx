import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useToggleModal} from '../hooks';

export default function Home() {
    const {openModal} = useToggleModal();

    return (
        <Container maxWidth="xl" sx={{pt: 4, pb: 4, pr: 4, pl: 4, width: '100%'}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: 340
                        }}
                    >
                        <div>
                            <h1>Home</h1>
                            <p>Home 페이지입니다.</p>
                            <button onClick={openModal}>show Modal</button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
