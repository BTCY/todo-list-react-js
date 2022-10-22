import React from "react";
import { Link, Typography } from "@mui/material";
import theme from "../../theme/MainTheme";

/*
*   Copyright
*/

const Copyright = () => {

    return (
        <Typography
            component="p"
            variant="body1"
            color={theme.palette.grey[400]}
            sx={{
                width: "100%",
            }}
        >
            Demo project. Developed by
            <Link
                href="https://github.com/BTCY"
                target={"_blank"}
                color={theme.palette.grey[400]}
                sx={{ ml: .7 }}
            >
                https://github.com/BTCY
            </Link>
        </Typography>
    );

}

export default Copyright;
