import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
console.log("API Base URL:", process.env.REACT_APP_API_URL);
console.log("Process URL:", process.env);
// const baseUrl = "http://localhost:5000";

const getAllTodo = (setTodo) => {
  axios
    .get(`${baseUrl}`)
    .then((response) => {
      setTodo(response.data.data);
    })
    .catch((error) => console.log(error));
};

const addTodo = (text, setText, setTodo) => {
  axios
    .post(`${baseUrl}/save`, { text })
    .then((response) => {
      console.log(response.data.message); // Optionally log the success message
      console.log(`Execution time: ${response.data.executionTime}`); // Optionally log the execution time
      setText(""); // Clear the input field
      getAllTodo(setTodo); // Refresh the list of todos
    })
    .catch((error) => {
      console.error(`Error adding todo: ${error.response.data.error}`);
      console.error(`Execution time: ${error.response.data.executionTime}`);
    });
};

const updateTodo = (_id, text, setText, setTodo, setIsUpdating) => {
  axios
    .put(`${baseUrl}/update/${_id}`, { text })
    .then((response) => {
      console.log(response.data.message); // Optionally log the success message
      console.log(`Execution time: ${response.data.executionTime}`); // Optionally log the execution time
      setText(""); // Clear the input field
      setIsUpdating(false); // Reset the updating flag
      getAllTodo(setTodo); // Refresh the list of todos
    })
    .catch((error) => {
      console.error(
        `Error updating todo: ${error.response?.data?.error || error.message}`
      );
      console.error(`Execution time: ${error.response?.data?.executionTime}`);
    });
};
export { getAllTodo, addTodo, updateTodo };
