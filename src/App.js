import React, { useEffect } from "react";
import { useState, useMemo, useCallback } from 'react';
import MenuToDo from "./MenuToDo";
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import { Paper, Grid, Box } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import styles from "./myStyle";
import useStyles from "./styleTheme";
const axios = require('axios');


function App() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(0); 
  
  let totalRecords = currentTodo.length;
  const LIMIT = 5;
  const classes = useStyles();
  const URL = "https://todo-api-learning.herokuapp.com";

  const executeRequest  = async ({method, userId = "1", uuid = ""}, {task = "", done = false }) => {
    switch(method) {
      case "get":
        const GET_REQUEST = `/v1/tasks/${userId}`;
        const urlAdres = URL + GET_REQUEST;
        try {
          const response = await axios.get(urlAdres)
          console.log(response)
        } catch (error) {
          console.error(error)
        }
        break;
      case "post":
        if (task) {
          const GET_REQUEST = `/v1/task/${userId}`;
          const urlAdres = URL + GET_REQUEST;
          try {
            const response = await axios.post(urlAdres, {
              name: task,
              done: done
            });
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        }
        break;
      case "patch":
        if (uuid) {
          const GET_REQUEST = `/v1/task/${userId}/${uuid}`;
          const urlAdres = URL + GET_REQUEST;
          try {
            const response = await axios.patch(urlAdres, {//проверку на статус и возвращение? данных(data)
              name: task,
              done: done
            });
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case "delete":
        if (uuid) {
          const GET_REQUEST = `/v1/task/${userId}/${uuid}`;
          const urlAdres = URL + GET_REQUEST;
          try {
            const response = await axios.delete(urlAdres, {//проверку на статус и возвращение? данных(data)
              uuid: uuid,
              name: task,
              done: done
            });
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
        break;
    }
    return true;
  }

  const done = ({it, userInput = "", id = 0, upTask = ""}) => {

    let done = [...todos];
    let curdone = [...currentTodo];

    switch(it) {
      case "addTask":
        if(userInput) {
          const newItem = {
            id: Date.now(),
            task: userInput,
            complete: false,
          };
          done = [...todos];
          done.push(newItem);
          if(flag) {
            curdone = [...currentTodo];
          } else {
            curdone = [...currentTodo];
            curdone.push(newItem);
          }
        }
        break;
      case "removeTask":
        if(id) {
          done = [...todos.filter((todo) => todo.id !== id)];
          curdone = [...todos.filter((todo) => todo.id !== id)];
          if (!((totalRecords - 1) % LIMIT)) {
            onPageChanged(1, currentPage - 1);
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
        setFlag(0);
        break;
      case "showComplateTask":
        curdone = [...todos.filter( (todo) => todo.complete === true)];
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
  };
  
  const onPageChanged = useCallback(
    (event, page, maxPage=-1) => {
      if (page < 1) page++;
      if (maxPage !== -1 && page > maxPage) page--;
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const currentData = useMemo( () => {
    const currentData = [...currentTodo]
    .slice(
      (currentPage - 1) * LIMIT,
      (currentPage - 1) * LIMIT + LIMIT
    );
    return currentData;
  }, [currentTodo, currentPage]);

  const pages = Math.ceil(totalRecords / LIMIT) || 0;
 
  useEffect( async () => {
    await executeRequest({method: "get"}, {});
    //await executeRequest({ method: "post"}, { task: "test 1" });
    await executeRequest({method: "patch", uuid: "0b1f790c-899d-44de-98c3-19c352acb8a8"}, { task: "update test 1", done: true });
    //await executeRequest({method: "get"}, {});
    await executeRequest({method: "delete", uuid: "0b1f790c-899d-44de-98c3-19c352acb8a8"}, { task: "update test 1", done: true });//204(нет контента) все равно, но удаляет
    //await executeRequest({method: "delete", uuid: "0b1f790c-899d-44de-98c3-19c352acb8a8"}, { });// удалил без параметров тела
    await executeRequest({method: "get"}, {});
  }, []);

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
