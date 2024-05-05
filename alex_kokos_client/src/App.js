import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useConnectSocket } from "./hooks/useConnectSocket";
import { check } from "./http/userAPI";

const App = observer(() => {
  const {user} = useContext(Context);

  useEffect(() => {
      
      async function startFetching() {
        user.setUser(true); 
        const data = await check().then(data => {
          if (!ignore && data) {
            user.setUser(data);
            user.setIsAuth(true);
          }
        })
       
      }
  
      let ignore = false;
      startFetching();
      return () => {
        ignore = true;
      }
  }, [])

  return (
    <BrowserRouter >
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
