import React from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditableItem from "./EditableItem";
import ru from 'date-fns/locale/ru';
import * as dateFns from 'date-fns';


const ItemList = observer(({ todoList }: any) => {
    const todoStore = useTodoStore();

    const handleCheckedToggleListItem = (value: any) => {
        value.done ? todoStore.incomplete(value) : todoStore.complete(value);
    };

    const handleDeleteListItem = (value: any) => {
        todoStore.delete(value);
    };

    return (
        <List sx={{ width: "100%" }}>
            {todoList?.map((item: any) => {
                const labelId = `checkbox-list-label-${item.id}`;
                return (
                    <ListItem
                        key={item.id}
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
                );
            })}
        </List>
    )
});

export default ItemList;