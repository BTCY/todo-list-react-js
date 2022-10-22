import React from "react";
import { Grid } from "@mui/material";
import { CSSObject as ICSSObject } from '@emotion/react';

/*
*   Layout: application header 
*/

interface IHeader {
    children?: React.ReactNode;
}

interface ICSS {
    [key: string]: ICSSObject;
}


const css: ICSS = {
    wrapGrid: { p: 2, }
}


const Header = ({ children }: IHeader) => {

    return (
        <Grid
            container
            sx={css.wrapGrid}
        >
            {children}
        </Grid>
    );

}

export default Header;