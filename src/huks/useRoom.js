import React from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';
export function useRoom(RoomId) {
  const {user} = useAuth()
  const [questions, setQuestions] = React.useState([]);
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    const roomref = database.ref(`rooms/${RoomId}`);

    roomref.on('value', (room) => {
      const databaseRomm = room.val();
      const firebaseQuestions = databaseRomm.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          };
        },
      );

      setTitle(databaseRomm.title);
      setQuestions(parsedQuestions);
    });
    return () =>{
      roomref.off('value')
    }
  }, [RoomId,user?.id]);
  return { questions, title };
}
