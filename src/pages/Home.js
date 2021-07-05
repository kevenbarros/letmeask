import React, { useContext } from 'react';
import '../styles/auth.scss';

import Botao from '../componentes/Botao.js';
import Head from '../componentes/Head';
import { auth, firebase } from '../services/firebase';
import { database } from '../services/firebase';

import Illustrationimg from '../assetes/images/illustration.svg';
import Logoimg from '../assetes/images/logo.svg';
import Googleimg from '../assetes/images/google-icon.svg';

import { BrowserRouter, Routes, Route, useHistory } from 'react-router-dom';
import { authContext } from '../App';

const Home = () => {
  const history = useHistory();
  const { user, LogarNoGoogle } = useContext(authContext);
  const [roomCode, setRoomCode] = React.useState('');

  async function navegaçao() {
    if (!user) {
      await LogarNoGoogle();
    }
    history.push('/room/new');
  }
  //criar funçao para entrar na sala
  async function handleJoinRoom(e) {
    e.preventDefault();
    if (roomCode.trim == '') {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert('essa sala não existe');
      return;
    }
    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <Head title="home" />
      <aside>
        <img
          src={Illustrationimg}
          alt="ilustraçao simbolizando perguntas e resposta"
        />
        <strong>Crie salas de chats ao vivo</strong>
        <p>Tire as duvidas da sua aplicaçao em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={Logoimg} alt="logo do site " />
          <button className="creat-room" onClick={navegaçao}>
            <img src={Googleimg} alt="logo do google" />
            crie sua sala com o google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <br />
            <Botao type="submmit">Entrar na sala</Botao>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
