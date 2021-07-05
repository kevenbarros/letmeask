import React from 'react';
//import componentes
import Botao from '../componentes/Botao';
//import img
import imgLogo from '../assetes/images/logo.svg';
//import style
import '../styles/room.scss';
const Room = () => {
  return (
    <div id="page-room">
      <header>
        <div className="menu">
          <img src={imgLogo} alt="" />
          <div>codigo</div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>sala React</h1>
          <span>4 perguntas</span>
          <br />
        </div>

        <form>
          <textarea placeholder="sua pergunta aqui"></textarea>
          <br />

          <span>
            {' '}
            para mandar alguma pergunta <button> faça login</button>
          </span>
          <Botao type="submit">enviar pergunta</Botao>
        </form>
      </main>
    </div>
  );
};

export default Room;
