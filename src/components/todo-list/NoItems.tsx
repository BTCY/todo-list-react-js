import React from "react";
import { Grid, Typography } from "@mui/material";
import { CSSObject as ICSSObject } from "@emotion/react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import theme from "../../theme/MainTheme";

/*
*   No items in TODO list
*/

interface ICSS {
    [key: string]: ICSSObject;
}


const css: ICSS = {
    wrapGrid: {
        mt: "10%",
        color: theme.palette.grey[400]
    },
}


const NoItems = () => {

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={css.wrapGrid}
        >
            <InsertEmoticonIcon
                fontSize={"large"}
            />
            <Typography
                component="p"
                variant="h6"
            >
                No tasks
            </Typography>
        </Grid>
    );

}

export default NoItems;