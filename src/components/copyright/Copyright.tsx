import React from "react";
import { Link, Typography } from "@mui/material";
import { CSSObject as ICSSObject } from '@emotion/react';
import theme from "../../theme/MainTheme";

/*
*   Copyright
*/

interface ICSS {
    [key: string]: ICSSObject;
}


const css: ICSS = {
    text: {
        color: theme.palette.grey[400],
        width: "100%",
    },
    link: {
        ml: .7,
        color: theme.palette.grey[400],
        textDecoration: 'none',
    }
}


const Copyright = () => {

    return (
        <Typography
            component="p"
            variant="body1"
            sx={css.text}
        >
            Demo project. Developed by
            <Link
                href="https://github.com/BTCY"
                target={"_blank"}
                sx={css.link}
            >
                https://github.com/BTCY
            </Link>
        </Typography>
    );

}

export default Copyright;
