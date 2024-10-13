import "./JournalForm.css";
import { useContext, useEffect, useReducer, useRef } from "react";
import Button from "../Button/button";
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from "./JournalForm.state.js";
import Input from "../Input/Input.jsx"
import { UserContext } from "../../context/user.context.jsx";

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { userId } = useContext(UserContext);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRrf = useRef();
  const date = useRef();
  const post = useRef();


  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRrf.current.focus();
        break;

      case !isValid.date:
        date.current.focus();
        break;

      case !isValid.post:
        post.current.focus();
        break;

      default:
        break;
    }

  }


  useEffect(() => {
    let timer;
    if (!isValid.date || !isValid.post || !isValid.title) {
      timer = setTimeout(() => {
        focusError(isValid)
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isValid.date, isValid.post, isValid.title]);


  useEffect(() => {
    if (isFormReadyToSubmit) {
      console.log("Форма готова к отправке", values);
      onSubmit(values);
      dispatchForm({ type: "RESET_FORM" });
    }
  }, [isFormReadyToSubmit, onSubmit, values]);

  const addJournalItem = (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    formProps.userId = userId;

    dispatchForm({ type: 'SUBMIT', payload: formProps }); 


  };
  useEffect(() => {
    dispatchForm({ type: 'SET_VALUES', payload: { userId } });
  }, [userId]);

  const onCanhg = (e) => {
    dispatchForm({ type: 'SET_VALUES', payload: { [e.target.name]: e.target.values } })
  }

  useEffect(() => {
    console.log("Проверка isValid:", isValid);
    console.log("Проверка isFormReadyToSubmit:", isFormReadyToSubmit);
  }, [isValid, isFormReadyToSubmit]);

  return (

    <form className="journalform" onSubmit={addJournalItem}>

      <div>
        <Input
          type="text"
          name="title"
          ref={titleRrf}
          appearance='title'
          isValid={isValid.title}
        />
      </div>
      <div className={cn("from-row")}>
        <label htmlFor="date" className={cn("from-label")}>
          <img className="form-img" src="/icons8-calendar-50.png" alt="calendar-icon" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          name="date"
          ref={date}
          isValid={isValid.date}

        />
      </div>
      <div className={cn("from-row")}>
        <label htmlFor="tag" className={cn("from-label")}>
          <img className="form-img" src="/icons8-folder-32.png" alt="folder-icon" />
          <span>Метки</span>
        </label>
        <Input
          id="tag"
          type="text"
          name="tag"

        />
      </div>
      <textarea
        name="post"
        ref={post}
        className={cn("textrea", { "invalid": !isValid.post })}
      />
      <Button >
        Save
        </Button>
    </form>
  )

}







export default JournalForm;
