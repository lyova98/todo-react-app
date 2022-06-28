import React, {useContext, useEffect, useState} from "react";
import {
  Box,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import TodoCard from "./TodoCard";
import { statuses } from "./utils";
import {TodoContext} from "context/TodoContext";

const Todo = () => {
  const { data } = useContext(TodoContext)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (data) {
      setTodos(data)
    }
  }, [data])

  const statusTodos = (status) => {
    return todos.filter((todo) => todo.status.toLowerCase() === status.toLowerCase())
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} wrap="nowrap">
      { statuses.map((status) => (
        <Grid item xs={6} key={status.name}>
          <Paper style={{ minHeight: "70vh", width: "300px" }}>

            <Box padding="10px 0 0">
              <Typography variant="h4" component="div">
                {status.label}
              </Typography>
            </Box>
            { statusTodos(status.name).length > 0 ? statusTodos(status.name).map((todo) => (
              <Box key={todo.id} margin="10px">
                <TodoCard
                  todo={todo}
                />
              </Box>
            )) :
              (
                <span style={{ opacity: 0.5, color: "gray" }}>
                  {status.label} is empty
                </span>
              )
            }
          </Paper>
        </Grid>
      )) }
    </Grid>
  )
}

export default Todo;