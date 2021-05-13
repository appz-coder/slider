import React from "react";
import {Field, reduxForm} from "redux-form";
import "./Login.css"
import {Redirect} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {presentationApi} from "../api/api";
import {loginUserData} from "../../redux/store/reducer/auth_reducer";
import {required} from "../ Validation/ValidationForm";
import {InputName} from "../ Validation/ FormsControl";


let LoginForm = (props) => {
    return (

    <form onSubmit={props.handleSubmit}className="form-signin login_form">
        <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
        </div>
        <div className="form-label-group">

           <Field component={InputName} name="username" type="text" id="inputEmail" className="form-control mb-4" placeholder="your name" required=""
              validate={required}     autoFocus=""/>

        </div>

        <div className="form-label-group">
            <Field name="password" component="input" type="password" id="inputPassword" className="form-control mb-4" placeholder="Password" required=""/>

        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted text-center">© Slider Club</p>
    </form>
    )
}

let LoginFormRedux = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)


const  Login= (props) => {
    const {isAuth} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
   let onSubmit = (data) => {
        let {username, password} = data;
       const formData = new FormData;
       formData.append('username', username)
       formData.append('password', password);
       presentationApi.login(formData).then(res=>{
           dispatch(loginUserData(res.data))
       })
    }

      if( isAuth) return <Redirect to={'/about'}/>
        return (<div>
            <LoginFormRedux onSubmit={onSubmit}/>
        </div>)
    }


export default Login;