import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

function Filter({ filterTask }) {
  return (
      <ButtonGroup spacing={2} direction="row" >
        <Button variant="outlined" onClick={() => filterTask("all")}>
          All
        </Button>
        <Button variant="outlined" onClick={() => filterTask("doing")}>
          Doing
        </Button>
        <Button variant="outlined" onClick={() => filterTask("completed")}>
          Completed
        </Button>
      </ButtonGroup>
  );
}

export { Filter };
