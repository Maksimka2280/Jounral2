import "./JurnalList.css";
import CardButton from "../CardButton/CardButton";
import JurnalItem from "../Journalitem/Jurnalitem";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

function JurnalList({ items }) {
    const { userId } = useContext(UserContext);

    console.log("Current userId:", userId);
    console.log("All items:", items);

    
    if (items.length === 0) {
        return <p>Записей пока нету</p>;
    }

    const sortItems = (a, b) => {
        if (a.date < b.date) {
            return -1;
        } else if (a.date > b.date) {
            return 1;
        } else {
            return 0;
        }
    };


    return (
        <>
          {items
            .filter((el) => el.userId === userId) 
            .sort(sortItems)
            .map((el) => (
              <CardButton key={el.id}>
                <JurnalItem title={el.title} post={el.post} date={el.date} />
              </CardButton>
            ))}
        </>
      );
      
}

export default JurnalList;
