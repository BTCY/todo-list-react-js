import React from "react";
import { useRef } from 'react'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'
import { Checkbox, ListItem, ListItemIcon, IconButton, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodoItem } from "../../stores/store";
import { useTodoStore } from "../../providers/TodoProvider";
import { CSSObject as ICSSObject } from '@emotion/react';
import type { Identifier, XYCoord } from 'dnd-core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditableItemText from "./EditableItemText";
import ru from 'date-fns/locale/ru';
import * as dateFns from 'date-fns';
import theme from "../../theme/MainTheme";

/*
*   Item on the to-do list
*/

interface IItem {
    id: number;
    index: number;
    item: ITodoItem;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
    updateStore: () => void;
}

interface DragItem {
    id: string;
    index: number;
    type: string;
}

interface ICSS {
    [key: string]: ICSSObject;
}


const ItemTypes = {
    ITEM: 'item',
}


const TASK_CREATION_TIME_FORMAT = 'HH:mm';
const TASK_CREATION_DATE_FORMAT = 'dd MMM yy';


const css: ICSS = {
    listItem: {
        cursor: "grab",
        mb: 1,
        pb: 1,
        pr: '124px',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        position: "relative",
    },
    itemRightSideWrap: {
        position: 'absolute',
        right: 0,
    },
    time: { fontSize: "1.05em" },
    date: { fontSize: "0.55em" },
}

const getDateTimeWrapCss = (item: ITodoItem): ICSSObject => {
    return ({
        textTransform: "uppercase",
        marginTop: "-3px",
        marginRight: "5px",
        ...(item.done && { "color": theme.palette.grey[400] })
    })
}


const Item = observer(({
    id,
    item,
    index,
    moveItem,
    updateStore
}: IItem) => {

    const todoStore = useTodoStore();
    const labelId = `checkbox-list-label-${item.id}`;
    const ref = useRef<HTMLDivElement>(null);

    // For drag and drop
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.ITEM,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) return;

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;


            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },

    })

    // For drag and drop
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ITEM,
        item: () => {
            return { id, index }
        },
        collect: (monitor: DragSourceMonitor<{ id: number; index: number; }, unknown>) => ({
            isDragging: monitor.isDragging(),
        }),

        end: () => {
            updateStore();
        },
    })

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));


    const handleCheckedItemToggleOnClick = (value: ITodoItem) => {
        value.done ? todoStore.incomplete(value) : todoStore.complete(value);
    };

    const handleDeleteItemButtonOnClick = (value: ITodoItem) => {
        todoStore.delete(value);
    };


    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
            <ListItem
                disablePadding
                id={labelId}
                sx={css.listItem}
            >

                {/* Checkbox - item done / not done */}
                <ListItemIcon>
                    <Checkbox
                        onClick={() => handleCheckedItemToggleOnClick(item)}
                        checked={item.done}
                        inputProps={{ "aria-labelledby": labelId }}
                    />
                </ListItemIcon>

                {/* Editable item text */}
                <EditableItemText item={item} />

                <Grid sx={css.itemRightSideWrap} >
                    <Grid
                        container
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        {/* Task creation date and time */}
                        <Grid sx={getDateTimeWrapCss(item)}>

                            {/* Time */}
                            <Typography sx={css.time}>
                                {dateFns.format(+item?.date, TASK_CREATION_TIME_FORMAT, { locale: ru })}
                            </Typography>

                            {/* Date */}
                            <Typography sx={css.date}>
                                {(dateFns.format(+item?.date, TASK_CREATION_DATE_FORMAT, { locale: ru }))?.replace('.', '')}
                            </Typography>

                        </Grid>

                        {/* Delete item icon */}
                        <ListItemIcon>
                            <IconButton
                                aria-label={`aria-delete-${item.id}`}
                                onClick={() => handleDeleteItemButtonOnClick(item)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </ListItemIcon>
                    </Grid>

                </Grid>

            </ListItem>
        </div>
    );

});

export default Item;