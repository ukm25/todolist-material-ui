import React, { useState, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { styled, Box } from "@mui/system";
import { ModalUnstyled } from "@mui/core";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
  borderRadius: 3,
};

function TodoList({ tasksShow, completeTask, onEditBtnClick }) {
  const [open, setOpen] = useState(false);
  // const [task, setTask] = useState([]);

  // const tasks = [...tasksShow];

  const [id, setId] = useState("");
  const [status, setStatus] = useState();
  const [name, setName] = useState("");
  const [textInput, setTextInput] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onTextInputChange = useCallback(
    (e) => {
      setTextInput((prev) => e.target.value);
    },
    [setTextInput]
  );

  const editTask = () => {
    onEditBtnClick({ id: id, name: textInput, isCompleted: status });
    handleClose();
  };

  const clickTask = (task) => {
    setId(task.id);
    setStatus(task.isCompleted);
    setName(task.name);
    setTextInput(task.name);
    handleOpen(task);
    // setTask(task);
  };
  return (
    <>
      {/* {console.log("id:",id)}
    {console.log("status:",status)} */}
      {tasksShow ? (
        <List>
          {tasksShow.map((task) => (
            <ListItem disablePadding key={task.id}>
              <ListItemButton onClick={() => clickTask(task)}>
                <ListItemText primary={task.name} />
                {!task.isCompleted && (
                  <ListItemIcon className="check-icon">
                    <CloseIcon
                      color="primary"
                      onClick={() => completeTask(task.id)}
                    />
                  </ListItemIcon>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}

      <StyledModal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            Chỉnh sửa
          </Typography>
          <TextField
            id="time"
            type="text"
            fullWidth
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  onClick={editTask}
                  disabled={textInput === name || textInput === ""}
                >
                  Lưu
                </Button>
              ),
            }}
            placeholder="Chỉnh sửa công việc..."
            onChange={onTextInputChange}
            value={textInput}
          />
        </Box>
      </StyledModal>
    </>
  );
}

export { TodoList };
