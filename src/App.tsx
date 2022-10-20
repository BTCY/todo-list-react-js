import React from "react";
import TodoList from "./components/todo-list/TodoList";
import { Grid, Typography } from "@mui/material";
import TodoForm from "./components/todo-form/TodoForm";

export default function App() {

    return (
        <Grid
            container
            sx={{
                background: "#fafafa",
                pt: 2,
                pb: 2
            }}
            justifyContent="center"
            alignItems="center"
        >

            <Grid
                item
                container
                sx={{
                    maxWidth: "900px",
                    background: "#b2dfdb",
                    pt: 10,
                    pb: 5,
                    borderRadius: 6,
                }}
                justifyContent="center"
                alignItems="center"
            >
                <Typography
                    component="h1"
                    variant="h1"
                    color="initial"
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        mb: 5
                    }}

                >
                    TODO List
                </Typography>

                <TodoForm />
            </Grid>

            <Grid
                item
                container
                sx={{ maxWidth: "900px" }}
            >
                <TodoList />
            </Grid>

        </Grid>
    )
} 
