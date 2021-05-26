import React, { Component } from 'react';
import './index.css'
class Login extends Component {
    render() {
        return (
            <div className="height-100">
                <div className="login-form height-100"> 
                    <form className="form">
                        <h2>LOGIN</h2>
                      <div className="form-item">
                        {/* <label htmlFor="Id">Id</label> */}
                        <input type="text" className="form-input" id="Id" placeholder="Id" />
                      </div>
                      <div className="form-item">
                        {/* <label htmlFor="Secret">Secret</label> */}
                        <input type="text" className="form-control" id="Secret" placeholder="Secret" />
                      </div>
                      <div className="form-item"><button>LOGIN</button></div>
                      
                    </form>
                    
                </div>
            </div>
        );
    }
}

export default Login;