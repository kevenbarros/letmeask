import React, { useEffect } from 'react';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import {
  BrowserRouter,
  Routes,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { auth, firebase } from './services/firebase';
import Room from './pages/Room';
import AdmRoom from './pages/AdmRoom'

export const authContext = React.createContext({});
function App() {
  const [user, setUser] = React.useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error('nao funcionou ');
        }
        setUser({ id: uid, nome: displayName, avatar: photoURL });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function LogarNoGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const resultado = await auth.signInWithPopup(provider);

    if (resultado.user) {
      const { displayName, photoURL, uid } = resultado.user;

      if (!displayName || !photoURL) {
        throw new Error('nao funcionou ');
      }
      setUser({ id: uid, nome: displayName, avatar: photoURL });
    }
  }
  return (
    <BrowserRouter>
      <authContext.Provider value={{ user, LogarNoGoogle }}>
        <Switch>
          {' '}
          // faz que que aceite apenas uma rota
          <Route path="/" exact component={Home} />
          <Route path="/room/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdmRoom}/>
        </Switch>
      </authContext.Provider>
    </BrowserRouter>
  );
}

export default App;
