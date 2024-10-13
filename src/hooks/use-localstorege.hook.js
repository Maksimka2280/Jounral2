import { useState, useEffect } from "react";

export function useLocalStorege(key) {
    const [data, setData] = useState();

    useEffect(() => {
        try{
          const res = JSON.parse(localStorage.getItem(key));

        if (res) {
            setData(res);
        }   
        } catch {
            console.log('кароче я хз но что то не так с парсом данных');
            
        }
       
    }, [key]);

    const saveData = (newData) => {
        localStorage.setItem(key, JSON.stringify(newData)); 
        setData(newData);
    };

    return [data, saveData];
}
