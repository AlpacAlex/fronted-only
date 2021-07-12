import React from "react";
import { useState } from 'react'
import MenuToDo from "./MenuToDo";
import ToDo from './ToDo'
import ToDoForm from './ToDoForm'

function App() {
  const [todos, setTodos] = useState([])
  //const [complateTask, setComplateTask] = useState([])
  //const complateTask = []

  const addTask = (userInput) => {
    if(userInput) {
      const newItem = {
        id: new Date(),
        task: userInput,
        complete: false,
        isShow: true
      }
      setTodos([...todos, newItem])
    }
  }

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
  }

  const showAllTask = () => {
    const allTask = todos.map( (todo) => todo ? { ...todo, isShow: true } : false)
    setTodos([
      ...allTask
    ]);
  }

  const showComplateTask = () => {
    //complateTask = [...todos]
    const complateTask = todos.map( (todo) => todo.complete === true ? { ...todo, isShow: true} : { ...todo, isShow: false})
    setTodos([
      ...complateTask
      // ...todos.map( (todo) => todo.complete === true ? todo.isShow = true : todo.isShow = false)
    ])
  }
  //console.log(todos)
  const showUncomplateTask = () => {
    const unComplateTask = todos.map( (todo) => todo.complete === false ? { ...todo, isShow: true} : { ...todo, isShow: false})
    setTodos([
      ...unComplateTask
    ])
  }

  const sortByDate = () => {
    const sortTodo = todos.sort( (a,b) => a.id - b.id)
    setTodos([...sortTodo])
  }

  const sortByReversDate = () => {
    const sortTodo = todos.sort( (a,b) => b.id - a.id)
    setTodos([...sortTodo])
  }

  const updateTask = (id, upTask) => {
      const newUpdTask = todos.map( (todo) => todo.id === id ? { ...todo, task: upTask} : { ...todo} )
      setTodos([...newUpdTask])
  }


  return (
    <div className="App">
      <header>
        <h1>ToDo: {todos.length}</h1>
      </header>
      <ToDoForm addTask={addTask} />
      <MenuToDo
        showAllTask={showAllTask}
        showComplateTask={showComplateTask}
        showUncomplateTask={showUncomplateTask}
        sortByDate={sortByDate}
        sortByReversDate={sortByReversDate}
        />
      <dl>
      {todos.map((todo) => 
        
            <ToDo
              key={todo.id}
              todo={todo}           
              toggleTask={handleToggle}
              removeTask={removeTask}
              updateTask={updateTask}
              />
                 
      )}
      </dl>
    </div>
  );
}

export default App;
