import React from "react";
import { Typography } from "@mui/material";
import theme from "../../theme/MainTheme";

/*
*   Logotype
*/

const Logo = () => {

    return (
        <Typography
            component="h1"
            variant="h4"
            color={theme.palette.primary.main}
            sx={{
                width: "100%",
            }}
        >
            TODO List
        </Typography>
    );

}

export default Logo;
