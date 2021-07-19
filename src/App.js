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
  //const [flag, setFlag] = useState(0); 
  
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
          if (response.status === 200) {
            return response.data
            // const a = [...response.data]
            // setTodos([...response.data])
          } else {
            //snack bar
          }
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
            if (response.status === 200) {
              return response.data; 
            } else {
              //snack bar flag error
            }
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
            if (response.status === 200) {
              return response.data; 
            } else {
              //snack bar flag error
            }
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
            if (response.status === 204) {
              return response; 
            } else {
              //snack bar flag error
            }
          } catch (error) {
            console.log(error);
          }
        }
        break;
      default:
        console.log("method? error | default")
    }
    return true;
  }

  const done = async ({it, userInput = "", uuid = 0, upTask = "", complete = -1}) => {

    //let done = [...todos];
    let curdone = [...currentTodo];

    switch(it) {
      case "addTask":
        if(userInput) {
          await executeRequest({ method: "post"}, { task: userInput });
          // const newItem = {
          //   id: allTask.createdAt,
          //   task: userInput, //allTask.name
          //   complete: allTask.done,
          //   uuid: allTask.uuid
          // };
          const allTask = await executeRequest({method: "get"}, {});
          curdone = [...allTask];
          //done.push(newItem);
          // if(flag) {
          //   curdone = [...currentTodo];
          // } else {
          //   curdone = [...currentTodo];
          //   curdone.push(newItem);
          // }
        }
        break;
      case "removeTask":
        if(uuid) {
          //done = [...todos.filter((todo) => todo.id !== id)];
          //curdone = [...todos.filter((todo) => todo.id !== id)];
          await executeRequest({ method: "delete", uuid: uuid }, { });
          const allTask = await executeRequest({method: "get"}, {});
          curdone = [...allTask];

          if (!((totalRecords - 1) % LIMIT)) {
            onPageChanged(1, currentPage - 1);
          }
        }
        break;
      case "changeChecbox":
        if (uuid && complete !== -1) {
          await executeRequest({method: "patch", uuid: uuid }, { task: name, done: !complete });
          const allTask = await executeRequest({method: "get"}, {});
          curdone = [...allTask];
        }
        break;
      case "showAllTask":
        const allTask = await executeRequest({method: "get"}, {});
        curdone = [...allTask];
        //setFlag(0);
        break;
      case "showComplateTask":
        const allTask = await executeRequest({method: "get"}, {});
        curdone = [...allTask.filter( (todo) => todo.done === true)];
        //curdone = [...todos.filter( (todo) => todo.complete === true)];
        onPageChanged(1, 1);
        //setFlag(1);
        break;
      case "showUncomplateTask":
        const allTask = await executeRequest({method: "get"}, {});
        curdone = [...allTask.filter( (todo) => todo.done === false)];
        //curdone = [...todos.filter( (todo) => todo.complete === false)];
        onPageChanged(1, 1);
        setFlag(0);
        break;
      case "sortByDate":
        const allTask = await executeRequest({method: "get"}, {});
        const sortTodo = [...allTask];
        sortTodo.sort( (a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt) );
        curdone = [...sortTodo];
        break;
      case "sortByReversDate":
        const allTask = await executeRequest({method: "get"}, {});
        const sortTodo = [...allTask];
        sortTodo.sort( (a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) );
        curdone = [...sortTodo];
        break;
      case "updateTask":
        if (uuid && upTask) {
          // const findId = todos.findIndex( (todo) => todo.uuid === uuid);
          // const copyTodo = [...todos];
          // copyTodo[findId].task = upTask;
          // done = [...copyTodo];
          // curdone = [...copyTodo];
          await executeRequest({method: "patch", uuid: currentTodo.uuid }, { task: upTask, done: currentTodo.done });
        }
        break;
      default:
        console.log("error done task");
    }
    //setTodos(done);
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
    async function deleteAll() {
      const allTask = await executeRequest({method: "get"}, {});
      for (let i = 0; i < allTask.length; i++) {
        await executeRequest({method: "delete", uuid: allTask[i].uuid }, { });
      }
    }
    //deleteAll();
    await executeRequest({method: "get"}, {});
    //await executeRequest({ method: "post"}, { task: "test 1" });
    //await executeRequest({method: "patch", uuid: "0b1f790c-899d-44de-98c3-19c352acb8a8"}, { task: "update test 1", done: true });
    //await executeRequest({method: "get"}, {});
    //await executeRequest({method: "delete", uuid: "0b1f790c-899d-44de-98c3-19c352acb8a8"}, { task: "update test 1", done: true });//204(нет контента) все равно, но удаляет
    //await executeRequest({method: "delete", uuid: "0b1f790c-899d-44de-98c3-19c352acb8a8"}, { });// удалил без параметров тела
    //await executeRequest({method: "get"}, {});
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
