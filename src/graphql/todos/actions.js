import {gql} from "@apollo/client";

export const GET_TODOS = gql`
  query {
   todos {
    id,
    name,
    status,
    createdAt,
    updatedAt,
   }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($name: String!, $status: StatusType!)  {
      createTodo(name: $name, status: $status) {
          message,
          status,
          todo {
            id,
            name,
            status,
            createdAt,
            updatedAt,
          }
      }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!)  {
      deleteTodo(id: $id) {
          message,
          status
      }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $name: String!, $status: StatusType!)  {
      updateTodo(id: $id, name: $name, status: $status) {
          message,
          status,
          todo {
            id,
            name,
            status,
            createdAt,
            updatedAt,
          }
      }
  }
`;

