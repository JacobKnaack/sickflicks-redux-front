import React from 'react'
import { connect } from 'react-redux'

import { fetchMovies } from '../../dux/movies'
import Menu from '../shared/Menu'
import Feed from './Feed'
import './_home.scss'

class Home extends React.Component {

  componentWillMount(){
    this.props.fetchMovies()
  }

  render() {
    return (
      <div className='home container'>
        <Menu />
        <Feed />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movies.data
})

export default connect(mapStateToProps, { fetchMovies })(Home)
