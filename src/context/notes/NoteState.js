import NoteContext from "./NoteContext";
import { useState } from "react";
const url="http://localhost:5000"

const NoteState=(props)=>{

    const notesInitial=[]

    const [notes, setNotes] = useState(notesInitial)

    const getNotes=async()=>{
        const response = await fetch(`${url}/api/fetchallnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            }
          });
        const json=await response.json();
        setNotes(json)
    }

    const addNote=async (title,description,tag)=>{

        const response = await fetch(`${url}/api/addnote`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          const json=await response.json()
          setNotes(notes.concat(json));
    }
    const deleteNote=async(id)=>{
        const response = await fetch(`${url}/api/deletenote/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            }
          });
        const json=response.json();
        const newNotes=notes.filter((e)=>{return e._id!==id})
        setNotes(newNotes);
    }
    const editNote=async(id,title,description,tag)=>{
      const response = await fetch(`${url}/api/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json=await response.json()

      const newNote=JSON.parse(JSON.stringify(notes))
      for(let i=0;i<newNote.length;i++){
        const element=newNote[i]
        if(element._id===id){
          newNote[i].title=title;
          newNote[i].description=description;
          newNote[i].tag=tag;
          break
        }
      }
      setNotes(newNote)
    }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState