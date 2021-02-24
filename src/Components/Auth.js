import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../redux/reducer';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = (e) => {
        e.preventDefault();

        axios.post('/api/login', {email: this.state.email, password: this.state.password})
        .then(res => {
            //Sets the returned user data to the redux store state
            this.props.loginUser(res.data)

            //pushes us to the dashboard if we had a successful response
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    register = (e) => {
        e.preventDefault();

        axios.post('/api/register', {email: this.state.email, password: this.state.password})
        .then( res => {
            //Sets the returned user data to the redux store state
            this.props.loginUser(res.data)

            //pushes us to the dashboard if we had a successful response
            this.props.history.push('/dashboard')
        })
        .catch( err => console.log(err))
    }

    render(){
        const {email, password} = this.state;

        return (
            <main className='auth-flex'>
                <form className='auth-form'>
                    <input name='email' placeholder='Email' value={email} onChange={e => this.handleInput(e)}/>
                    <input type='password' name='password' placeholder='Password' value={password} onChange={e => this.handleInput(e)}/>
                    <button onClick={e => this.login(e)}>Log In</button>
                    <button onClick={e => this.register(e)}>Register</button>
                </form>
            </main>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {loginUser})(Auth);