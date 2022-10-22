import React from "react";
import { Typography } from "@mui/material";
import { CSSObject as ICSSObject } from "@emotion/react";
import theme from "../../theme/MainTheme";

/*
*   Logotype
*/

interface ICSS {
    [key: string]: ICSSObject;
}


const css: ICSS = {
    text: {
        color: theme.palette.primary.main,
        width: "100%",
    },
}


const Logo = () => {

    return (
        <Typography
            component="h1"
            variant="h4"
            sx={css.text}
        >
            TODO List
        </Typography>
    );

}

export default Logo;
