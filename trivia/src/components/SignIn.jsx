import React from "react";
import {Link, Redirect} from "react-router-dom";
import constants from "../constants";
import firebase from "firebase";
import "firebase/auth"
export default class SignInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: null
        };
    }
    handleSubmit(evt) {
        evt.preventDefault();
        console.log("signing in user with credentials: %s, %s", this.state.email, this.state.password);
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email,this.state.password)
        .catch(function(error) {
            console.log(error.code + ": " + error.message );
            // know that the error occured
            // display error to user using a Component
            this.setState({errorMessage: error.message})
        }.bind(this))
        .then(() => this.setState({authenticated: true}));
    }
    

    render() {
        if (this.state.authenticated) {
            return (<Redirect to="channels" />)
        }

        return (
            <div className="container">
                <h1>Sign In</h1>
                {
                    this.state.errorMessage &&
                    <p className="alert alert-danger">{this.state.errorMessage}</p>    
                }
                <form onSubmit={evt => this.handleSubmit(evt)}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input id="email" type="email" className="form-control" 
                        placeholder="enter your email address"
                        value={this.state.email}
                        onInput={evt => this.setState({email: evt.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" className="form-control"
                        placeholder="enter your password" 
                        value={this.state.password}
                        onInput={evt => this.setState({password: evt.target.value})}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" onClick={e => this.handleSubmit(e)}>>
                            Sign In
                        </button>
                    </div>
                </form>
                 <p>Don't yet have an account? <Link to={constants.routes.signup}>Sign Up!</Link></p>
                 <Link to="/channels/general">chanName</Link>
            </div>
        );
    }
}