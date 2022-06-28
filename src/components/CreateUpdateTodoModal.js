import React, {useContext, useState} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import {statuses} from "./utils";
import {TodoContext} from "context/TodoContext";

const CreateUpdateTodoModal = ({submitTodo, handleClose, todo = {}, open, type}) => {
  const { showMessage } = useContext(TodoContext)
  const [todoData, setTodoData] = useState({
    ...todo
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setTodoData((prev) => ({
      ...prev,
      [name]: value
    }))
  };


  const validate = (todoData) => {
    if (todoData.name) {
      submitTodo(todoData)
    } else {
      showMessage({
        status: "error",
        message: "Name field is required"
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {`${type === "create" ? 'Add todo' : 'Edit todo'}`}
      </DialogTitle>
      <DialogContent>
        <Box padding="10px">
          <TextField
            name="name"
            label="Name"
            value={todoData.name}
            onChange={handleChange}
          />
          <Select
            label="Status"
            name="status"
            value={todoData.status}
            onChange={handleChange}
          >
            { statuses.map((status) => {
              return (
                <MenuItem value={status.name} key={status.name}>{status.label}</MenuItem>
              )
            }) }
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={() => validate(todoData)}>{`${type === "create" ? 'Create' : 'Update'}`}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateUpdateTodoModal