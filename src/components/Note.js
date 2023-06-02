import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { noteListContext } from "../App";
import { useContext, useEffect} from "react";


const Note = ({id, isEditNote, text, date, handleDeleteNote}) => {
    
    let { inputEdit, setInputEdit, handleIsEdit, handleEdit} = useContext(noteListContext);
    
    // dùng useEffect để set giá trị cho inputEdit
    useEffect(()=>{
        setInputEdit(text);
    },[isEditNote])
    
    return(
        <div className="note">
            <div>
                {isEditNote
                ? 
                <textarea className='textarea-change' value={inputEdit} onChange={(e)=>setInputEdit(e.target.value)} />
                : 
                <div className='text'>{text}</div>
                }
            </div>
            <div className="note-footer">
                <div>
                    {date}
                </div>
                <div>
                    {isEditNote
                    ?
                    <button className="save-change" onClick={()=>handleEdit(id)}>Save change</button>
                    :
                    <>
                        <MdEdit className='edit-icon' onClick={()=>handleIsEdit(id)} />
                        <MdDeleteForever className='delete-icon' onClick={()=>handleDeleteNote(id)} />
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Note;