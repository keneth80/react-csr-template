import {memo, ReactNode} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface MuiDialogProps {
    title: string;
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    children: ReactNode;
}

function MuiDialog(props: MuiDialogProps) {
    const {onClose, selectedValue, open, title, children} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog>
    );
}

export default memo(MuiDialog);
