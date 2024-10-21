import { useCallback, useState } from "react";
import SelectUSer from "../SelectUser/SelectUser";
import Button from "../Button/button";
import Logo from "../Logo/Logo.jsx"; 

const logos = ['/Logo.png', '/vite.svg'];

function Header() {
   const [logoIndex, setLogoIndex] = useState(0); 
   const [secondIndex, setSecondIndex] = useState(0); 

   const toggleLogo = () => {
    
      setLogoIndex(state => Number(!Boolean(state)));
      setSecondIndex(i => i + 1);
      console.log(secondIndex);
   };

   const changUser = useCallback((e) => {
      setUserId(Number(e.target.value)); 
    
      
   }, []);

   return (
      <>
         <Logo image={logos[logoIndex]} />
         <SelectUSer  changUser={changUser} />
         {/* <Button onClick={toggleLogo}>change logO</Button> */}
      </>
   );
}

export default Header;
