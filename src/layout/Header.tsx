import React from "react";
import { Grid } from "@mui/material";

/*
*   Layout: application header 
*/

interface IHeader {
    children?: React.ReactNode;
}


const Header = ({ children }: IHeader) => {

    return (
        <Grid
            container
            sx={{
                p: 2,
            }}
        >
            {children}
        </Grid>
    );

}

export default Header;