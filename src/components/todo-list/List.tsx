import React, { useCallback } from "react";
import update from 'immutability-helper';
import { useTodoStore } from "../../providers/TodoProvider";
import { List as MuiList } from "@mui/material";
import { observer } from "mobx-react-lite";
import Item from "./Item";


const List = observer(({ todoList, setTodoList }: any) => {
    const todoStore = useTodoStore();

    const handleCheckedToggleListItem = (value: any) => {
        value.done ? todoStore.incomplete(value) : todoStore.complete(value);
    };

    const handleDeleteListItem = (value: any) => {
        todoStore.delete(value);
    };

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        setTodoList((prevItems: any) =>
            update(prevItems, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevItems[dragIndex] as any],
                ],
            }),
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const renderItem = useCallback(
        (item: any, index: number) =>
            <Item
                key={item.id}
                index={index}
                id={item.id}
                item={item}
                handleCheckedToggleListItem={handleCheckedToggleListItem}
                handleDeleteListItem={handleDeleteListItem}
                moveItem={moveItem}
            />
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [],
    )


    return (
        <MuiList sx={{ width: "100%" }}>
            {todoList?.map((item: any, index: number) => renderItem(item, index))}
        </MuiList>
    )
});

export default List;