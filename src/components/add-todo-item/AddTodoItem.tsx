import React, { useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { Box, Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";

/*
*   Form for adding a new task
*/

const TodoForm = observer(() => {

    const todoStore = useTodoStore();
    const [value, setValue] = useState<string>("");


    const handleAddItemInputOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(e.target.value.trim());
    };

    const handleAddItemButtonOnClick = () => {
        if (value !== "") todoStore.addTodo(value);
        setValue("");
    };


    return (
        <Box
            sx={{
                position: 'relative'
            }}
        >
            <TextField
                value={value}
                id="add-item-input"
                label="Add task..."
                variant="outlined"
                size="small"
                onChange={handleAddItemInputOnChange}
            />

            <Button
                variant="contained"
                color="primary"
                disabled={value === ""}
                onClick={handleAddItemButtonOnClick}
                sx={{
                    position: 'absolute',
                    right: 0,
                }}
            >
                Add
            </Button>
        </Box >
    );

});

export default TodoForm;
