import React, { useEffect, useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { Chip, Grid, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodoItem } from "../../stores/store";
import { CSSObject as ICSSObject } from "@emotion/react";
import List from "./List";
import AddTodoItem from "../add-todo-item/AddTodoItem";
import theme from "../../theme/MainTheme";

/*
*   Root component for list of items
*/

interface ICSS {
    [key: string]: ICSSObject;
}


const css: ICSS = {
    chipAndSearchWrap: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`
    },
    chipWrap: { mb: 1.8 },
    chip: { mr: 1 },
    inputWrap: { mb: .8 },
}


const TodoList = observer(() => {

    const todoStore = useTodoStore();
    const [todoList, setTodoList] = useState<ITodoItem[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");


    useEffect(() => {
        const serarchValueTrimed = searchValue.trim();
        if (serarchValueTrimed !== "") {
            setTodoList(todoStore?.todoList?.filter(
                (item: ITodoItem) =>
                    item?.content?.toLocaleLowerCase()
                        .includes(serarchValueTrimed.toLocaleLowerCase())
            ));
        }
        else {
            setTodoList(todoStore?.todoList);
        }
    }, [todoStore?.todoList, searchValue])


    const handleSearchItemInputOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSearchValue(e.target.value);
    };

    const handleSetTodoList = (
        newTodoList: (prevItems: ITodoItem[]) => ITodoItem[]
    ) => {
        setTodoList(newTodoList);
    };


    return (
        <>
            {/* Add item */}
            <AddTodoItem />

            {/* Chip and Search item */}
            <Grid
                container
                justifyContent="space-between"
                alignItems="flex-end"
                sx={css.chipAndSearchWrap}
            >
                {/* Chips */}
                <Grid item sx={css.chipWrap}>
                    <Chip
                        label={`All: ${todoList?.length || 0}`}
                        sx={css.chip}
                    />
                    <Chip
                        label={`Done: ${todoList?.filter(i => i.done)?.length || 0}`}
                        sx={css.chip}
                    />
                </Grid>

                {/* Search */}
                <Grid item sx={css.inputWrap}>
                    <TextField
                        value={searchValue}
                        margin="normal"
                        label="Search..."
                        id="search-item-input"
                        variant="standard"
                        onChange={handleSearchItemInputOnChange}
                    />
                </Grid>
            </Grid>

            {/* List of items */}
            <List
                todoList={todoList}
                handleSetTodoList={handleSetTodoList}
            />
        </>
    );

});

export default TodoList;