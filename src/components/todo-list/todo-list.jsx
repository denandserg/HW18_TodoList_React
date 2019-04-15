import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ScrollArea from 'react-scrollbar';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {
    const elements = todos.map((item) => {
        const {id} = item;
        return (
            <ReactCSSTransitionGroup transitionName="anim"
                                     transitionAppear={true}
                                     transitionAppearTimeout={2000}
                                     transitionEnter={false}
                                     transitionLeave={true}>
                <li key={id}
                    className="list-group-item">
                    <TodoListItem
                        {...item}
                        onDeleted={() => onDeleted(id)}
                        onToggleImportant={() => {
                            let obj = document.getElementById(id);
                            if (obj) {
                                onToggleImportant(id,obj.value);
                            }
                            else {
                                onToggleImportant(id, item.label)
                            }
                        }
                        }
                        onToggleDone={() => onToggleDone(id)}
                    />
                </li>
            </ReactCSSTransitionGroup>
        );
    });

    return (
        <ul className="list-group todo-list">
            <ScrollArea
                speed={0.8}
                className="area"
                contentClassName="content"
                horizontal={false}
            >
                {elements}
            </ScrollArea>
        </ul>
    );
};

export default TodoList;
