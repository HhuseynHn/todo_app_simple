import axios from 'axios';

const API_URL = 'http://localhost:3001';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


const handleError = (error) => {
  if (error.response) {
    // Server error 
    console.error('Server xətası:', error.response.data);
    throw new Error(`Server xətası: ${error.response.status}`);
  } else if (error.request) {
    // Network error
    console.error('Şəbəkə xətası:', error.request);
    throw new Error('Şəbəkə xətası: Serverə qoşulmaq mümkün olmadı. JSON Server-in işlədiyindən əmin olun.');
  } else {
    
    console.error('Xəta:', error.message);
    throw new Error(`Xəta: ${error.message}`);
  }
};

// get All todo
export const getAllTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// get for ID
export const getTodoById = async (id) => {
  try {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// create
export const createTodo = async (todo) => {
  try {
    const newTodo = {
      ...todo,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const response = await api.post('/todos', newTodo);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// update
export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await api.put(`/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// delete
export const deleteTodo = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
    return true;
  } catch (error) {
    handleError(error);
  }
};

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};

