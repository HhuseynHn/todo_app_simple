import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-10 animate-fade-in">
      
     
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

