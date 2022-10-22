import React from "react";
import { Grid } from '@mui/material';

/*
*   Layout: main layer
*/

interface ILayout {
    children?: React.ReactNode;
}


const Layout = ({ children }: ILayout) => {

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            sx={{
                height: '100vh',
                p: 2
            }}
        >
            <Grid container sx={{ maxWidth: "900px" }}>
                {children}
            </Grid>
        </Grid>
    );

}

export default Layout;
