import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CourseStore from './store/CourseStrore';
import UserStore from './store/UserStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    courses: new CourseStore()
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
);

