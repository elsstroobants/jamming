import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);

    this.state = { searchResults: [
                                  { name: 'Bohemian Rhapsody',
                                    artist: 'Queen',
                                    album: 'A night at the Opera',
                                    id: 123},
                                  { name: 'Summer of 69',
                                    artist: 'Brian Adams',
                                    album: 'it doesnt matter',
                                    id:234},
                                  { name: 'You stink',
                                    artist: 'The smelly bums',
                                    album: 'Toilet time',
                                    id:345}
                    ],
                    playlistName: 'Elsies list',
                    playlistTracks: [
                                  { name: 'Only know you love her',
                                    artist: 'Passenger',
                                    album: 'Passengers album',
                                    id: 456,
                                    uri: 'bla'},
                                  { name: 'Rows of Houses',
                                    artist: 'Radiohead',
                                    album: 'Hello computer',
                                    id:567},
                                  { name: 'Night swimming',
                                    artist: 'REM',
                                    album: 'Automatic for the people',
                                    id:678}
                    ]
   }
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      const playlistTracks= this.state.playlistTracks;
      playlistTracks.push(track);
      this.setState({ playlistTracks : playlistTracks })
    }
  }

  removeTrack(track){
    const newPlaylistTracksAfterRemove = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({ playlistTracks : newPlaylistTracksAfterRemove })
  }

  updatePlaylistName(name){
    this.setState({ playlistName: name })
  }

  savePlaylist(){
    const trackURIs= this.state.playlistTracks.map(track => track.uri);
  }

  search(searchTerm){
    console.log(searchTerm);
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName = {this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );

  }
}

export default App;
