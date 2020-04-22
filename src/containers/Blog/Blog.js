import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
//import axios from 'axios';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';

import NewPost from './NewPost/NewPost';


class Blog extends Component {
    
    
    
    render () {
        
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                // pathname: this.props.mathc.url (gives current path that you're on)+'/new-post', - creates a relative path, otherwise it's 'absolute' path
                                pathname: 'new-post', //absolute path is always appended to the root domain
                                hash: '#submit', // would allow us to jump to any id submit we have
                                search: '?quick-submit=true'
                            }}>
                                New Post
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <Route
                path="/"
                exact
                component = {Posts}
                />
                 <Route
                path="/new-post"
                component = {NewPost}
                />
                {/* <Route
                path="/" //tell router does the path start with this?
                exact //is complete path like this?
                render = {()=> <h1>Home</h1>} //what to render on the screen
                />
                <Route
                path="/" //tell router does the path start with this?
                // no exact -> does path had this prefix (in this case '/')
                render = {()=> <h1>Home2</h1>} //what to render on the screen
                /> */}
            </div>
        );
    }
}

export default Blog;