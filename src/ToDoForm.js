import { useState } from 'react'

function ToDoForm({ addTask }) {
    const [userInput, setUserInput] = useState('')
    const validInputText = /^[\w\s]{0,18}$/gm;///^\w{0,15}$/gm;

    const handleChange = (e) => {
        const newTextInput = e.currentTarget.value;
        const isValid = validInputText.test(newTextInput);
        if (isValid) {
            setUserInput(e.currentTarget.value)
        }     
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(userInput)
        setUserInput("")
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <input
                className="nameTask" 
                value={userInput}
                type="text"
                onChange={handleChange}
                placeholder="Введите значение..."
            />        
            <button>Сохранить</button>
        </form>
    )
}

export default ToDoForm;