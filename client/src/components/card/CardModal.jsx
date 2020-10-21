import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { dueClass, formatDueDate } from "../../utils/helpers";

const CardModal = (props) => {
  const labels = (card) =>
    card.labels.map((label, idx) => (
      <div
        className="member-container"
        key={idx}
        onClick={(e) => props.onShowPopover(e, "labels")}
      >
        <div className={`card-label ${label} colorblindable`}></div>
      </div>
    ));
  const dueDateClass = dueClass(props.card);
  const formattedDueDate = formatDueDate(props.card.dueDate);

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${props.card.boardId}`}>
          {" "}
          <i className="x-icon icon close-modal"></i>
        </Link>
        {props.card.archived ? (
          <div className="archived-banner">
            <i className="file-icon icon"></i>
            This card is archived.
          </div>
        ) : null}
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea
            name="title"
            className="list-title"
            defaultValue={props.title}
            style={{ height: "45px" }}
          />

          <p>
            in list{" "}
            <a
              className="link"
            >
              {props.list.title}
            </a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                {props.card.labels.length > 0 ? (
                  <li className="labels-section">
                    <h3>Labels</h3>
                    {labels(props.card)}
                    <div
                      className="member-container"
                    >
                      <i className="plus-icon sm-icon"></i>
                    </div>
                  </li>
                ) : null}
                {props.card.dueDate ? (
                  <li className="due-date-section">
                    <h3>Due Date</h3>
                    <div
                      id="dueDateDisplay"
                      className={dueDateClass}
                    >
                      <input
                        id="dueDateCheckbox"
                        type="checkbox"
                        className="checkbox"
                        defaultChecked={props.card.completed}
                      />
                      {formattedDueDate}
                    </div>
                  </li>
                ) : null}
              </ul>
              <form className="description">
                  <p>Description</p>
                  <span id="description-edit" className="link">
                    Edit
                  </span>
                  <p className="textarea-overlay">Some desc...</p>
                  )
                </form>
            </li>
            <li className="comment-section">
            <h2 className="comment-icon icon">Add Comment</h2>
              <div>
                <div className="member-container">
                  <div className="card-member">TP</div>
                </div>
                <div className="comment">
                  <label>
                    <textarea
                      required=""
                      rows="1"
                      placeholder="Write a comment..."
                    ></textarea>
                    <div>
                      <a className="light-button card-icon sm-icon"></a>
                      <a className="light-button smiley-icon sm-icon"></a>
                      <a className="light-button email-icon sm-icon"></a>
                      <a className="light-button attachment-icon sm-icon"></a>
                    </div>
                    <div>
                      <input
                        type="submit"
                        className="button"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </li>
            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>
              <ul className="modal-activity-list">                <li>
                <div className="member-container">
                  <div className="card-member">TP</div>
                </div>
                <h3>Taylor Peat</h3>
                <div className="comment static-comment">
                  <span>The activities are not functional.</span>
                </div>
                <small>
                  22 minutes ago - <span className="link">Edit</span> -{" "}
                  <span className="link">Delete</span>
                </small>
                <div className="comment">
                  <label>
                    <textarea defaultValue="                      The activities have not been implemented yet." required="" rows="1" />
                    <div>
                      <a className="light-button card-icon sm-icon"></a>
                      <a className="light-button smiley-icon sm-icon"></a>
                      <a className="light-button email-icon sm-icon"></a>
                    </div>
                    <div>
                      <p>You haven't typed anything!</p>
                      <input
                        type="submit"
                        className="button not-implemented"
                        value="Save"
                      />
                      <i className="x-icon icon"></i>
                    </div>
                  </label>
                </div>
              </li>

              </ul>
            </li>
          </ul>
        </section>

        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li
              className="label-button"
            >
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li
              className="date-button"
            >
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li
              className="move-button"
            >
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li
              className="copy-button"
            >
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            {props.card.archived ? (
              <div>
                <li
                  className="unarchive-button"
                >
                  <i className="send-icon sm-icon"></i>Send to board
                </li>
                <Link to={`/boards/${props.card.boardId}`}>
                  <li className="red-button">
                    <i className="minus-icon sm-icon"></i>Delete
                  </li>
                </Link>
              </div>
            ) : (
              <li className="archive-button">
                <i className="file-icon sm-icon "></i>Archive
              </li>
            )}
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CardModal;
