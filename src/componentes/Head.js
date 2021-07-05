import React from 'react';

const Head = (props) => {
  React.useEffect(() => {
    document.title = `Letmeask | ` + props.title;
  }, [props]);
  return <></>;
};
export default Head;
