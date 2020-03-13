import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    }
    componentDidMount () { //put wrong url to catch(error)
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
            console.log('componentDidMount')
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Laz'
                }
            });

            this.setState({posts: updatedPosts})
            //console.log(response)
        }).catch(error=>{
            //consolelog(error);
            this.setState({error: true});
        });
    }
    postSelectedHandler=(id)=> {
        this.setState({SelectedPostId: id});
    }
    render () {
        let posts = <p style={{textAlign:'center'}}>Something went wrong! :( </p>;
        if(!this.state.error){
            posts = this.state.posts.map(
            post =>{
                return <Post 
                title={post.title}
                key={post.id}
                author = {post.author}
                clicked={()=> this.postSelectedHandler(post.id)}
                />
            }
        );
        }
        return (
            <div>
                <section className="Posts">
                    {posts}

                </section>
                <section>
                    <FullPost 
                    id={this.state.SelectedPostId}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;