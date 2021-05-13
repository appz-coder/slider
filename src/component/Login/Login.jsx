import React from "react";
import {Field, reduxForm} from "redux-form";
import "./Login.css"
import {Redirect} from "react-router-dom";


let LoginForm = (props) => {
    return (

    <form onSubmit={props.handleSubmit}className="form-signin login_form">
        <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
        </div>
        <div className="form-label-group">

           <Field component="input" name="username" type="text" id="inputEmail" className="form-control mb-4" placeholder="your name" required=""
                   autoFocus=""/>

        </div>

        <div className="form-label-group">
            <Field name="password" component="input" type="password" id="inputPassword" className="form-control mb-4" placeholder="Password" required=""/>

        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted text-center">© 2017-2018</p>
    </form>
    )
}

let LoginFormRedux = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)


const  Login= (props) => {

   let onSubmit = (formData) => {

        console.log(formData);
        let {username, password} = formData;


    }

        // if(props.isAuth) return <Redirect to={'/home'}/>
        return (<div>
            <LoginFormRedux onSubmit={onSubmit}/>
        </div>)
    }


export default Login;