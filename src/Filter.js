import React, { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

function Filter({ filterTask, filterChoice }) {
  const onClickFilterChoice = (choice) => {
    filterTask(choice);
  };
  return (
    <ButtonGroup spacing={2} direction="row">
      <Button
        variant="outlined"
        style={{
          backgroundColor: filterChoice === "all" ? "#ef5350" : "",
          color: filterChoice === "all" ? "#fff" : "",
        }}
        onClick={() => onClickFilterChoice("all")}
      >
        All
      </Button>
      <Button
        variant="outlined"
        style={{
          backgroundColor: filterChoice === "doing" ? "#ef5350" : "",
          color: filterChoice === "doing" ? "#fff" : "",
        }}
        onClick={() => onClickFilterChoice("doing")}
      >
        Doing
      </Button>
      <Button
        variant="outlined"
        style={{
          backgroundColor: filterChoice === "completed" ? "#ef5350" : "",
          color: filterChoice === "completed" ? "#fff" : "",
        }}
        onClick={() => onClickFilterChoice("completed")}
      >
        Completed
      </Button>
    </ButtonGroup>
  );
}

export { Filter };
