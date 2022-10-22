import React from "react";
import { Grid, Typography } from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import theme from "../../theme/MainTheme";

/*
*   No tasks in TODO list
*/

const NoItems = () => {

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{
                mt: "10%",
                color: theme.palette.grey[400]
            }}
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