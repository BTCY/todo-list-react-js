import React, { useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";


const TodoForm = observer(() => {

    const todoStore = useTodoStore()
    const [value, setValue] = useState("")

    return (
        <>
            <TextField
                value={value}
                id="outlined-basic"
                label="Добавить задание..."
                variant="outlined"
                size="small"
                sx={{ background: "#ffffff" }}
                onChange={(e) => setValue(e.target.value.trim())}
            />
            <Button
                variant={"contained"}
                color={"primary"}
                disabled={value === ""}
                onClick={() => {
                    if (value !== "") {
                        todoStore.addTodo(value)
                    }
                    setValue("")
                }}
            >
                Добавит
            </Button>
        </>
    )
});

export default TodoForm;
