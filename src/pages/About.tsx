import {useState, useEffect} from 'react';
import {useRecoilValue, useRecoilRefresher_UNSTABLE} from 'recoil';
import {tempUser} from '../state';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function About() {
    const [user, setUser] = useState<any>(null);
    // temp user
    const userObj = useRecoilValue(tempUser(2));

    // 캐싱처리되는 데이터를 다시 받아오기 위함.
    const refresh = useRecoilRefresher_UNSTABLE(tempUser(2));

    useEffect(() => {
        if (!user) {
            setUser(userObj);
            console.log('set user');
        }
    }, [user, userObj]);

    console.log('userObj : ', userObj);

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
                            <Button variant="contained" onClick={() => refresh()}>
                                Refresh
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
