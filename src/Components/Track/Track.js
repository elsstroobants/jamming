import React from 'react';
import './Track.css';

class Track extends React.Component {

  renderAction(){
    const isRemoval = true;
    if(isRemoval){
      return '-';
    } else {
      return '+';
    }
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.name}</h3>
          <p>{this.artist} | {this.album}</p>
        </div>
        <a className="Track-action">{this.renderAction}</a>
      </div>
    )
  }
}

export default Track;
