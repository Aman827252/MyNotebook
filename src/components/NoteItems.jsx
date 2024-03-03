import React,{useContext} from "react";
import NoteContext from '../context/notes/NoteContext'


const NoteItems = ({ note , updateNote, showAlert }) => {
  const { deleteNote }=useContext(NoteContext)
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} style={{color: '#025af2'}}></i>
            <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id);showAlert("Note Deleted Successfully","success")}} style={{color: '#025af2'}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
