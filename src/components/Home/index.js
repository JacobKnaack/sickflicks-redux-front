import React from 'react'
import { connect } from 'react-redux'

import { fetchMovies } from '../../dux/movies'
import { fetchGenres } from '../../dux/tmdb'
import Menu from '../common/Menu'
import Feed from './Feed'
import './_home.scss'

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchGenres()
    this.props.fetchMovies()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
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

const mapDispatchToProps = {
  fetchMovies,
  fetchGenres,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
