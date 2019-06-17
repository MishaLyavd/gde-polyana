import React from "react";
import Title from "../../components/Title/Title.js";
import s from '../../styles/style.css';

const App = () => {
  return (
      <div className={`${s.containerColumn} ${s.wrapper}`}>
        <Title />
      </div>
  );
};

export default App;