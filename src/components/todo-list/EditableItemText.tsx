import React, { useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodoItem } from "../../stores/store";
import theme from "../../theme/MainTheme";

/*
*   Editable item text
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
            fullWidth
            value={value}
            id="edit-task-input"
            variant="outlined"
            size="small"
            onChange={handleEditItemInputOnChange}
            onBlur={() => handleEditItemInputOnBlur(item)}
            sx={{
                "& .MuiOutlinedInput-root": {
                    ...(item.done && { color: theme.palette.grey[400], textDecoration: 'line-through' }),
                    "& > fieldset": { borderColor: "rgba(0, 0, 0, 0)" },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                        borderColor: "none"
                    }
                }
            }}
        />
    );

});

export default EditableItemText;