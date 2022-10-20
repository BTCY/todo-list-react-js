import React from "react";
import { useObserver } from "mobx-react"
import { useTodoStore } from "../../providers/TodoProvider";
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";


export default function TodoList() {
    const todoStore = useTodoStore();

    const handleToggle = (value: number) => () => {
        todoStore.complete(value)
    };


    return useObserver(() => {
        return (
            <List sx={{ width: "100%" }}>
                {todoStore.todoList.map((value: any) => {
                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                        <ListItem
                            key={value.id}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={value.done}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ "aria-labelledby": labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.content} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        )
    }

    )
}
