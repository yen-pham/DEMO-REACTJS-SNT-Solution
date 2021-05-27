import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../redux/action';
import './index.css'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state= {
      id: "",
      secret:"",
    }
  }
  
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  login = () => {
    this.props.login(this.state.id,this.state.secret);

    // if(this.state.id.trim() && this.state.secret.trim()) {
    // }
    // else this.setState({status:"Vui lòng không để trống!"});
  }
    render() {
      console.log(this.state);
        return (
            <div className="height-100">
                <div className="login-form height-100"> 
                    <form className="form">
                        <h2>LOGIN</h2>
                      <div className="form-item">
                        {/* <label htmlFor="Id">Id</label> */}
                        <input type="text" className="form-input" id="id" placeholder="Id" name="id" onChange={(event=> this.onChange(event))}/>
                      </div>
                      <div className="form-item">
                        {/* <label htmlFor="Secret">Secret</label> */}
                        <input type="text" className="form-control" id="secret" placeholder="Secret" name="secret" onChange={(event=> this.onChange(event))}/>
                      </div>
                      <div className="form-item">
                        <p className="form-text-error">{this.props.status}</p>
                      </div>
                      <div className="form-item"><button onClick={()=> this.login()} type="button">LOGIN</button></div>
                      
                    </form>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return({
  status: state?.loginStatus,
  // isAuthen : state?.isAuthen
})};
const mapDispatchToProps = (dispatch) => {
  return {  
    login: (id,secret) => dispatch(loginAction(id,secret)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);