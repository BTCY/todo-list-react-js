import React from "react";
import AddTodoItem from "../components/add-todo-item/AddTodoItem";
import { Grid, Typography } from "@mui/material";

export default function Header() {

    return (
        <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                maxWidth: "900px",
                background: "#b2dfdb",
                pt: 10,
                pb: 5,
                borderRadius: 6,
            }}
        >
            <Typography
                component="h1"
                variant="h2"
                color="initial"
                sx={{
                    width: "100%",
                    textAlign: "center",
                    mb: 5
                }}
            >
                TODO List
            </Typography>

            <AddTodoItem />
        </Grid>
    )
} 
