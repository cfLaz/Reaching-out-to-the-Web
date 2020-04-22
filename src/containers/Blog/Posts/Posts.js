import React, { Component } from "react";
import axios from '../../../axios';
import Post from '../../../components/Post/Post';

class Posts extends Component {
    state = {
        posts: [],
    
    }
    componentDidMount () { //put wrong url to catch(error)
        console.log(this.props);
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
            console.log(error);
            //this.setState({error: true});
        });
    }

    postSelectedHandler=(id)=> {
        this.setState({SelectedPostId: id});
    }
    render() {

        let posts = <p style={{textAlign:'center'}}>Something went wrong! :( </p>;
            if(!this.state.error){
                posts = this.state.posts.map(
                post =>{
                    return <Post 
                    title={post.title}
                    key={post.id}
                    author = {post.author}
                    clicked={()=> this.postSelectedHandler(post.id)}
                    //{...this.props} //passes any props Posts.js has, to Post component...but we can use withRouter
                    />
                }
            );
            }

        return(
            <section className="Posts">
                {posts}

            </section>
        );
    }
}

export default Posts;