import { MdSearch } from 'react-icons/md';
import { useContext } from 'react';
import { noteListContext } from '../App';

const Search = () => {
    const {inputSearch, setInputSearch} = useContext(noteListContext);
    return(
        <div className="search">
            <MdSearch className='search-icon' />
            <input value={inputSearch} onChange={(e)=>setInputSearch(e.target.value)}  placeholder='Type to search...'/>
        </div>
    )
}
export default Search;