import React, { Component } from 'react';
import Login from './component/login'
import { connect } from 'react-redux';
import { checkAuthenAction, getAnimalsAction } from './redux/action';
import "./App.css"
import Animals from './component/animals';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.checkAuthen();
  }
  
  render() {
    return this.props.isAuthen? <Animals/>:<Login/>
  }
}
const mapStateToProps = (state) => {
  return({
  loading: state?.loading,
  isAuthen : state?.authen
})};
const mapDispatchToProps = (dispatch) => {
  return {  
    checkAuthen: () => dispatch(checkAuthenAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
