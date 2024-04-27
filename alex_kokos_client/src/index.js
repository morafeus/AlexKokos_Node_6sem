import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AnswerStore from './store/AnswerStore';
import CourseStore from './store/CourseStrore';
import DesciplineStore from './store/DesciplineStore';
import TeachersStore from './store/TeachersStore';
import TestStore from './store/TestStore';
import UserStore from './store/UserStore';

export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    courses: new CourseStore(),
    descipline: new DesciplineStore(),
    answers: new AnswerStore(),
    teachers: new TeachersStore(),
    tests: new TestStore()
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
);

