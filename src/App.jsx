import React, { useState, useEffect, useCallback } from "react";
import TodoModal from "./components/todoModal";
import TodoList from "./components/todoList";
import TodoForm from "./components/todoForm";
import Header from "./components/header";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoServices";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (todoData) => {
    const tempId = Date.now();
    const tempTodo = {
      id: tempId,
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // Dərhal UI-da göstər
    setTodos((prevTodos) => [tempTodo, ...prevTodos]);

    try {
      const newTodo = await createTodo(todoData);

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === tempId ? newTodo : todo))
      );
    } catch (err) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== tempId));
      setError(err.message);
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    const previousTodos = [...todos];

    // Update UI
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedData } : todo
      )
    );

    try {
      await updateTodo(id, updatedData);
    } catch (err) {
      // Xəta olarsa, əvvəlki vəziyyətə qaytar
      setTodos(previousTodos);
      setError(err.message);
      throw err;
    }
  };

  // Todo-nu sil (Optimistic Update)
  const handleDeleteTodo = async (id) => {
    // Köhnə vəziyyəti saxla
    const previousTodos = [...todos];

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    try {
      await deleteTodo(id);
    } catch (err) {
      setTodos(previousTodos);
      setError(err.message);
      throw err;
    }
  };

  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-2xl mx-auto">
        <Header />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-red-400 font-medium">Xəta baş verdi</h4>
                <p className="text-red-300/70 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Todo Form */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onTodoClick={handleTodoClick}
          isLoading={isLoading}
        />

        {/* Todo Modal */}
        <TodoModal
          todo={selectedTodo}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      </div>

      {/* Footer */}
      <footer className="relative mt-16 text-center text-slate-500 text-sm">
        <p>© 2026 Bütün hüquqlar qorunur.</p>
      </footer>
    </div>
  );
}

export default App;
