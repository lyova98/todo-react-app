import './App.css';
import Container from '@mui/material/Container';
import Todo from './components/Todo'
import CreateTodo from "./components/CreateTodo";
import {useQuery} from "@apollo/client";
import {GET_TODOS} from "./graphql/todos/actions";
import React, {useEffect, useState} from "react";
import {TodoContext} from "./context/TodoContext";
import {Alert, Snackbar} from "@mui/material";
import CircularIndeterminate from "./components/Loading";

const App = () => {
  // GET
  const { loading, error, data } = useQuery(GET_TODOS);
  const [todo, setTodo] = useState([])
  const [message, setMessage] = useState({
    state: false
  })

  useEffect(() => {
    if (data?.todos) {
      setTodo(data.todos)
    }
  }, [data])

  const addTodo = (newTodo) => {
    const todoCopy = [...todo]
    todoCopy.push(newTodo)
    setTodo(todoCopy)
  }

  const updateTodo = (updatedTodo) => {
    const todoCopy = [...todo]
    const updatedTodoIndex = todoCopy.findIndex((item) => item.id === updatedTodo.id)
    if (updatedTodoIndex !== -1) {
      todoCopy[updatedTodoIndex] = updatedTodo
      setTodo(todoCopy)
    }
  }

  const deleteTodo = (deletedTodo) => {
    const todoCopy = [...todo]
    const restTodos = todoCopy.filter((item) => item.id !== deletedTodo.id)
    setTodo(restTodos)
  }

  const showMessage = (message) => {
    setMessage({
      state: true,
      ...message
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage({
      state: false
    });
  };

  if (loading) return <CircularIndeterminate />;
  if (error) return <p>Error :(</p>;

  return (
    <TodoContext.Provider value={{
      data: todo,
      deleteTodo,
      updateTodo,
      addTodo,
      showMessage
    }}>
      <div className="App">
        <Container maxWidth="md">
          <h3>TODO list</h3>
          <CreateTodo />
          <Todo />
        </Container>
        <Snackbar open={message.state} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert onClose={handleClose} severity={message.status} sx={{ width: '100%' }}>
            {message.message}
          </Alert>
        </Snackbar>
      </div>
    </TodoContext.Provider>
  );
}

export default App;

