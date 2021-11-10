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
  const [todoShow, setTodoShow] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState();

  //lấy data từ localstorage
  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList((prev) => JSON.parse(storageTodoList));
    }
  }, [setTodoList]);

  //lưu data vào localstorage
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  //set list show
  useEffect(() => {
    let getTodos = [];
    if (filterChoice === "all") {
      setListShow(todoList);
      getTodos = chunk(todoList, 4);
    } else {
      if (filterChoice === "doing") {
        setListShow(todoList.filter((task) => task.isCompleted === false));
        getTodos = chunk(
          todoList.filter((task) => task.isCompleted === false),
          4
        );
      } else {
        if (filterChoice === "completed") {
          setListShow(todoList.filter((task) => task.isCompleted === true));
          getTodos = chunk(
            todoList.filter((task) => task.isCompleted === true),
            4
          );
        } else {
          if (filterChoice === "search") {
            setListShow(
              todoList.filter((todo) => {
                return todo.name.includes(textInput);
              })
            );
            getTodos = chunk(
              todoList.filter((todo) => {
                return todo.name.includes(textInput);
              }),
              4
            );
          }
        }
      }
    }
    setTodoShow(getTodos[count - 1]);
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

  const onSearchBtnClick = useCallback(
    (e) => {
      filterTask("search");
    },
    [filterTask]
  );

  const onPaginationBtnClick = useCallback(
    (event, value) => {
      setCount(value);
    },
    [setCount]
  );

  useEffect(() => {
    const pageCount = listShow.length;
    if (pageCount % 4 === 0) {
      setMaxCount(pageCount / 4);
    } else {
      setMaxCount(parseInt(pageCount / 4 + 1));
    }
  }, [listShow]);
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
        tasksShow={todoShow}
        completeTask={completeTask}
        onEditBtnClick={onEditBtnClick}
      />
      <Filter filterTask={filterTask} filterChoice={filterChoice}/>
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
