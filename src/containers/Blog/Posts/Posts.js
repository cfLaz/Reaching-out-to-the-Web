import React, { Component } from "react";
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
//import {Link} from 'react-router-dom';
import './Posts.css';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
    
    }
    componentDidMount () { //put wrong url to catch(error)
        //console.log(this.props);
        axios.get('/posts').then(response => {
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
        //this.setState({SelectedPostId: id});
        console.log(this.props.history);
        this.props.history.push({pathname: '/posts/' + id});
        //this.props.history.push({'/posts/' + id}); this would work too!
    }
    render() {

        let posts = <p style={{textAlign:'center'}}>Something went wrong! :( </p>;
            if(!this.state.error){
                posts = this.state.posts.map(
                post =>{
                    return (
                    // (commented out to show alternative approach (programmatically)) <Link to={'/posts/'+post.id} key={post.id}>
                        <Post 
                        key={post.id}
                        title={post.title}
                        author = {post.author}
                        clicked={()=> this.postSelectedHandler(post.id)}
                        //{...this.props} //passes any props Posts.js has, to Post component...but we can use withRouter 
                        />
                    //</Link>
                    )
                }
            );
            }

        return(
            
            <div>
                 <section className="Posts">
                {posts}

            </section>
            <Route
                path={this.props.match.url + '/:id'} /*"/posts/:id" /* /:id se ne dodaje na kraj trenutnog path-a, zato i ne bi prikazao fullpost i mora ici /posts/:id */
                exact
                component = {FullPost}
            />
            </div>
           
        );
    }
}

export default Posts;