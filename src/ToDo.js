import React, { useState } from "react";


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
        <dt>
            <label>
                <input onChange={()=>{}} onClick={() => toggleTask(todo.id)} type="checkbox" checked={todo.complete ? "checked" : false} />
                <input className="ToDoTask" value={changeValue} type="text" onChange={handleChangeValue} onKeyDown={handleChangeValue}/> 
                <img 
                onClick={() => removeTask(todo.id)}
                src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png" 
                />
                <span>{new Date(todo.id).toLocaleDateString()}</span>
            </label> 
        </dt>  
    );
    
}


export default ToDo;