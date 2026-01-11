import React from 'react';

const TodoItem = ({ todo, onClick, index }) => {
  const { title, completed, createdAt } = todo;

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${title} - ${completed ? 'Tamamlanıb' : 'Gözləyir'}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        group relative overflow-hidden rounded-xl cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        animate-slide-up
        focus:outline-none focus:ring-2 focus:ring-purple-500/50
        ${completed 
          ? 'bg-slate-800/30 hover:bg-slate-800/50 hover:shadow-green-500/10' 
          : 'bg-slate-800/60 hover:bg-slate-800/80 hover:shadow-purple-500/10'
        }
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${completed 
          ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20' 
          : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
        }
      `}></div>

      
      <div className={`
        absolute left-0 top-0 bottom-0 w-1 
        ${completed 
          ? 'bg-gradient-to-b from-green-500 to-emerald-500' 
          : 'bg-gradient-to-b from-purple-500 to-pink-500'
        }
      `}></div>

      <div className="relative p-5 pl-6">
        <div className="flex items-start gap-4">
          {/* Checkbox indicator */}
          <div className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5
            transition-all duration-300
            ${completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-slate-600 group-hover:border-purple-500'
            }
          `}>
            {completed && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`
              text-lg font-medium transition-all duration-300
              ${completed 
                ? 'text-slate-500 line-through' 
                : 'text-white group-hover:text-purple-300'
              }
            `}>
              {title}
            </h3>
            
            <div className="flex items-center gap-3 mt-2">
              {/* Date */}
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(createdAt)}
              </span>


              <span className={`
                px-2 py-0.5 rounded-full text-xs font-medium
                ${completed 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-amber-500/20 text-amber-400'
                }
              `}>
                {completed ? 'Tamamlandı' : 'Gözləyir'}
              </span>
            </div>
          </div>

          
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

