import React,{ Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService.js";

class WelcomeComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            successMsg : ''
        }
        this.getCustomizedWelcomeMessage = this.getCustomizedWelcomeMessage.bind(this)
        this.handleSuccessResponse = this.handleSuccessResponse.bind(this) 
        this.handleErrorResponse = this.handleErrorResponse.bind(this)
    }
    render(){
        return(
            <>
                <h1>Welcome</h1>
                <div className="container">Welcome {this.props.params.name}. You can manage your todos click <Link to="/todos">here</Link></div>
                <div>Click here to get Customized Welcome message. 
                <button onClick={this.getCustomizedWelcomeMessage} className="btn btn-success">Get Welcome message</button></div>
                <div className="container">{this.state.successMsg}
                </div>
            </>
        )
    }

    getCustomizedWelcomeMessage(){
        //HelloWorldService.executeHelloWorldService()
        //HelloWorldService.executeHelloWorldBeanService()
        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
        .then(response => this.handleSuccessResponse(response))
        .catch(error => this.handleErrorResponse(error))

        
    }

    handleSuccessResponse(response){
        console.log(response)
       this.setState({
           successMsg : response.data.message
       })
    }

    handleErrorResponse(error){
        console.log(error.response)
        let errorMsg = ''
        if(error.message){
            errorMsg += error.message
        }

        if(error.response && error.response.data){
            errorMsg += error.response.data.message
        }
        
        this.setState({
            successMsg : errorMsg
        })
    }
}

export default WelcomeComponent;