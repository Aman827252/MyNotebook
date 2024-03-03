import React from "react";

const About = () => {

  const style={
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", 
  }
  return (
    <div className="card" style={style}>
      <img style={{width: "500px",height: "391px"}} src="https://cdn2.vectorstock.com/i/1000x1000/26/61/sheet-of-paper-for-notes-icon-flat-style-vector-8312661.jpg" className="card-img-top" alt="noteimage" />
      <div className="card-body">
        <p className="card-text">
          <b><i>This is Simple Notebook Application Which is used to Add Notes.</i></b>
        </p>
        <p className="card-text">
          <b>Created By Aman Porwal</b>
        </p>
        <p className="card-text">
          <p><b><i>The Following Link Redirects to the Github Profile 👇</i></b></p>
          <p><a href="https://github.com/Aman827252">Github</a></p>          
        </p>
      </div>
    </div>
  );
};

export default About;
