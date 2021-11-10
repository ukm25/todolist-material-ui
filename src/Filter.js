import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Filter({ filterTask }) {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={() => filterTask("all")}>All</Button>
            <Button variant="outlined" onClick={() => filterTask("doing")}>Doing</Button>
            <Button variant="outlined" onClick={() => filterTask("completed")}>Completed</Button>
        </Stack>
    );
}

export { Filter } ;