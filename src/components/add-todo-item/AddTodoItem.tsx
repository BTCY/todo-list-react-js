import React, { useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
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
        <FormControl
            fullWidth
            variant="outlined"
            size="small"
        >
            <InputLabel htmlFor="add-item-input">Add task...</InputLabel>
            <OutlinedInput
                id="add-item-input"
                value={value}
                sx={{
                    paddingRight: '70px'
                }}
                onChange={handleAddItemInputOnChange}
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            disableElevation
                            variant="contained"
                            color="primary"
                            disabled={value === ""}
                            onClick={handleAddItemButtonOnClick}
                            sx={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                zIndex: 2,
                                height: '40px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                borderRadius: '0px 4px 4px 0px'
                            }}
                        >
                            Add
                        </Button>
                    </InputAdornment>
                }
                label="Add task..."
            />
        </FormControl>
    );

});

export default TodoForm;
