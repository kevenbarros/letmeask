import React from 'react';
import '../styles/auth.scss';

import Botao from '../componentes/Botao.js';
import Head from '../componentes/Head';

import Illustrationimg from '../assetes/images/illustration.svg';
import Logoimg from '../assetes/images/logo.svg';

import { BrowserRouter, Routes, Route, useHistory } from 'react-router-dom';
import { authContext } from '../App';
import { database } from '../services/firebase';

const NewRoom = () => {
  const history = useHistory();
  const { user, LogarNoGoogle } = React.useContext(authContext);

  //estados
  const [nomeSala, setNomeSala] = React.useState('');

  async function criarSala(e) {
    e.preventDefault();

    if (nomeSala.trim() == '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: nomeSala,
      authorId: user.id,
    });
    history.push(`/rooms/${firebaseRoom.key}`); //o key é o id inserido nofirebase
  }

  return (
    <div id="page-auth">
      <Head title="new room" />
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
          <h1></h1>
          <img src={Logoimg} alt="logo do site " />

          <div className="labelCrieumasala">
            seja bem-vindo
            <br />
            Crie uma nova sala
          </div>
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
              value={nomeSala}
              onChange={(e) => setNomeSala(e.target.value)}
            />
            <br />
            <Botao onClick={criarSala} type="submmit">
              Criar sala
            </Botao>
          </form>
          <p style={{ color: '#737380', fontSize: '14px' }}>
            quer entrar em uma sala existente ? <a href="/"> click aqui</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
