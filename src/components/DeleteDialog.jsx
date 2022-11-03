import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const DeleteDialog = ({ open, onClose, title, onConfirmDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onConfirmDelete}>Deletar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
