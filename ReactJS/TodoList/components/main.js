import React from 'react';
import {AddNewTask} from '../components/addtask';
import {ToDoAppList} from '../components/applist'

class Todo extends React.Component{
    constructor(props){
        super();
        this.state ={tasks: props.tasks};
        this.updateList = this.updateList.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    updateList(text){
        const updatedTasks = this.state.tasks;
        updatedTasks.unshift(text);  //unshift前段新增 push後端新增 shfit前端刪除 pop後端刪除
        this.setState({tasks: updatedTasks});
        this.updateLocalStorage(updatedTasks);
    }

    removeTask(text){
        const updatedTasks = this.state.tasks;
        updatedTasks.splice(updatedTasks.indexOf(text),1);
        this.setState({tasks: updatedTasks});
        this.updateLocalStorage(updatedTasks);
    }

    updateLocalStorage(updatedTasks){
        console.log('Saved the tasks');
        localStorage.setItem('storedTasks', JSON.stringify(updatedTasks));
    }

    render(){
        return(
            <div>
                <h1>ToDo List</h1>
                <AddNewTask updateList={this.updateList}/>
                <ToDoAppList tasks={this.state.tasks} remove={this.removeTask}  />
            </div>
        )
    }
}

export {Todo};