import React from "react";
import Form from "../../components/Form/Form.js";
import s from '../../styles/style.css';
import formData from "./formData.js";

const EditType = () => {
  return (
      <div className={`${s.containerRow} ${s.wrapper}`}>
        <Form formInfo={formData} />
      </div>
  );
};

export default EditType;