import React, { useState } from "react";
import { Paper, Grid, Typography, Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Build } from "@material-ui/icons";


const styles = {
    Icon: {
      marginLeft: "auto"
    },
    Paper: {
      margin: "auto",
      padding: 10,
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      width: 500
    }
  };


function ToDo({ todo, toggleTask, removeTask, updateTask }) {
    //console.log(todo)
    //console.log(todo.isShow)
    const [changeValue, setChangeValue] = useState(todo.task)
    const validInputText = /^[\w\s]{1,18}$/gm;

    const handleChangeValue = (e) => {
        //console.log(e.target);
        const newTextInput = e.currentTarget.value;
        //let newText = newTextInput + newText
        //console.log(todo.id);
        
        
        setChangeValue(newTextInput)
        
        if (e.keyCode === 13) //27 - esc 13 - enter
        {
            const isValid = validInputText.test(newTextInput);
            if (isValid) {
                updateTask(todo.id, newTextInput)
            } else {
                setChangeValue(todo.task)
            }
            document.activeElement.blur()
        } else if (e.keyCode === 27) {
            setChangeValue(todo.task)
            document.activeElement.blur()
        }
    }

    
    return (
        <Grid item xs={12}>
            <Paper elevation={2} style={styles.Paper}>
                <span style={styles.Todo}>{todo.task}</span>
                <IconButton
                    color="primary"
                    aria-label="Edit"
                    style={styles.Icon}
                    onClick={()=>{}}
                >
                    <Build fontSize="small" />
                </IconButton>
                <IconButton
                    color="secondary"
                    aria-label="Delete"
                    onClick={() => removeTask(todo.id)}
                >
                    <Delete fontSize="small" />
                </IconButton>
            </Paper>
        </Grid> 
    );
    
}


export default ToDo;