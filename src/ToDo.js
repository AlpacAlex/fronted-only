import React, { useState } from "react";
import { Paper, Grid, Box, Checkbox, Input } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import styles from "./myStyle";



function ToDo({ todo, done }) {
    const [changeValue, setChangeValue] = useState(todo.task);
    const validInputText = /^[\w\s]{1,18}$/gm;

    const handleChangeValue = (e) => {
        const newTextInput = e.currentTarget.value;
        setChangeValue(newTextInput);
        if (e.keyCode === 13)
        {
            const isValid = validInputText.test(newTextInput);
            if (isValid) {
                done({ it: "updateTask", id: todo.id, upTask: newTextInput });
            } else {
                setChangeValue(todo.task);
            }
            document.activeElement.blur();
        } else if (e.keyCode === 27) {
            setChangeValue(todo.task);
            document.activeElement.blur();
        }
    };

    
    return (
        <Grid item xs={12}>
            <Paper elevation={2} style={styles.ToDo.Paper}>
                <Checkbox 
                    checked={todo.complete ? true : false}
                    onChange={()=>{}} 
                    onClick={() => done({ it: "changeChecbox", id: todo.id })}
                    color="secondary"
                />
                <Input 
                    value={changeValue} 
                    disableUnderline={true}
                    onChange={handleChangeValue} 
                    onKeyDown={handleChangeValue}
                    style={{ width: "64%" }}
                />
                <Box component="span" style={styles.ToDo.Date} textAlign="right" m={1}>{new Date(todo.id).toLocaleDateString()}</Box>
                <IconButton
                    style={styles.ToDo.Icon}               
                    color="secondary"
                    aria-label="Delete"
                    onClick={() => done({ it: "removeTask", id: todo.id })}
                >
                    <Delete fontSize="small" />
                </IconButton>
            </Paper>
        </Grid> 
    );
    
}


export default ToDo;