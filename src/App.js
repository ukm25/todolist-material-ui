import { TextField, Button, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

import { Filter } from "./Filter";
import { TodoList } from "./TodoList";

const TODO_APP_STORAGE_KEY = "TODO_APP";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [filterChoice, setFilterChoice] = useState("all");
  const [listShow, setListShow] = useState([]);
  const [textInput, setTextInput] = useState("");

  //get data from storage
  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList((prev) => JSON.parse(storageTodoList));
    }
  }, [setTodoList]);

  //save data to local storage
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    if (filterChoice === "all") {
      setListShow((prev) => todoList);
    } else {
      if (filterChoice === "doing") {
        setListShow((prev) =>
          todoList.filter((task) => task.isCompleted === false)
        );
      } else {
        if (filterChoice === "completed") {
          setListShow((prev) =>
            todoList.filter((task) => task.isCompleted === true)
          );
        }
      }
    }
  }, [
    filterChoice,
    setFilterChoice,
    listShow,
    setListShow,
    todoList,
    setTodoList,
  ]);

  const onTextInputChange = useCallback((e) => {
    setTextInput((prev) => e.target.value);
  }, []);

  const completeTask = useCallback((id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);
  const filterTask = (option) => {
    setFilterChoice((prev) => option);
  };

  const onAddBtnClick = useCallback(
    (e) => {
      setTodoList((prev) => [
        { id: v4(), name: textInput, isCompleted: false },
        ...prev,
      ]);

      setTextInput((prev) => "");
    },
    [setTodoList, setTextInput, textInput]
  );

  const onEditBtnClick = (taskEdit) => {
    console.log("task", taskEdit);
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === taskEdit.id ? taskEdit : todo))
    );
  };

  const onSearchBtnClick = (text) => {
    
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Danh sách công việc
      </Typography>
      <TextField
        id="time"
        type="text"
        fullWidth
        InputProps={{
          endAdornment: (
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={onAddBtnClick}
                disabled={!textInput}
              >
                Thêm
              </Button>
              <Button
                variant="contained"
                onClick={onSearchBtnClick}
                disabled={!textInput}
              >
                Search
              </Button>
            </Stack>
          ),
        }}
        placeholder="Công việc cần làm..."
        onChange={onTextInputChange}
        value={textInput}
      />
      <TodoList
        tasksShow={listShow}
        completeTask={completeTask}
        onEditBtnClick={onEditBtnClick}
      />
      <Filter filterTask={filterTask} />
    </>
  );
}

export default App;
