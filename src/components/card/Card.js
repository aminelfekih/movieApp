import React from 'react';
import './Card.css';

class Card extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        likes: props.movie.likes,
        dislikes: props.movie.dislikes,
        liked: null
      };
      this.likeStyle = this.likeStyle.bind(this)
    }
    likeStyle() {
        if (this.state.liked === true) {
            return <a title="Like"  onClick={() => {this.setState({liked: false})}}><img src="https://www.freeiconspng.com/uploads/youtube-like-png-14.png" width="20" /></a>
        }
        else if(this.state.liked === false) {
            return <a title="disLike" onClick={() => {this.setState({liked: true})}}><img src="https://www.freeiconspng.com/uploads/youtube-dislike-transparent-background-17.png" width="22" /></a>
        }
        else {
            return <a title="null" onClick={() => {this.setState({liked: true})}}><img src="https://www.freeiconspng.com/uploads/black-like-icon-png-13.png" width="20" /></a>
        }
    }

    render(){
    const {likes, dislikes} = this.state;
    const movie = this.props.movie;
        return(
    <div className="Card">
      <h3>{movie.title}</h3>
      <h5 style={{textAlign: 'right'}}>{movie.category}</h5>
      <div className="like-dislike-ratio">
        <div className="like-button">
            <a title="Likes"><img src="https://www.freeiconspng.com/uploads/youtube-like-png-14.png" width="20" /> {likes} Likes</a>
        </div>
        <div className="dislike-button">            
            <a title="Dislikes"><img src="https://www.freeiconspng.com/uploads/youtube-dislike-transparent-background-17.png" width="25" /> {dislikes} Dislikes</a>
        </div>
      </div>
      <div className="toggle-like">
            {this.likeStyle()}
      </div>
      <div className="delButton">
        <button className="delete" onClick={() => {this.props.deleteHandle(movie.id);}}>
            Delete
        </button>
      </div>
    </div>
);
}
}

export default Card
