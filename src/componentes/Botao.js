import React from 'react';
import '../styles/botao.scss';

const Botao = ({isOutlined = false,...props}) => {
  return <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />;
};

export default Botao;
