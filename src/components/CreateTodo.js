import React, {useContext, useEffect, useState} from "react"
import {
  Button,
} from "@mui/material";
import {useMutation} from "@apollo/client";
import {CREATE_TODO} from "graphql/todos/actions";
import CreateUpdateTodoModal from "./CreateUpdateTodoModal";
import {TodoContext} from "../context/TodoContext";
import {statuses} from "./utils";

const CreateTodo = () => {
  const { addTodo: setTodo, showMessage } = useContext(TodoContext)
  const [addTodo, { data }] = useMutation(CREATE_TODO)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data?.createTodo?.todo) {
      setTodo(data.createTodo.todo)
    }
  }, [data])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createTodo = (variables) => {
    addTodo({ variables }).then(() => {
      handleClose()
      showMessage({
        status: "success",
        message: "New todo item successfully added"
      })
    }).catch(() => {
      showMessage({
        status: "error",
        message: "Something went wrong"
      })
    })
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create TODO
      </Button>
      { open ? <CreateUpdateTodoModal
        handleClose={handleClose}
        submitTodo={createTodo}
        todo={{
          name: "",
          status: statuses[0].name
        }}
        open={open}
        type={"create"}
      /> : null }
    </>
  )
}

export default CreateTodo