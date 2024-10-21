import { useContext } from "react";
import { UserContext } from "../../context/user.context.jsx";
import './select.css'

function SelectUser() {
   const { userId, setUserId } = useContext(UserContext);

   function changeUser(e) {
      setUserId(Number(e.target.value));
   }

   return (
      <>
         <select className="select" name="user" id="user" value={userId} onChange={changeUser}>
            <option value="1">Антон</option>
            <option value="2">Вася</option>
         </select>
      </>
   );
}

export default SelectUser;
