import React,{ useContext,useEffect,useRef,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItems from './NoteItems'
import { useNavigate } from 'react-router-dom'

const Notes = ({showAlert}) => {
    const context=useContext(NoteContext)
    const {notes,getNotes,editNote}= context
    let navigate=useNavigate()

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes()
      }else{
        navigate("/login")
      }
      // eslint-disable-next-line
    },[])

    const updateNote=(currnote)=>{
      ref.current.click()
      setNote({id: currnote._id,etitle: currnote.title,edescription: currnote.description, etag: currnote.tag})
    }

    const handleClick=()=>{
      editNote(note.id,note.etitle,note.edescription,note.etag)
      closeRef.current.click()
      showAlert("Note Updated Successfully","success")
    }

    const ref=useRef(null)
    const closeRef=useRef(null)

    const [note, setNote] = useState({etitle:"",edescription:"",etag:""})

    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }
    
  return (
    <div className="container my-3">

    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div className="modal-body">
          <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label" >Title</label>
          <input type="text" onChange={onChange} className="form-control" name='etitle' id="etitle" value={note.etitle} placeholder="Enter Title Here"/>
          </div>

          <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" onChange={onChange} id="edescription" name='edescription' rows="1" value={note.edescription} placeholder='Write Description Here'></textarea>
          </div>

          <div className="mb-3 my-3">
          <label htmlFor="tag" className="form-label" >Tag</label>
          <input type="text" onChange={onChange} className="form-control" name='etag' id="etag" value={note.etag} placeholder="Enter Tag Here"/>
        </div>
          </div>
          <div className="modal-footer">
            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div className='row my-3'>
        <h1>Your Notes</h1>
        {notes.map((e,idx)=>{
          return <NoteItems showAlert={showAlert} key={idx} note={e} updateNote={updateNote} />;
          
        })}
    </div>
    </div>
  )
}

export default Notes