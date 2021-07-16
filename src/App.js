import React from "react";
import { useState, useMemo, useCallback } from 'react';
import MenuToDo from "./MenuToDo";
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import { Paper, Grid, Box } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';

import styles from "./myStyle";
import useStyles from "./styleTheme";

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
//   overrides: { // так можно переписать все стили mui
//     MuiInputLabel: {
//       root: {
//         color: "white"
//       }
//     }
//   }
// });




function App() {
  const [todos, setTodos] = useState([])
  const [currentTodo, setCurrentTodo] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(0) // 1 - complited 0 - uncompl
  
  let totalRecords = currentTodo.length // todos
  const LIMIT = 5;
  const classes = useStyles();

  const done = ({it, userInput = "", id = 0, upTask = ""}) => {//it, userInput = "", id = 0

    let done = [...todos];
    let curdone = [...currentTodo];

    switch(it) {
      case "addTask":
        if(userInput) {
          const newItem = {
            id: Date.now(),
            task: userInput,
            complete: false,
            //isShow: true
          }
          //setTodos([...todos, newItem])
          done = [...todos];
          done.push(newItem);
          if(flag) {
            //setCurrentTodo([...currentTodo]);
            curdone = [...currentTodo];
          } else {
            //setCurrentTodo([...currentTodo, newItem]);
            curdone = [...currentTodo];
            curdone.push(newItem);
          }
        }
        break;
      case "removeTask":
        if(id) {
          //setTodos([...todos.filter((todo) => todo.id !== id)])
          //setCurrentTodo([...todos.filter((todo) => todo.id !== id)])
          done = [...todos.filter((todo) => todo.id !== id)];
          curdone = [...todos.filter((todo) => todo.id !== id)];
          if (!((totalRecords - 1) % LIMIT)) {
            onPageChanged(1, currentPage - 1)
          }
        }
        break;
      case "changeChecbox":
        if (id) {
          const findId = todos.findIndex( (todo) => todo.id === id);
          const copyTodo = [...todos];
          copyTodo[findId].complete = !copyTodo[findId].complete;
          done = [...copyTodo];
          curdone = [...copyTodo];
        }
        break;
      case "showAllTask":
        done = [...todos];
        curdone = [...todos];
        setFlag(0)
        break;
      case "showComplateTask":
        curdone = [...todos.filter( (todo) => todo.complete === true)]
        onPageChanged(1, 1);
        setFlag(1);
        break;
      case "showUncomplateTask":
        curdone = [...todos.filter( (todo) => todo.complete === false)];
        onPageChanged(1, 1);
        setFlag(0);
        break;
      case "sortByDate":
        const sortTodo = [...todos];
        sortTodo.sort( (a,b) => a.id - b.id);
        curdone = [...sortTodo];
        break;
      case "sortByReversDate":
        const sortRevTodo = [...todos];
        sortRevTodo.sort( (a,b) => b.id - a.id);
        curdone = [...sortRevTodo];
        break;
      case "updateTask":
        if (id && upTask) {
          const findId = todos.findIndex( (todo) => todo.id === id);
          const copyTodo = [...todos];
          copyTodo[findId].task = upTask;
          done = [...copyTodo];
          curdone = [...copyTodo];
        }
        break;
      default:
        console.log("error done task");
    }
    setTodos(done);
    setCurrentTodo(curdone);
    
  }
  //done({it: "addTask",userInput: "fff", id: 2})
  

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

  const pages = Math.ceil(totalRecords / LIMIT) || 0;
 

  return (
    <Box className="App"> 
      <Grid container spacing={0}>
        <Paper style={styles.App.Header} elevation={0}>ToDo: {todos.length}</Paper>
        <Grid item xs={12}>
          <Paper style={styles.App.Paper}>
            <ToDoForm done={done}/>
          </Paper>
          <MenuToDo
            done = {done}
          />
          {currentData.map((todo) =>        
            <ToDo
              key={todo.id}
              todo={todo}           
              done={done}
              />   
            )}
          <Box className={classes.root}>        
            {pages > 1 && <Pagination 
              count={pages}
              onChange={onPageChanged}
              defaultPage={1} 
              color="primary"
              classes={{ ul: classes.paginator }} 
            />}     
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
