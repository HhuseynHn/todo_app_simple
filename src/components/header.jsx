import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-10 animate-fade-in">
      
      <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
        <svg 
          className="w-10 h-10 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
          />
        </svg>
      </div>

      
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-3">
        Todo App
      </h1>

      
      <p className="text-slate-400 text-lg max-w-md mx-auto">
        Tapşırıqlarınızı asanlıqla idarə edin və izləyin
      </p>

      
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent to-purple-500"></div>
        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
        <div className="w-12 h-1 rounded-full bg-gradient-to-l from-transparent to-purple-500"></div>
      </div>
    </header>
  );
};

export default Header;

