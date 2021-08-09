import React from 'react';
//import componentes
import Botao from '../componentes/Botao';
import Head from '../componentes/Head';
import CopyCod from '../componentes/CopyCod';
import { useAuth } from '../huks/useAuth';
import {
  BrowserRouter,
  Routes,
  Route,
  useHistory,
  useParams,
} from 'react-router-dom';
import { database } from '../services/firebase';
//import img
import imgLogo from '../assetes/images/logo.svg';
import deleteImg from '../assetes/images/delete.svg';
import checkImg from '../assetes/images/check.svg';
import answerImg from '../assetes/images/answer.svg';
//import style
import '../styles/room.scss';
//import context
import { authContext } from '../App';
import { object } from 'prop-types';
import Question from '../componentes/Question';
//import huks
import { useRoom } from '../huks/useRoom';
const AdmRoom = () => {
  //const { user } = useAuth();
  const params = useParams();
  const RoomId = params.id;
  const { user, LogarNoGoogle } = React.useContext(authContext);
  const { title, questions } = useRoom(RoomId);

  const history = useHistory();

  function backHome(e) {
    e.preventDefault();
    console.log('home');
  }
  async function voltarParaOmenu(e) {
    e.preventDefault();

    await LogarNoGoogle();
  }
  async function handleDeleteQuestions(questionId){
    if(window.confirm('tem certeza que quer excluir essa pergunta ?')){
      await database.ref(`rooms/${RoomId}/questions/${questionId}`).remove()
    }
  }
  async function handleCheckQuestionsAnswered(questionId){
    
    await database.ref(`rooms/${RoomId}/questions/${questionId}`).update({
      isAnswered:true
    })
   
  }
  async function handleHighlight(questionId){
    await database.ref(`rooms/${RoomId}/questions/${questionId}`).update({
    isHighlighted:true
    })
  }
  async function handleEndRoom(){
    await database.ref(`rooms/${RoomId}`).update({
      endedAt : new Date()
    })
    history.push('/')
  }

  return (
    <div id="page-room">
      <Head title="sala" />
      <header>
        <div className="content">
          <img src={imgLogo} alt="" />
          <div>
          <CopyCod code={RoomId} />
          <Botao isOutlined onClick={handleEndRoom}>encerrar sala</Botao>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}

          <br />
        </div>


        {questions.map((i) => {
          return <><Question 
          content={i.content}
          author={i.author}
          key={i.id}
          isAnswered={i.isAnswered}
          isHighlighted ={i.isHighlighted}
           >
            <div>
              <button type='button' onClick={()=>handleDeleteQuestions(i.id)}>
                <img src={deleteImg} alt="remover pergunta" />
              </button>
              <button type='button' onClick={()=>handleCheckQuestionsAnswered(i.id)}>
                <img src={checkImg} alt="marcar pergunta como respondida" />
              </button>
              <button type='button' onClick={()=>handleHighlight(i.id)}>
                <img src={answerImg} alt="dar destaque a pergunta" />
              </button>
            </div>
          </Question>
          
          </>
        })}
      </main>
    </div>
  );
};

export default AdmRoom;
