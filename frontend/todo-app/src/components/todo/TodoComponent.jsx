import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import React,{Component} from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            id  : this.props.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){

        if (this.state.id === -1) {
          return;
        } else {
          let username = AuthenticationService.getLoggedInUsername();
          TodoDataService.retrieveTodo(username, this.state.id).then(
            (response) =>
              this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format(
                  "YYYY-MM-DD"
                ),
              })
          );
        }    
    }

    validate(values){
        let error = {}
        if(!values.description){
            error.description = 'Enter Description'
        }
        else if(values.description.length < 5){
            error.description = 'Enter atleast 5 character in Description'
        }

        if(!moment(values.targetDate).isValid){
            error.targetDate = 'Enter a Valid Date'
        }
        return error;
    }
    onSubmit(values){

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate,
        }

        if (values.id === -1) {
            let username = AuthenticationService.getLoggedInUsername();
            TodoDataService.createTodo(username,todo).then(() => this.props.navigate(`/todos`));

        } else {
          let username = AuthenticationService.getLoggedInUsername();
          TodoDataService.updateTodo(username, this.state.id, todo).then(() => this.props.navigate(`/todos`));
        }
    }
    render(){
        let {description,targetDate} = this.state
        //let targetDate = this.state.targetDate
        return (
            <div>
                    <h1>Todo</h1>
                    <div className="container">
                        <Formik initialValues={{description,targetDate}} onSubmit={this.onSubmit} validate={this.validate} enableReinitialize={true} validateOnBlur={false} validateOnChange={false}>
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                        <fieldset className="form-group">
                                            <label>description</label>
                                            <Field className="form-control" type="text" name="description" />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>
                                    </Form>
                                    )
                            }
                        </Formik>
                    </div>
               </div>
               )
    }
}

export default TodoComponent;