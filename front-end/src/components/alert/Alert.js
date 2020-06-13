  
import React from "react";

const Alert = (props) => {
  let theme = "alert alert-dismissible alert-"+props.theme;

  return (
    <div hidden={!props.show} className={theme} role="alert">
      {props.msg}
      <button
        type="button"
        className="close"
        onClick={props.hideAlert}
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;