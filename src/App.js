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
          date: '11/05/2023',
          isEditNote: false
        }
      ]
  });

  // ----------lưu noteList, modeDark lên local storage-----------
  useEffect(()=>{
    localStorage.setItem('noteList', JSON.stringify(noteList));
  },[noteList]);

  useEffect(()=>{
    localStorage.setItem('modeDark', JSON.stringify(modeDark));
  },[modeDark]);

  // ------------Thêm note------------
  const [inputAdd, setInputAdd] = useState('');

  const handleAddNote = () => {
    const currentdate = new Date().toLocaleDateString('en-GB'); 
    
    if(inputAdd.trim().length > 0) {
      setNoteList(
        [...noteList,
          {
            id: nanoid(),
            text: inputAdd,
            date: currentdate,
            isEditNote: false
          }
        ]
      )
      setInputAdd('');
    } else {
      alert('Note không được để trống !')
    }
  }
  
  // ----------xoá note-----------
  const handleDeleteNote = (id) => {
    let checkConfirmDelete = window.confirm("Bạn có chắc là xoá note này chứ ?");
    if(checkConfirmDelete) {
      const newNoteList = noteList.filter((item) => item.id !== id);
      setNoteList(newNoteList);
    }
  }

  // ------------sửa note-----------
  const [inputEdit, setInputEdit] = useState('');

  const handleIsEdit = (id) => {
    // dùng map để tìm note theo id và sửa isEditNote:true
    setNoteList(noteList.map((note) => {
      if(note.id === id) {
        return {
          ...note,
          isEditNote: true
        };
      }
      return note;
    }));
  }

  // gán lại giá trị edit
  const handleEdit = (id) => {
    if(inputEdit.trim().length > 0) {
      setNoteList(noteList.map((note) => {
        if(note.id === id) {
          return {
            ...note,
            text: inputEdit,
            isEditNote: false
          };
        }
        return note;
      }))

      setInputEdit('');
    } else {
      alert('Note không được để trống !');
    }
  }

  // -----------tìm kiếm--------------
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
    setModeDark,
    inputEdit,
    setInputEdit,
    handleIsEdit,
    handleEdit,
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
