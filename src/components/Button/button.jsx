import "./Button.css";
import { useState } from "react";
function Button({ children, onClick }) {
    // let text = "Сохранить";
    // const [text, setText] = useState('Сохранить')

    // const clicked = () => {
    //     setText("Закрыть");
    //     console.log("HI");
    // }
    return (
        <button className="button accent" onClick={onClick}>{children}</button>
    );
}
export default Button; 