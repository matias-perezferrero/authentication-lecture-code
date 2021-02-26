import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import {clearUser} from '../redux/reducer';
import {Redirect} from 'react-router-dom'

const Dashboard = props => {

    const logout = () => {
        axios.get('/api/logout')
        .then(res => {
            //clear the user from redux
            props.clearUser()

            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    if(!props.user.email) {
        return <Redirect to="/" />
    }

    const createPost = () => {
        axios.post('/api/posts').catch(err => console.log(err))
    }

    return (
        <main className='dashboard'>
            <section className='user-info'>
                <h3>{props.user.email}</h3>
                <button onClick={logout}>Log Out</button>
                <button onClick={createPost}>Create Post</button>
            </section>
        </main>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser})(Dashboard);