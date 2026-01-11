import React from 'react';
import TodoItem from './todoItem';

const TodoList = ({ todos, onTodoClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-400">Yüklənir...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-slate-800/50 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500/20 rounded-full"></div>
          <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-pink-500/20 rounded-full"></div>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          Tapşırıq yoxdur
        </h3>
        <p className="text-slate-500 text-center max-w-sm">
          Yuxarıdakı formdan istifadə edərək ilk tapşırığınızı əlavə edin
        </p>
      </div>
    );
  }

  // Todos-u sort create date
  const sortedTodos = [...todos].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Completed və pending separete
  const pendingTodos = sortedTodos.filter(todo => !todo.completed);
  const completedTodos = sortedTodos.filter(todo => todo.completed);

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
            {pendingTodos.length} gözləyən
          </span>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
            {completedTodos.length} tamamlanmış
          </span>
        </div>
        <span className="text-slate-500 text-sm">
          Cəmi: {todos.length}
        </span>
      </div>

      {/* Pending Todos */}
      {pendingTodos.length > 0 && (
        <div className="space-y-3">
          {pendingTodos.map((todo, index) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onClick={() => onTodoClick(todo)}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-slate-700/50"></div>
            <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Tamamlanmış
            </span>
            <div className="h-px flex-1 bg-slate-700/50"></div>
          </div>
          <div className="space-y-3">
            {completedTodos.map((todo, index) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onClick={() => onTodoClick(todo)}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;

