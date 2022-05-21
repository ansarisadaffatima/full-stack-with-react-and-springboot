import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import withNavigation from './WithNavigation.jsx' 
import withParams from "./WithParams.jsx"; 
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import LoginComponent from "./LoginComponent.jsx";
import ListTodosComponent from "./ListTodosComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";

class TodoApp extends Component{

    render(){
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);

        // const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        return(
            <div className = "TodoApp">
                
                <Router>
                <HeaderComponent/>
                    <Routes>
                        {/*<Route path="/login" element={<LoginComponent/>}></Route>
        <Route path="/welcome" element={<WelcomeComponent/>}></Route>*/}

                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        {/*<Route path="/welcome" element={<WelcomeComponent />} />*/}
                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute>
                              <WelcomeComponentWithParams />
                            </AuthenticatedRoute>
                        } /> 
                            
                        <Route path="/todos" element={
                        <AuthenticatedRoute>
                            <ListTodosComponent />
                        </AuthenticatedRoute>
                        } />
                                                
                        <Route path="/logout" element={
                        <AuthenticatedRoute>
                            <LogoutComponent />
                        </AuthenticatedRoute>
                        } />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Login Failed</div>
//     }else{
//         return null
//     }

// }

// function ShowSuccessMsg(props){
//     if(props.showSuccessMsg){
//         return <div>Login Successful</div>
//     }else{
//         return null
//     }
// }
export default TodoApp;