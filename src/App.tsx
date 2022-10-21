import React from "react";
import { Grid } from "@mui/material";
import Header from "./layout/Header";
import Body from "./layout/Body";

export default function App() {

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                background: "#fafafa",
                pt: 2,
                pb: 2
            }}
        >
            <Grid
                container
                sx={{ maxWidth: "900px" }}
            >

                <Header />
                <Body />

            </Grid>
        </Grid>
    )
} 
