import React from "react";
import { Grid, Paper } from "@mui/material";

/*
*   Layout: application body
*/

interface IBody {
    children?: React.ReactNode;
}


const Body = ({ children }: IBody) => {

    return (
        <Grid
            container
            sx={{
                mt: 2,
                mb: 2,
            }}
        >
            <Paper
                sx={{
                    width: '100%',
                    minHeight: '80vh',
                }}
            >
                {children}
            </Paper>
        </Grid>
    );

}

export default Body;
