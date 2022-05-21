import React,{ Component } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : 'Alex',
            password : '',
            hasLoginFailed : false,
            showSuccessMsg : false
        }

        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    handleChange(event){
        console.log(event.target.value)

        this.setState({
            [event.target.name] : event.target.value 
        })
        
    }
    loginClicked(){
        if(this.state.username === 'Alex' & this.state.password === 'test'){
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.navigate(`/welcome/${this.state.username}`)
            // console.log("Successful Login")
            // this.setState({
            //     hasLoginFailed : false,
            //     showSuccessMsg : true
            // })
            
        }
            
        else{
            console.log("Failed Login")
            this.setState({
                hasLoginFailed : true,
                showSuccessMsg : false
            })
        }
        //console.log(this.state)
    }
    // handleUsernameChange(event){
    //     console.log(event.target.value)

    //     this.setState({
    //         username : event.target.value 
    //     })
        
    // }

    // handlePasswordChange(event){
    //     this.setState({
    //         password : event.target.value 
    //     })
    // }
    render(){
        return(
            <>
            <h1>Login</h1>
            <div className="container">
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}></ShowInvalidCredentials>
                <ShowSuccessMsg showSuccessMsg={this.state.showSuccessMsg}></ShowSuccessMsg>*/}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Login Failed</div>}
                {this.state.showSuccessMsg && <div>Login Successful</div>}
                User Name:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
            </>
        )
    }
}

export default LoginComponent;