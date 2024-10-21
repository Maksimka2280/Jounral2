import "./JournalForm.css";
import { useContext, useEffect, useReducer, useRef } from "react";
import Button from "../Button/button";
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from "./JournalForm.state.js";
import Input from "../Input/Input.jsx";
import { UserContext } from "../../context/user.context.jsx";

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { userId } = useContext(UserContext);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const focusError = (isValid) => {
    if (!isValid.title) {
      titleRef.current.focus();
    } else if (!isValid.date) {
      dateRef.current.focus();
    } else if (!isValid.post) {
      postRef.current.focus();
    }
  }

  useEffect(() => {
    let timer;
    if (!isValid.date || !isValid.post || !isValid.title) {
      timer = setTimeout(() => {
        focusError(isValid);
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isValid]);

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
    if (data) {
      dispatchForm({
        type: 'SET_VALUES', payload: {
          title: data.title,
          date: data.date,
          post: data.post,
          // Добавьте другие поля, если необходимо
        }
      });
    }
  }, [data]);

  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUES', payload: { [e.target.name]: e.target.value } });
  }

  return (
    <form className="journalform" onSubmit={addJournalItem}>
      <div className="form-header">
        <Input
          type="text"
          name="title"
          ref={titleRef}
          value={values.title || ''}
          onChange={onChange}
          appearance="title"
          isValid={isValid.title}
        />
        {data.id && (
          <button className={cn("delete")} type="button" onClick={() => onDelete(data.id)}>
            <img className="form-img--2" src="../public/icons8-мусорка.svg" alt="delete" />
          </button>
        )}

      </div>

      <div className={cn("from-row")}>
        <label htmlFor="date" className={cn("from-label")}>
          <img className="form-img" src="/icons8-calendar-50.png" alt="calendar-icon" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          name="date"
          ref={dateRef}
          value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
          isValid={isValid.date}
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>

      <textarea
        name="post"
        ref={postRef}
        value={values.post || ''}
        className={cn("textrea", { "invalid": !isValid.post })}
        onChange={onChange}
      />

      <Button>Save</Button>
    </form>
  );
}

export default JournalForm;
