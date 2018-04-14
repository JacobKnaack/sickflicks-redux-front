import React from 'react'

import ReviewList from './ReviewList'
import News from './News'

class Feed extends React.Component {
  render() {
    return(
      <div className='feedContainer'>
        <ReviewList />
        <News />
      </div>
    )
  }
}

export default Feed
