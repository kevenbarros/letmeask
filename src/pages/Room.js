import React from 'react';
import { useContext } from 'react';
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
import { auth, database } from '../services/firebase';
//import img
import imgLogo from '../assetes/images/logo.svg';

//import style
import '../styles/room.scss';
//import context
import { authContext } from '../App';
import { object } from 'prop-types';
import Question from '../componentes/Question';
//import huks
import { useRoom } from '../huks/useRoom';
const Room = () => {
  //const { user } = useAuth();
  const params = useParams();
  const RoomId = params.id;
  const { user, LogarNoGoogle } = useContext(authContext);
  const [newquestion, setNewquestion] = React.useState('');
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
  async function handleSendQuestions(e) {
    e.preventDefault();
    if (newquestion.trim() === '') {
      return;
    }
    if (!user) {
      throw new Error('you must be logged in');
    }
    const question = {
      content: newquestion,
      author: {
        nome: user.nome,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${RoomId}/questions`).push(question);

    setNewquestion('');
  }
  async function handleLikeQuestions (questionId ,likeId){
     if(likeId){
       //remover
       await database.ref(`rooms/${RoomId}/questions/${questionId}/likes/${likeId}`).remove()
    }else{
      //add
      await database.ref(`rooms/${RoomId}/questions/${questionId}/likes`).push({
        authorId : user.id,
        })
    }
    
  } 

  return (
    <div id="page-room">
      <Head title="sala" />
      <header>
        <div className="content">
          <img src={imgLogo} alt="" />

          <CopyCod code={RoomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}

          <br />
        </div>

        <form>
          <textarea
            placeholder="sua pergunta aqui"
            value={newquestion}
            onChange={(event) => setNewquestion(event.target.value)}
          ></textarea>

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.nome} />
                <p>{user.nome}</p>
              </div>
            ) : (
              <span>
                para mandar alguma pergunta{' '}
                <button onClick={voltarParaOmenu}>
                  <u> faça login</u>
                </button>
              </span>
            )}
            <Botao type="submit" disabled={!user} onClick={handleSendQuestions}>
              enviar pergunta
            </Botao>
          </div>
        </form>
        {questions.map((i) => {
          return (
          <Question content={i.content} author={i.author} key={i.id} isAnswered={i.isAnswered}
          isHighlighted ={i.isHighlighted} >

            <button className={`like-button ${i.likeId ? 'liked' : ''}`}
            type='button' 
            aria-label="marcar como gostei"
            onClick={()=> handleLikeQuestions(i.id,i.likeId)}>
              {i.likeCount > 0 && <span>{i.likeCount}</span>}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Question>
          )
        })}
        
      </main>
    </div>
  );
};

export default Room;
