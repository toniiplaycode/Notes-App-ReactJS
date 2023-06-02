import { useContext } from "react";
import { noteListContext } from "../App";

const Header = () => {
    const { modeDark, setModeDark } = useContext(noteListContext);

    return(
        <div className="header">
            <div>
                <h1 className={modeDark && "dark-mode-text"}>Notes</h1>
            </div>
            <div>
                <button className="btn-toggle" onClick={()=>setModeDark(!modeDark)}>Toggle Mode</button>
            </div>
        </div>
    )
}

export default Header;
