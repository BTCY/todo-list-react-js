import React, { useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodoItem } from "../../stores/store";

/*
*   Editable task text
*/

interface IEditableItemText {
    item: ITodoItem;
}

const EditableItemText = observer(({ item }: IEditableItemText) => {

    const todoStore = useTodoStore();
    const [value, setValue] = useState<string>(item.content)


    const handleEditItemInputOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(e.target.value.trim());
    };

    const handleEditItemInputOnBlur = (item: ITodoItem) => {
        todoStore.edit({ ...item, content: value });
    };


    return (
        <TextField
            value={value}
            id="edit-task-input"
            variant="outlined"
            size="small"
            onChange={handleEditItemInputOnChange}
            onBlur={() => handleEditItemInputOnBlur(item)}
        />
    );

});

export default EditableItemText;