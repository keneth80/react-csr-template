import {useEffect, useCallback} from 'react';
import useJsonUserList from '../state/jsonuser';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Box} from '@mui/material';

export default function About() {
    const {users, updateUserData} = useJsonUserList();

    const updateUserDataHandler = useCallback(() => {
        updateUserData({
            title: 'kenneth',
            body: 'kenneth body',
            userId: '2'
        });
    }, [updateUserData]);

    useEffect(() => {
        console.log('useEffect.users : ', users);
    }, [users]);

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
                            <h1>소개</h1>
                            <p>About 프로젝트입니다.</p>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 2
                                }}
                            >
                                <Button variant="contained" onClick={() => updateUserDataHandler()}>
                                    update User
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 2
                                }}
                            >
                                {users.length}
                            </Box>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
