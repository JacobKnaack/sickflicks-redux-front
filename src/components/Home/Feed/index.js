import React from 'react'

import MovieList from './MovieList'
import News from './News'

class Feed extends React.Component {
  render() {
    return(
      <div className='feedContainer'>
        <MovieList />
        <News />
      </div>
    )
  }
}

export default Feed
