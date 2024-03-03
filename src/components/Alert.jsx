import React from "react";

const Alert = ({alert}) => {
  const capitalize=(w)=>{
    if(w==="danger"){
      w="error"
    }
    const lower=w.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }

  return (
    alert &&
    <div className={`alert alert-${alert.type}`} role="alert">
     <strong>{capitalize(alert.type)}</strong> : {alert.msg}
    </div>
  );
};

export default Alert;
