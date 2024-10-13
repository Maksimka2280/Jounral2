import { useCallback, useState } from "react";
import SelectUSer from "../SelectUser/SelectUser";
import Button from "../Button/button";
import Logo from "../Logo/Logo.jsx";

const logos = ['/Logo.png', '/vite.svg'];

function Header() {
   const [logoIndex, setLogoIndex] = useState(0); 

   const toggleLogo = () => {
    
      setLogoIndex(state => Number(!Boolean(state)));
   };

   const changUser = useCallback((e) => {
      setUserId(Number(e.target.value)); 
   }, []);

   return (
      <>
         <Logo image={logos[logoIndex]} />
         <SelectUSer changUser={changUser} />
         <Button onClick={toggleLogo}>change logo</Button>
      </>
   );
}

export default Header;