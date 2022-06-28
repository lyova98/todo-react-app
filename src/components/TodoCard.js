import React, {useContext, useState} from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent, IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useMutation} from "@apollo/client";
import {DELETE_TODO, UPDATE_TODO} from "graphql/todos/actions";
import CreateUpdateTodoModal from "./CreateUpdateTodoModal";
import Moment from 'react-moment';
import {TodoContext} from "context/TodoContext";

const TodoCard = ({todo}) => {
  const {
    deleteTodo: setDeletedTodo,
    updateTodo: setUpdatedTodo,
    showMessage
  } = useContext(TodoContext)
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [updateTodo] = useMutation(UPDATE_TODO)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const handleToggleSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSetting = () => {
    setAnchorEl(null);
  };

  const handleDeleteTodo = () => {
    deleteTodo({ variables: {id: parseInt(todo.id)} }).then(() => {
      setDeletedTodo(todo)
      showMessage({
        status: "success",
        message: "The todo successfully deleted"
      })
    }).catch(() => {
      showMessage({
        status: "error",
        message: "Something went wrong with todo delete"
      })
    })
    setAnchorEl(null);
  };

  const handleEditTodo = () => {
    setOpenModal(true);
    setAnchorEl(null);
  };

  const submitTodo = (todoData) => {
    updateTodo({ variables: {...todoData, id: parseInt(todoData.id)} }).then(({data}) => {
      if (data.updateTodo.status === 200) {

        setUpdatedTodo(data.updateTodo.todo)
      }
      showMessage({
        status: data.updateTodo.status === 200 ? "success" : "error",
        message: data.updateTodo.message
      })
      handleCloseModal()
    }).catch(() => {
      showMessage({
        status: "error",
        message: "Something went wrong with todo update"
      })
    })
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <Card sx={{minWidth: 275}}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" component="div">
            {todo.name}
          </Typography>
          <Box>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggleSettings}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseSetting}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleDeleteTodo}>Delete</MenuItem>
              <MenuItem onClick={handleEditTodo}>Edit</MenuItem>
            </Menu>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Box>
          <Box>
            Created at:
            <Moment format="YYYY/MM/DD HH:mm">
              {new Date(parseInt(todo.createdAt))}
            </Moment>
          </Box>
          <Box>Updated at:
            <Moment format="YYYY/MM/DD HH:mm">
              {new Date(parseInt(todo.updatedAt))}
            </Moment>
          </Box>
        </Box>
      </CardActions>
      <CreateUpdateTodoModal
        handleClose={handleCloseModal}
        submitTodo={submitTodo}
        todo={todo}
        open={openModal}
        type={"update"}
      />
    </Card>
  )
}

export default TodoCard

