import React, { useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";


const EditableItem = observer(({ item }: any) => {

    const todoStore = useTodoStore();
    const [value, setValue] = useState<any>(item.content)

    const handleEditListItem = (item: any) => {
        todoStore.edit({ ...item, content: value });
    };


    return (
        <TextField
            value={value}
            id="outlined-basic"
            variant="outlined"
            size="small"
            sx={{ background: "#ffffff" }}
            onChange={(e) => setValue(e.target.value.trim())}
            onBlur={() => handleEditListItem(item)}
        />
    );
});

export default EditableItem;