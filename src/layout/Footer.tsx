import React from "react";
import { Grid } from "@mui/material";
import { CSSObject as ICSSObject } from "@emotion/react";

/*
*   Layout: application footer 
*/

interface IFooter {
    children?: React.ReactNode;
}

interface ICSS {
    [key: string]: ICSSObject;
}


const css: ICSS = {
    wrapGrid: { pt: 1, pr: 2, pb: 3, pl: 2 }
}


const Footer = ({ children }: IFooter) => {

    return (
        <Grid
            container
            sx={css.wrapGrid}
        >
            {children}
        </Grid>
    );

}

export default Footer;