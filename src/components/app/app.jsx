import React, {Component} from 'react';
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            todoData: [
                this.createTodoItem('Enter your task'),
            ],
            filter: 'all'
        };
        this.deleteItem = id => {
            this.setState(({todoData}) => {
                const index = todoData.findIndex(el => el.id === id);
                const newArray = [
                    ...todoData.slice(0, index),
                    ...todoData.slice(index + 1)
                ];
                return {
                    todoData: newArray
                }
            });
        };
        this.addItem = text => {
            const newItem = this.createTodoItem(text);

            this.setState(({todoData}) => {
                const newArray = [
                    ...todoData,
                    newItem
                ];

                return {
                    todoData: newArray
                };
            });
        };
        this.onToggleImportant = (id, label) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.togglePropertyImportant(todoData, id, 'important', label)
                }
            });
        };
        this.onToggleDone = id => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.togglePropertyDone(todoData, id, 'done')
                }
            });
        };
    };

    maxId = 1000;

    createTodoItem = label => ({
        label,
        important: false,
        done: false,
        id: this.maxId++
    });

    togglePropertyImportant(arr, id, propName, label) {
        const index = arr.findIndex((el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName], label: label};
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    }

    togglePropertyDone(arr, id, propName) {
        const index = arr.findIndex((el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    }

    static filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'not-done':
                return items.filter((item) => !item.done);
            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    };

    render() {

        const {todoData, filter} = this.state;
        const visibleItems = App.filter(todoData, filter);
        return (
            <div className="todo-app">
                <AppHeader/>
                <ItemAddForm onItemAdded={this.addItem}/>
                <div className="top-panel">
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
            </div>
        );
    }
};
