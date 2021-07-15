import React from "react";
import { useState, useMemo, useCallback } from 'react';
import MenuToDo from "./MenuToDo";
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import Pagination from './Pagination';
// material ui //
import { Button } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Paper, Grid, Typography, Box } from "@material-ui/core";
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";


// const theme = createTheme({
//   palette: {
//     background: {
//       default: '#222930'
//     },
//     text: {
//       primary: 'rgba(255, 255, 255, 0.87)',
//       secondary: 'rgba(0, 0, 0, 0.54)',
//       disabled: 'rgba(0, 0, 0, 0.38)',
//       hint: 'rgba(255, 255, 255, 0.38)'
//     }
//   },
//   overrides: {
//     MuiInputLabel: {
//       root: {
//         color: "white"
//       }
//     }
//   }
// });
//border: '#4EB1BA',
//text: '#E9E9E9',




const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500,
    "background-color": "transparent"
  },
  Header: {
    padding: 10,
    margin: "auto",
    textAlign: "center",
    "font-size": 40,
    "background-color": "transparent",
    color: "black"
  },
};


function App() {
  const [todos, setTodos] = useState([])
  const [currentTodo, setCurrentTodo] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(0) // 1 - complited 0 - uncompl
  
  let totalRecords = currentTodo.length // todos
  const LIMIT = 5;

  // material ui
  

  const addTask = (userInput) => {
    if(userInput) {
      const newItem = {
        id: Date.now(),
        task: userInput,
        complete: false,
        //isShow: true
      }
      setTodos([...todos, newItem])
      if(flag) {
        setCurrentTodo([...currentTodo])  
      } else {
        setCurrentTodo([...currentTodo, newItem])  
      }
      
      
    }
  }

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
    setCurrentTodo([...todos.filter((todo) => todo.id !== id)])
    if (!((totalRecords - 1) % LIMIT)) {
      onPageChanged(1, currentPage - 1)
    }
  }

  const handleToggle = (id) => {
    const findId = todos.findIndex( (todo) => todo.id === id)
    const copyTodo = [...todos]
    copyTodo[findId].complete = !copyTodo[findId].complete
    setCurrentTodo([...copyTodo])
    setTodos([...copyTodo])
  }

  const showAllTask = () => {
    //const allTask = todos.map( (todo) => todo ? { ...todo, isShow: true } : false)
    setCurrentTodo([...todos])
    setTodos([...todos]);
    setFlag(0)
  }

  const showComplateTask = () => {
    //const complateTask = todos.filter( (todo) => todo.complete === true)
    setCurrentTodo([...todos.filter( (todo) => todo.complete === true)])
    onPageChanged(1, 1)
    setFlag(1)
  }
  //console.log(todos)
  const showUncomplateTask = () => {
    //const unComplateTask = [...todos]
    setCurrentTodo([...todos.filter( (todo) => todo.complete === false)])
    onPageChanged(1, 1)
    setFlag(0)
  }

  const sortByDate = () => {
    const sortTodo = [...todos]
    sortTodo.sort( (a,b) => a.id - b.id)
    setCurrentTodo([...sortTodo])
  }

  const sortByReversDate = () => {
    const sortTodo = [...todos]
    sortTodo.sort( (a,b) => b.id - a.id)
    setCurrentTodo([...sortTodo])
  }

  const updateTask = (id, upTask) => {
    const findId = todos.findIndex( (todo) => todo.id === id)
    const copyTodo = [...todos]
    copyTodo[findId].task = upTask

    //const newUpdTask = todos.map( (todo) => todo.id === id ? { ...todo, task: upTask} : { ...todo} )
    setTodos([...copyTodo])
    setCurrentTodo([...copyTodo])
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
    const currentData = [...currentTodo] // may be .slice()
    .slice(
      (currentPage - 1) * LIMIT,
      (currentPage - 1) * LIMIT + LIMIT
    );
    return currentData;
  }, [currentTodo, currentPage])
 

  return (
    <Box className="App"> 
      <Grid container spacing={0}>
        <Paper style={styles.Header} elevation={0}>ToDo: {todos.length}</Paper>
        <Grid item xs={12}>
          <Paper style={styles.Paper}>
            <ToDoForm addTask={addTask}/>
          </Paper>
          <MenuToDo
            showAllTask={showAllTask}
            showComplateTask={showComplateTask}
            showUncomplateTask={showUncomplateTask}
            sortByDate={sortByDate}
            sortByReversDate={sortByReversDate}
          />
          {currentData.map((todo) =>        
            <ToDo
              key={todo.id}
              todo={todo}           
              toggleTask={handleToggle}
              removeTask={removeTask}
              updateTask={updateTask}
              />   
            )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
