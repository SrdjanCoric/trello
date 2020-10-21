import moment from "moment";
import { getCardById } from "../selectors/cardSelectors";

export const dueClass = (card) => {
  const diff = moment(card.dueDate).diff(new Date(), "days");

  if (card.completed) {
    return "completed";
  } else if (diff < -1) {
    return "overdue";
  } else if (diff < 0) {
    return "overdue-recent";
  } else if (diff < 1) {
    return "due-soon";
  } else {
    return "due-later";
  }
};

export const formatDueDate = (dueDate) => {
  const momentDate = moment(dueDate);
  let formatString;

  if (momentDate.toDate().getFullYear() === new Date().getFullYear()) {
    formatString = "MMM D";
  } else {
    formatString = "MMM D, YYYY";
  }

  let formatted = momentDate.format(formatString);

  return `${formatted}`;
};

export const findBoardId = (url, id, state) => {
  let boardId;
  let card;
  if (url.match(new RegExp("^/boards/"))) {
    boardId = id;
  } else {
    card = getCardById(state, id);
    if (card) {
      boardId = card.boardId;
    } else {
      boardId = null;
    }
  }
  return boardId;
};
