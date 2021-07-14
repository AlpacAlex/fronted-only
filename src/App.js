import React from "react";
import { useState, useMemo, useCallback } from 'react';
import MenuToDo from "./MenuToDo";
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import Pagination from './Pagination';

function App() {
  const [todos, setTodos] = useState([])
  //const [currentTodo, setCurrentTodo] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  
  let totalRecords = todos.filter( (todo) => todo.isShow === true).length
  const LIMIT = 5;

  const addTask = (userInput) => {
    if(userInput) {
      const newItem = {
        id: Date.now(),
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
    //const findTodoOfId = todos.find( (todo) => todo.id === id)
    setTodos([// TODO find
      ...todos.map( (todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }
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
    onPageChanged(1, 1)

  }
  //console.log(todos)
  const showUncomplateTask = () => {
    const unComplateTask = todos.map( (todo) => todo.complete === false ? { ...todo, isShow: true} : { ...todo, isShow: false})
    setTodos([
      ...unComplateTask
    ])
    onPageChanged(1, 1)
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

  // pagination function
  

  const onPageChanged = useCallback(
    (event, page, maxPage=-1) => {
      
      //event.preventDefault();
      if (page < 1) page++;
      if (maxPage !== -1 && page > maxPage) page--;
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const currentData = useMemo( () => {
    const currentData = [...todos] // may be .slice()
    .slice(
      (currentPage - 1) * LIMIT,
      (currentPage - 1) * LIMIT + LIMIT
    );
    return currentData;
  }, [todos, currentPage])
    
 

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
      {currentData.map((todo) =>        
        <ToDo
          key={todo.id}
          todo={todo}           
          toggleTask={handleToggle}
          removeTask={removeTask}
          updateTask={updateTask}
          />
             
      )}
      </dl>
      <div className="pagination">
        {totalRecords > 5 && <Pagination 
          totalRecords={totalRecords}
          pageLimit={LIMIT}
          pageNeighbours={2}
          onPageChanged={onPageChanged}
          currentPage={currentPage}
        />}
      </div>
      

    </div>
  );
}

export default App;
