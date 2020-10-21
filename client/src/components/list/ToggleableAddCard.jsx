import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import * as actions from "../../actions/CardActions";

const ToggleableAddCard = (props) => {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");

  const dispatch = useDispatch();

  const addCard = useCallback(
    (listId, card, callback) => {
      dispatch(actions.createCard(listId, card, callback));
    },
    [dispatch]
  );

  const handleAddCardClose = () => {
    resetTitle();
    props.onAddCardClose();
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    addCard(props.listId, { title }, resetTitle);
    props.onAddCardClose();
  };
  const cardClass = ["add-dropdown", "add-bottom"];
  if (props.openedAddCard) {
    cardClass.push("active-card");
  }
  return (
    <React.Fragment>
      <div className={cardClass.join(" ")}>
        <div className="card">
          <div className="card-info"></div>
          <textarea {...bindTitle} name="add-card"></textarea>
          <div className="members"></div>
        </div>
        <a className="button" onClick={handleAddCard}>
          Add
        </a>
        <i className="x-icon icon" onClick={handleAddCardClose}></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
      <div
        onClick={() => props.onAddCardClick(props.listId)}
        className="add-card-toggle"
        data-position="bottom"
      >
        Add a card...
      </div>
    </React.Fragment>
  );
};

export default ToggleableAddCard;
