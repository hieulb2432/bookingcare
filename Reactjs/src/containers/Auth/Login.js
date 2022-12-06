import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = async (event) => {
        this.setState({ 
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({ 
            password: event.target.value
        })
    }

    handleLogin = async () => {
        console.log('abc')
        this.setState({
            errMessage: ''
        })
        let data = {}
        try {
            data = await handleLoginApi(this.state.username, this.state.password);
            console.log('check data', data)
            if(data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (err) {
            console.log(err)
            if(err.response) {
                if(err.response.data) {
                    this.setState({
                        errMessage: err.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
          this.handleLogin();
        }
      };

    render() {
        const { username, password, isShowPassword, errMessage } = this.state;
        return (
            <div className="login-background">
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' className='form-control' placeholder='Enter your username' value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            ></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control'
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(e) => {
                                        this.handleKeyDown(e);
                                      }}
                                ></input>
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    <i className= {this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className= 'col-12' style={{ color: 'red' }}>
                            {errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>

                        <div className='col-12 social-login'>
                            <i class="fab fa-google google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => {
            dispatch(actions.userLoginSuccess(userInfo));
          },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
