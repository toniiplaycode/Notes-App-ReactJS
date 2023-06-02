import { noteListContext } from "../App";
import { useContext } from "react";

const AddNote = () => {
    const {  inputAdd, setInputAdd, handleAddNote } = useContext(noteListContext);

    let remaining = 200;

    return(
        <div className="note add-note">
            <div className="text">
                <textarea
                    value={inputAdd}
                    onChange={ remaining -  inputAdd.length > 0
                        ? (e)=>setInputAdd(e.target.value) 
                        : null
                    }
                    placeholder="Type to add a note..."
                />
            </div>
            <div className="note-footer">
                <div className="note-footer__right">
                    {remaining-inputAdd.length} Remaining
                </div>
                <div className="note-footer__left">
                    <button className="add" onClick={handleAddNote}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddNote;