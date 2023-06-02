import { useState, createContext, useEffect } from "react";
import { nanoid } from 'nanoid';
import NoteList from "./components/NoteList";
import Search from "./components/Search";
import Header from "./components/Header";

export const noteListContext  =  createContext(); // dùng useContext để truyền dữ liệu cho các components con

const App = () => {
  const [modeDark, setModeDark] = useState(()=>{
    const getModeDark = JSON.parse(localStorage.getItem('modeDark'));
    if(getModeDark) { 
      return true;
    }else{
      return false;
    }
  });

  const [noteList, setNoteList] =  useState(()=>{
    const getNoteList = JSON.parse(localStorage.getItem('noteList'));
    return getNoteList 
      ?? 
      [
        {
          id: nanoid(),
          text: '- This is an example note of Tonii\n- You can delete it ',
          date: '11/05/2023'
        }
      ]
  });

  // lưu noteList, modeDark lên local storage
  useEffect(()=>{
    localStorage.setItem('noteList', JSON.stringify(noteList));
  },[noteList]);

  useEffect(()=>{
    localStorage.setItem('modeDark', JSON.stringify(modeDark));
  },[modeDark]);

  const [inputAdd, setInputAdd] = useState('');

  const handleAddNote = () => {
    const currentdate = new Date().toLocaleDateString('en-GB'); 
    
    if(inputAdd.trim().length > 0) {
      setNoteList(
        [...noteList,
          {
            id: nanoid(),
            text: inputAdd,
            date: currentdate
          }
        ]
      )
      setInputAdd('');
    } else {
      alert('Note is empty !')
    }
  }
  
  const handleDeleteNote = (id) => {
    let checkConfirmDelete = window.confirm("Bạn có chắc là xoá note này chứ ?");
    if(checkConfirmDelete) {
      const newNoteList = noteList.filter((item) => item.id !== id);
      setNoteList(newNoteList);
    }
  }

  const [inputSearch, setInputSearch] = useState('');

  const valueContext = {
    noteList,
    inputAdd,
    setInputAdd,
    handleAddNote,
    handleDeleteNote,
    inputSearch,
    setInputSearch,
    modeDark,
    setModeDark
  }

  return (
    <main className={modeDark && "dark-mode"}>
      <div className="container">
        <noteListContext.Provider value={valueContext}>
          <Header/>
          <Search/>
          <NoteList/>        
        </noteListContext.Provider>
      </div>
    </main>
  );
}

export default App;
