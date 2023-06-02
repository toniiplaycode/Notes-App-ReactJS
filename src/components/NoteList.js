import Note from "./Note";
import { noteListContext } from "../App";
import { useContext, useEffect, useState } from "react";
import AddNote from "./AddNote";

const NoteList = () => {
    const [checkSearch, setCheckSearch] = useState(false);
    const [checkNoteListEmpty, setCheckNoteListEmpty] = useState(false);

    // -- cách 1 tường minh
    // const valueContext = useContext(noteListContext);
    // const noteList = valueContext.noteList

    // -- cách 2 gọn hơn
    let {  noteList, handleDeleteNote, inputSearch, modeDark } = useContext(noteListContext); // để kiểu biến là let mới gán lại được noteList

    useEffect(()=>{
        if(noteList.length === 0) {
            setCheckNoteListEmpty(true);
        } else {
            setCheckNoteListEmpty(false);
        }
    }, [noteList]);

    let noteListSearch = noteList;
    
    noteListSearch = noteList.filter((note) => note.text.toLowerCase().includes(inputSearch.toLowerCase())); // search

    useEffect(()=>{
        if(noteListSearch.length === 0){
            setCheckSearch(true);
        }else{
            setCheckSearch(false);
        }
    }, [noteListSearch]) // khi noteList thay đổi do search thì mới setCheckSearch
    
    return(
        <div className="note-list">
            {checkNoteListEmpty
            ?
            <h2 className={modeDark && "dark-mode-text"}>không có ghi chú nào !</h2>
            :
                checkSearch 
                ?
                <h2 className={modeDark && "dark-mode-text"}>Không tìm thấy note bạn cần tìm !</h2>
                : 
                noteListSearch.map((note) => {
                    return(
                        <Note 
                            key={note.id} 
                            id={note.id} 
                            isEditNote={note.isEditNote}
                            text={note.text} 
                            date={note.date} 
                            handleDeleteNote={handleDeleteNote}
                        />
                    )
                })
            }
            <AddNote />
        </div>
    )
}

export default NoteList;