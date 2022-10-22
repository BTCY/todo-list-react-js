import React from "react";
import { Grid } from "@mui/material";

/*
*   Layout: application footer 
*/

interface IFooter {
    children?: React.ReactNode;
}


const Footer = ({ children }: IFooter) => {

    return (
        <Grid
            container
            sx={{
                pt: 1,
                pr: 2,
                pb: 3,
                pl: 2,
            }}
        >
            {children}
        </Grid>
    );

}

export default Footer;