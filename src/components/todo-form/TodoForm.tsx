import React, { useState } from "react";
import { useObserver } from "mobx-react"
import { useTodoStore } from "../../providers/TodoProvider";
import { Button, TextField } from "@mui/material";


export default function TodoForm() {

    const todoStore = useTodoStore()
    const [value, setValue] = useState("")


    return useObserver(() => {
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
    })
}
