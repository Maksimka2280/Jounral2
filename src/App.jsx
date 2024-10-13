import "./App.css";
import JurnalItem from "./components/Journalitem/Jurnalitem";
import CardButton from "./components/CardButton/CardButton";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JurnalList from "./components/JurnalList/JurnalList";
import JurnalAdd from "./components/jurnalAdd/jurnalAdd";
import { useEffect, useState, useContext } from "react";
import JournalFrom from "./components/JournalForm/JournalForm";
import { useLocalStorege } from "./hooks/use-localstorege.hook.js";
import { UserContext, UserContextProvider } from "./context/user.context.jsx";

function App() {



  function mapItems(items) {
    if (!items) {
      return [];
    }
    return items.map(i => ({
      ...i,
      date: new Date(i.date)
    }));
  }

  const [items, setItems] = useLocalStorege('data');

  const addItem = item => {
    setItems([
      ...mapItems(items),
      {
        ...item,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
      }
    ]);
  };

  const sortItems = (a, b) => {
    return a.date - b.date;
  };

  let list = <p>Записей пока нету</p>;
  if (Array.isArray(items) && items.length > 0) {
    list = items.sort(sortItems).map(el => (
      <CardButton key={el.id}>
        <JurnalItem
          title={el.title}
          text={el.text}
          date={el.date.toString()}
        />
      </CardButton>
    ));
  }


  return (
    <>
      <UserContextProvider>
        <div className="app">
          <LeftPanel>
            <Header />
            <JurnalList items={mapItems(items)} />
          </LeftPanel>
          <Body>
            <JournalFrom onSubmit={addItem} /> { }
          </Body>
        </div>
      </UserContextProvider>

    </>


  );
}

export default App;
