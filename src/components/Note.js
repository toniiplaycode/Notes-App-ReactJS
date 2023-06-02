import { MdDeleteForever } from 'react-icons/md';

const Note = ({id, text, date, handleDeleteNote}) => {
    return(
        <div className="note">
            <div className="text">
                {text}
            </div>
            <div className="note-footer">
                <div className="note-footer__right">
                    {date}
                </div>
                <div className="note-footer__left">
                    <MdDeleteForever className='delete-icon' onClick={()=>handleDeleteNote(id)} />
                </div>
            </div>
        </div>
    )
}

export default Note;