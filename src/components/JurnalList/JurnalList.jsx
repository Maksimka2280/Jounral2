import "./JurnalList.css";
import CardButton from "../CardButton/CardButton";
import JurnalItem from "../Journalitem/Jurnalitem";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";

function JurnalList({ items, setItem, delet }) {
  const { userId } = useContext(UserContext);


  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    } else {
      return 0;
    }
  };


  const filterItems = useMemo(() => {
    return items
      .filter((el) => el.userId === userId)
      .sort(sortItems);
  }, [items, userId]);

  console.log("Current userId:", userId);
  console.log("All items:", items);

  if (filterItems.length === 0) {
    return <p>Записей пока нету</p>;
  }

  return (
    <>
      {filterItems.map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JurnalItem title={el.title} post={el.post} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JurnalList;
