import React from 'react';


const clientId='9a61b4daa7a449a09cb883f8dbd8480f';
const redirectURI= 'http://localhost:3000/';
const accessToken = getAccessToken();

function getAccessToken(){

  const accessTokenFromURL = window.location.href.match('#access_token=([^&]*)&');
  const expiresInFromURL = window.location.href.match('&expires_in=([^&]*)');

  if(accessToken){
    return accessToken;

  } else if (accessTokenFromURL && expiresInFromURL) {

    // Set expire time for access token
    window.setTimeout(() => accessToken = '', expiresInFromURL[1] * 1000);

    // Clear access token from URL
    window.history.pushState('Access Token', null, '/');
    return accessTokenFromURL[1];

  } else {
    // Access token is empty and is not in url
    window.location = 'https://accounts.spotify.com/authorize?client_id='+clientId+'&response_type=token&scope=playlist-modify-public&redirect_uri='+redirectURI;

  }
};

const Spotify = {
  search(searchTerm){
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
       {headers: {Authorization: `Bearer ${accessToken}`}}
    ).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
      }, networkError=> console.log(networkError.message)
    ).then(jsonResponse => {
      // code to execute with jsonResponse
      const result = jsonResponse.tracks.items.map(track => {return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }})
      return result;
    })
  },

  savePlaylist (playlistName, trackURIs) {
    console.log("Save playlist: " + playlistName, trackURIs);
    if(!playlistName || !trackURIs){
      return;
    } else {
      let userId;
      let playlistId;
      fetch(`https://api.spotify.com/v1/me`, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
          if(response.ok) {
            return response.json();
          }
          throw new Error('Fetching user id failed!');
        }, networkError=> console.log(networkError.message)
      ).then(jsonResponse => {
        userId = jsonResponse.id;
        console.log("userId = " + userId)

        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: playlistName})
        }).then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Creating playlist failed!');
          }, networkError=> console.log(networkError.message)
        ).then(jsonResponse => {
          playlistId = jsonResponse.id;
          console.log("Playlist id = " + playlistId)

          fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({uris: trackURIs})
          }).then(response => {
              if(response.ok) {
                return response.json();
              }
              throw new Error('Adding tracks to playlist failed!');
            }, networkError=> console.log(networkError.message)
          ).then(jsonResponse => {
            console.log('Tracks added to playlist', jsonResponse);
          })
        })
      })
    }
  }

};



export default Spotify;
