import React from "react";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";

interface ModalComponentProps {
  open: boolean;
  handleClose: () => void;
  selectedText: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  handleClose,
}) => {
  const { translated, loading } = useAppSelector(
    (state) => state.dictionaryReducer
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow">
        <Typography variant="h6">Translate</Typography>
        {loading ? (
          <Box className="flex justify-center">
            <CircularProgress />
          </Box>
        ) : (
          <Typography variant="body1" className="mt-2">
            {translated}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
