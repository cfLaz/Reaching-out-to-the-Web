import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state={
        loadedPost: null,
        selectedPost: false, // [nedobro] ja dodao zbog delete, da ukloni novi post sa stranice a ne samo da posalje zahtjev za delete na server
    }

    componentDidUpdate() { //prvjerava da li je uopste ucitan neki post ili da li je ucitan post i da je taj post novi.
        if (this.props.id)
        if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){

        axios.get('posts/'+ this.props.id).then( response => {
                console.log(response);
                this.setState({loadedPost: response.data})
            });
        }
    } 
    deletePostHandler =() => {
        axios.delete('posts/'+ this.props.id).then(responde => {
            console.log(responde); 
       });
       this.setState({loadedPost: null,});
   /*      let post = <p style={{textAlign: 'center'}}>
            Please select a Post!
             </p>;
             return post; */
    }
    render () {
        let post = <p style={{textAlign: 'center'}}>
            Please select a Post!
            </p>;
        if (this.props.id ){
            post= <p style={{textAlign: 'center'}}>Loading...!</p>;
        }

        if(this.state.loadedPost ){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                        className="Delete" 
                        onClick={this.deletePostHandler}>
                            Delete
                        </button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;