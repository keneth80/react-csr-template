import {useState, useEffect, useCallback} from 'react';
import {useRecoilValue, useRecoilRefresher_UNSTABLE} from 'recoil';
import useJsonUserList, {getUser, updateUser} from '../state/jsonuser';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useRealTimeDollar from '../state/doller';
import {Box} from '@mui/material';

export default function About() {
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(0);
    const [update, setUpdate] = useState({
        title: '',
        body: '',
        userId: ''
    });
    // temp user
    const userObj = useRecoilValue(getUser(userId));

    // update user
    const updateObj = useRecoilValue(updateUser(update));

    const {dollar, setDollar} = useRealTimeDollar();

    const {users, updateUserData} = useJsonUserList();

    // 캐싱처리되는 데이터를 다시 받아오기 위함.
    const refresh = useRecoilRefresher_UNSTABLE(getUser(1));

    const dollarRefresh = useCallback(() => {
        setDollar(dollar + 10);
    }, [setDollar]);

    const changeUser = useCallback(() => {
        setUserId(userId + 1);
    }, [setUserId]);

    const updateUserDataHandler = useCallback(() => {
        updateUserData({
            title: 'kenneth',
            body: 'kenneth body',
            userId: '2'
        });
    }, [updateUserData]);

    useEffect(() => {
        setText(dollar + '');
    }, [dollar]);

    useEffect(() => {
        if (update.userId) {
            setUserId(+update.userId);
            setUpdate({
                title: '',
                body: '',
                userId: ''
            });
        }
        console.log('update : ', update);
    }, [update]);

    useEffect(() => {
        console.log('useEffect.users : ', users);
    }, [users]);

    console.log('users : ', users);

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
                            <p>{JSON.stringify(userObj)}</p>
                            <div>{text}</div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 2
                                }}
                            >
                                <Button variant="contained" onClick={() => changeUser()}>
                                    change User
                                </Button>
                                <Button variant="contained" onClick={() => updateUserDataHandler()}>
                                    update User
                                </Button>
                                <Button variant="contained" onClick={() => dollarRefresh()}>
                                    Dollar update
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
