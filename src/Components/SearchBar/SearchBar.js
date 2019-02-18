import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.search=this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this);
  }

  handleTermChange(e){
    const searchTerm = e.target.value;
    this.search(searchTerm);
  }
//check point 71

  search(searchTerm){
    this.props.onSearch(searchTerm);
  }
//check point 69

  render (){
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
