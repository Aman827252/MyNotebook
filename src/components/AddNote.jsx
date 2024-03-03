import React,{ useContext,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = ({showAlert}) => {
  const context=useContext(NoteContext) 
  const {addNote}= context

  const [note, setNote] = useState({title:"",description:"",tag:""})

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({title:"",description:"",tag:""})
    showAlert("Note Added Successfully",'success')
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <div className="container my-3">
        <h1>Add a Note</h1>
        <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label" >Title</label>
        <input type="text" onChange={onChange} className="form-control" name='title' id="title" value={note.title} placeholder="Enter Title Here"/>
        </div>

        <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" onChange={onChange} id="description" name='description' rows="1" value={note.description} placeholder='Write Description Here'></textarea>
        </div>

        <div className="mb-3 my-3">
        <label htmlFor="tag" className="form-label" >Tag</label>
        <input type="text" onChange={onChange} className="form-control" name='tag' id="tag" value={note.tag} placeholder="Enter Tag Here"/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} onClick={handleClick} type="button" className="btn btn-primary">Submit</button>
      </div>
  )
}

export default AddNote