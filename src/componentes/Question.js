import React from 'react';
import '../styles/question.scss';
const Question = ({ children,content, author,isHighlighted = false,isAnswered= false }) => {
  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted': ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.nome} />
          <span>{author.nome}</span>
        </div>
        <div className='like'>{children}</div>
        
      </footer>
    </div>
  );
};

export default Question;
