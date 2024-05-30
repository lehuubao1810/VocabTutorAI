import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Modal } from "../../type/Modal";

type Props = {
  modal: Modal;
  setModal: React.Dispatch<React.SetStateAction<Modal>>;
};

export const ModalConfirm: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.modal.isOpen}
      onClose={() => props.setModal({ ...props.modal, isOpen: false })}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.modal.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.modal.content.map((content, index) => (
            <div key={index}>
              <p key={index}>{content}</p>
              <br />
            </div>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.setModal({ ...props.modal, isOpen: false })}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={props.modal.onConfirm} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
