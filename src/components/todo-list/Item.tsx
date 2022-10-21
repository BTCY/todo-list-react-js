import React from "react";
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Checkbox, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ItemTypes } from './ItemTypes.types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditableItem from "./EditableItem";
import ru from 'date-fns/locale/ru';
import * as dateFns from 'date-fns';
import type { Identifier, XYCoord } from 'dnd-core';


export interface CardProps {
    id: any
    text: string
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}


const Item = observer(({
    id,
    item,
    handleCheckedToggleListItem,
    handleDeleteListItem,
    index,
    moveItem
}: any) => {
    const labelId = `checkbox-list-label-${item.id}`;

    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.ITEM,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top


            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveItem(dragIndex, hoverIndex)

            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ITEM,
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
            <ListItem
                disablePadding
                id={labelId}
            >

                <ListItemIcon>
                    <Checkbox
                        onClick={() => handleCheckedToggleListItem(item)}
                        checked={item.done}
                        inputProps={{ "aria-labelledby": labelId }}
                    />
                </ListItemIcon>

                <EditableItem item={item} />

                <ListItemText
                    id={labelId}
                    primary={dateFns.format(+item?.date, 'HH:mm dd MMM yy', { locale: ru })}
                    sx={{
                        ...(item.done && { color: "gray" })
                    }}
                />

                <ListItemIcon>
                    <IconButton
                        aria-label={`aria-delete-${item.id}`}
                        onClick={() => handleDeleteListItem(item)}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </ListItemIcon>

            </ListItem>
        </div>
    )
});

export default Item;