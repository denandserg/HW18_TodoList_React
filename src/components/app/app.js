import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component  {
    maxId = 1000;
    constructor() {
        super();
        this.state = {
            todoData: [
                this.createTodoItem('Learn JS'),
                this.createTodoItem('Learn C#'),
                this.createTodoItem('Learn React'),
            ],
            filter: 'all'
        };
        this.deleteItem = (id) => {
           this.setState(({ todoData }) => {
               const index = todoData.findIndex((el)=>el.id === id);
               const newArray = [
                   ...todoData.slice(0,index),
                   ...todoData.slice(index+1)
               ];
               return {
                   todoData: newArray
               }
           });
        };
        this.addItem = (text) => {
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
        this.onToggleImportant = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                }
            });
        };
        this.onToggleDone = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            });
        };
    };

    createTodoItem  (label)  {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    toggleProperty (arr, id, propName) {
        const index = arr.findIndex((el)=>el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0,index),
            newItem,
            ...arr.slice(index+1)
        ];
    }

    static filter (items, filter) {
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
        this.setState ({filter})
    };

    render() {

        const { todoData, filter } = this.state;
        const visibleItems = App.filter(todoData, filter);
        return (
            <div className="todo-app">
                <AppHeader />
                <ItemAddForm onItemAdded={this.addItem}/>
                <div className="top-panel d-flex" style={{justifyContent: 'flex-end'}}>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant}
                    onToggleDone={ this.onToggleDone }
                />
            </div>
        );
    }
};
