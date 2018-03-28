import React from 'react'
import News from './News'
import Menu from '../shared/Menu'
import MovieList from './MovieList'
import './_home.scss'

class Home extends React.Component {

  render() {
    return (
      <div className='home container'>
        <Menu />
        <MovieList />
        <News />
      </div>
    )
  }
}

export default Home
