import {useState, useCallback} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import {blue} from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import {useToggleModal} from '../hooks';
import MuiDialog from '../componenets/common/MuiDialog';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function VersionManager() {
    const {openModal} = useToggleModal();
    const [open, setOpenDialog] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);

    const handleClickOpen = useCallback(() => {
        setOpenDialog(true);
    }, [setOpenDialog]);

    const handleClose = useCallback(
        (value: string) => {
            setSelectedValue(value);
            setOpenDialog(false);
        },
        [setSelectedValue, setOpenDialog]
    );

    const handleListItemClick = useCallback(
        (value: string) => {
            setSelectedValue(value);
            setOpenDialog(false);
        },
        [setSelectedValue, setOpenDialog]
    );

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
                            <Button variant="contained" onClick={openModal}>
                                show Modal
                            </Button>
                            <br />
                            <br />
                            <Typography variant="subtitle1" component="div">
                                Selected: {selectedValue}
                            </Typography>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Open simple dialog
                            </Button>
                            <MuiDialog title={'Sample Dialog'} selectedValue={selectedValue} open={open} onClose={handleClose}>
                                <List sx={{pt: 0}}>
                                    {emails.map((email) => (
                                        <ListItem disableGutters key={email}>
                                            <ListItemButton onClick={() => handleListItemClick(email)}>
                                                <ListItemAvatar>
                                                    <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                                        <PersonIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={email} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                    <ListItem disableGutters>
                                        <ListItemButton autoFocus onClick={() => handleListItemClick('addAccount')}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AddIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Add account" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </MuiDialog>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
