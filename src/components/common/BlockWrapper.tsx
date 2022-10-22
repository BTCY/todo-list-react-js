import React from "react";
import { Grid, Typography } from "@mui/material";
import theme from "../../theme/MainTheme";

/*
*   Wrapping block around one group of data
*/

interface IBlockWrapper {
    title?: string;
    children?: React.ReactNode;
}

const BlockWrapper = ({ title, children }: IBlockWrapper) => {

    return (
        <Grid container sx={{ pt: 2, pb: 2 }}>
            {!!title &&
                <Grid container>
                    <Typography component="h4" sx={{ pl: 2, pr: 2, pb: 1 }}>
                        {title}
                    </Typography>

                    <Grid container sx={{ height: '1px', background: theme.palette.grey[100] }} />
                </Grid>
            }

            <Grid container sx={{ pl: 2, pr: 2, pt: 2 }}>
                {children}
            </Grid>
        </Grid >
    );

}

export default BlockWrapper;
