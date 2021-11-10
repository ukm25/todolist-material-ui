import { TextField, Button, Typography, Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import { chunk } from "lodash";

import { Filter } from "./Filter";
import { TodoList } from "./TodoList";

const TODO_APP_STORAGE_KEY = "TODO_APP";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [filterChoice, setFilterChoice] = useState("all");
  const [listShow, setListShow] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState();

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

  //set list show
  useEffect(() => {
    let todoListAdd = [];
    if (filterChoice === "all") {
      const getTodos = chunk(todoList,4);
      todoListAdd = getTodos[count-1];
    } else {
      if (filterChoice === "doing") {
        // setListShow((prev) =>
        //   todoList.filter((task) => task.isCompleted === false)
        // );
        const getTodos = chunk(todoList.filter((task) => task.isCompleted === false),4);
        todoListAdd = getTodos[count-1];
      } else {
        if (filterChoice === "completed") {
          // setListShow((prev) =>
          //   todoList.filter((task) => task.isCompleted === true)
          // );
          todoListAdd = todoList.filter((task) => task.isCompleted === true);
        } else {
          if (filterChoice === "search") {
            todoListAdd = todoList.filter((todo) => {
              return todo.name.includes(textInput);
            });
            // setListShow(todoListAdd);
          }
        }
      }
    }
    setListShow(todoListAdd);
  }, [
    filterChoice,
    setListShow,
    todoList,
    setTodoList,
    textInput,
    setTextInput,
    count,
    setCount,
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
  const filterTask = useCallback((option) => {
    setFilterChoice((prev) => option);
  }, []);

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

  const onEditBtnClick = useCallback((taskEdit) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === taskEdit.id ? taskEdit : todo))
    );
  }, []);

  const onSearchBtnClick = useCallback((e) => {
    filterTask("search");
  }, [filterTask]);

  const onPaginationBtnClick = useCallback((event, value) => {
    setCount(value)
    // setListShow(prev => prev.slice(count-1,count+3))
  },[setCount]);

  useEffect(() => {
    const pageCount = todoList.length;
    if (pageCount % 4 === 0) {
      setMaxCount(pageCount / 4);
    } else {
      setMaxCount(parseInt(pageCount / 4 + 1));
    }
  }, [todoList]);
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
        Danh sách công việc
      </Typography>
      <TextField
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
      <div
        md={12}
        style={{ justifyContent: "center", display: "flex", marginTop: "10px" }}
      >
        <Pagination
          onChange={onPaginationBtnClick}
          count={maxCount}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}

export default App;
