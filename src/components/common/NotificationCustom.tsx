import React from "react";
import { Grid, Typography } from "@mui/material";
import { CSSObject as ICSSObject } from "@emotion/react";

/*
*   Custom own notification style
*/

interface INotificationCustom {
    icon?: React.ReactNode;
    text?: string;
}

interface ICSS {
    [key: string]: ICSSObject;
}


const css: ICSS = {
    text: { ml: 1 },
}


const NotificationCustom = ({ icon, text }: INotificationCustom) => {

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            <>
                {!!icon && icon}
                {!!text && <Typography sx={css.text}>{text}</Typography>}
            </>
        </Grid>
    );

}

export default NotificationCustom;
