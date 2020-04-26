import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
import {Redirect} from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false,
    }
    componentDidMount () {
        // alternative to if user is unauthenticated => this.props.history.replace('/posts');
        console.log(this.props);
    }
    postDataHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author,
        };

        axios.post('/posts', post).then(response=>{
            console.log(response);
            this.props.history.push('/posts');
            // .replace() would do the same as <Redirect> , which will replace the page in the "stack" and we won't be able to come back (<- or backspace) to newPost, with push() we can, because it just pushed a new page on top of the stack (doesn't replace it).
            //this.setState({submitted: true});
        });
        
    }
    render () {
        let redirect = null;
        if(this.state.submitted){//never rans because we put history.push() in postDataHandler
            redirect = <Redirect to="/posts"/>;
        }
        return (
            <div className="NewPost">
                {redirect}
                {/* <Redirect to="/posts"/> */} {/* Can't use 'from' because we are not in <Switch> */}
                <h1>Add a Post</h1>
                
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />

                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />

                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}> Add Post</button>
            </div>
        );
    }
}

export default NewPost;