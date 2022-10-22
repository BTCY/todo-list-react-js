import React, { useCallback } from "react";
import update from 'immutability-helper';
import Item from "./Item";
import NoItems from "./NoItems";
import { List as MuiList } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodoItem } from "../../stores/store";

/*
*   List of tasks
*/

interface IList {
    todoList: ITodoItem[];
    setTodoList: (callback: (prevItems: ITodoItem[]) => ITodoItem[]) => void;
}


const List = observer(({ todoList, setTodoList }: IList) => {

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        setTodoList((prevItems: ITodoItem[]) =>
            update(prevItems, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevItems[dragIndex] as ITodoItem],
                ],
            }),
        )
    }, [setTodoList])

    const renderItem = useCallback((item: ITodoItem, index: number) => {
        return (
            <Item
                key={item.id}
                index={index}
                id={item.id}
                item={item}
                moveItem={moveItem}
            />
        )
    }, [moveItem])


    return (
        <>
            {todoList?.length > 0 &&
                <MuiList sx={{ width: "100%" }}>
                    {todoList?.map((item: ITodoItem, index: number) => renderItem(item, index))}
                </MuiList>
            }
            {todoList?.length === 0 &&
                <NoItems />
            }
        </>
    );

});

export default List;