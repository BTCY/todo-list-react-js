import React from "react";
import { useRef } from 'react'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'
import { Checkbox, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodoItem } from "../../stores/store";
import { useTodoStore } from "../../providers/TodoProvider";
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
}

interface DragItem {
    id: string;
    index: number;
    type: string;
}

const ItemTypes = {
    ITEM: 'item',
}

const TASK_CREATION_DATE_FORMAT = 'HH:mm dd MMM yy';


const Item = observer(({
    id,
    item,
    index,
    moveItem
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
            >

                {/* Checkbox - task done / not done */}
                <ListItemIcon>
                    <Checkbox
                        onClick={() => handleCheckedItemToggleOnClick(item)}
                        checked={item.done}
                        inputProps={{ "aria-labelledby": labelId }}
                    />
                </ListItemIcon>

                {/* Editable task text */}
                <EditableItemText item={item} />

                {/* Task creation date */}
                <ListItemText
                    id={labelId}
                    primary={dateFns.format(+item?.date, TASK_CREATION_DATE_FORMAT, { locale: ru })}
                    sx={{
                        ...(item.done && { color: theme.palette.grey[400] })
                    }}
                />

                {/* Delete task icon */}
                <ListItemIcon>
                    <IconButton
                        aria-label={`aria-delete-${item.id}`}
                        onClick={() => handleDeleteItemButtonOnClick(item)}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </ListItemIcon>

            </ListItem>
        </div>
    );

});

export default Item;