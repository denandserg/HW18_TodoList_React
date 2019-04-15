import React from 'react';
import './todo-list-item.css';

const TodoListItem = (props) => {
        const { label, onDeleted, onToggleImportant, onToggleDone, important, done } = props;

        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }
        if (!important) {
            return (
                <span className={classNames}>
            <span
                className="todo-list-item-label"
                onClick={onToggleDone}
            >
            {label}
            </span>
                    <button type="button"
                            className="btn btn-mod"
                            onClick={onToggleImportant}>
                Edit
            </button>
                    <button type="button"
                            className="btn btn-mod"
                            onClick={onDeleted}>
                Delete
            </button>
        </span>
            );
        }
        else{
            const input = document.getElementById(props.id);
            if (input) {
                return (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input id={props.id}
                               type="text"
                               className='todo-list-item-label'
                               required
                        />
                        <button onClick={onToggleImportant}
                                className="btn btn-mod"
                        >Save
                        </button>
                        <button className="btn-disabled"
                                disabled
                        >Delete
                        </button>
                    </div>
                )
            } else {
                return (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input id={props.id}
                               type="text"
                               className='todo-list-item-label'
                               value={props.label}
                               required
                        />
                        <button onClick={onToggleImportant}
                                className="btn btn-mod"
                        >Save
                        </button>
                        <button className="btn-disabled"
                                disabled
                        >Delete
                        </button>
                    </div>
                )
            }
        }
};

export default TodoListItem;


