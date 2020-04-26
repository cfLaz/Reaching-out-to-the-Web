import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
//import axios from 'axios';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
import asyncComp from '../../hoc/AsyncComp';
//import NewPost from './NewPost/NewPost';

const AsyncNewPost = asyncComp(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    
    state= {
        auth: true,
    }
    
    render () {
        
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts/" 
                                exact
                                activeClassName='my-active' //'active' is default
                                activeStyle={{
                                    color: 'green',
                                    textDecoration: 'underline',
                                }}
                                >
                                    Posts
                                </NavLink>
                            </li>
                            <li><NavLink to={{
                                // pathname: this.props.mathc.url (gives current path that you're on)+'/new-post', - creates a relative path, otherwise it's 'absolute' path
                                pathname: '/new-post', //added '/' because otherwise it's not orange when it's active
                                //absolute path is always appended to the root domain

                                hash: '#submit', // would allow us to jump to any id submit we have
                                search: '?quick-submit=true'
                            }}>
                                New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* parsed from top to bottom */}
                {/* all routes are rendered if they match the path, to prevent that, we can use Switch */}
                
                <Switch> {/*Switch tells us to load just one route, first one that matches */}
                    {this.state.auth ?
                        <Route
                        path="/new-post"
                        component = {AsyncNewPost}
                        /> :
                        null
                    }
                    <Route
                    path="/posts"
                    component = {Posts}
                    />

                    <Route render={ ()=> <h1>Not found</h1>}/> {/* it will output this on the page in case any unknown path is used */}
                    {/* <Redirect from='/' to='/posts'/> */} {/* acting as a "guard" here, if author is not authenticated it will not reach /new-post but will get redirected to /posts */}
                </Switch>
                    {/* <Route 
                    path="/" //so that we redirect the user to posts compoenent eve if he is at the root of the path (can do it in Redirect ^^)
                    component = {Posts}
                    /> */}

                    {/* <Route
                    path="/:id" /* (^^ url:new-post) 
                    exact
                    component = {FullPost}
                    /> */}
                
                {/* <Route
                path="/" //tell router does the path start with this?
                exact //is complete path like this?
                render = {()=> <h1>Home</h1>} //what to render on the screen
                />
                <Route
                // no exact -> does path has this prefix (in this case '/')
                /> */}
            </div>
        );
    }
}

export default Blog;