import React from "react";
import { Grid } from "@mui/material";
import TodoList from "../components/todo-list/TodoList";

export default function Body() {

    return (
        <Grid item container >
            <TodoList />
        </Grid>
    )
} 
