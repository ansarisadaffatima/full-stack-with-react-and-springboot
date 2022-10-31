import React,{ Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos : [
                // {id : 1, description : 'Learn React', done : false, targetDate : new Date()},
                // {id : 2, description : 'Learn HTML', done : false, targetDate : new Date()},
                // {id : 3, description : 'Learn Java', done : false, targetDate : new Date()}
            ],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount(){
        console.log('componentDidMount')
        this.refreshTodos()
        console.log(this.state)
        
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({
                    todos : response.data
                })
            }
        )
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProp, nextState){
        console.log('shouldComponentUpdate')
        return true
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUsername();
        //console.log(id + " "+ username)
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({message : `Delete of todo ${id} success`})
                this.refreshTodos()
            }
        )
    }

    updateTodoClicked(id){
        console.log('Update')
        this.props.navigate(`/todos/${id}`)
       
    }

    addTodoClicked(){
        console.log('Add')
        this.props.navigate(`/todos/-1`)
       
    }
    render(){
        console.log('render')
        return(
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Done</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate.toString()).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>    
                    </div>
                </div>
            </div>
        )
    }
}
export default ListTodosComponent;