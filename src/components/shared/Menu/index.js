import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SearchDisplay from './SearchDisplay'

import { renderIf } from '../../../lib/util'
import './_menu.scss'

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      searchQuery: '',
      menuActive: false,
      scrollY: '',
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    let menuClasses = 'search-menu'
    let searchClasses = 'search-icons'
    if (this.state.menuActive) {
      menuClasses += ' active'
      searchClasses += ' active'
    }
    if (this.state.scrollY >= 200) {
      menuClasses += ' scrolled'
    }
    let uriEncodedQuery = this.state.searchQuery.split(' ').join('+')
    let anchorPoints = {
      google: `https://www.google.com/search?source=hp&ei=9OIzW-z0KejA0PEPg9yFwA8&q=${uriEncodedQuery}&oq=${uriEncodedQuery}`,
      twitter: `https://twitter.com/search?q=${uriEncodedQuery}&src=typd&lang=en`,
      reddit: `https://www.reddit.com/search?q=${uriEncodedQuery}&include_over_18=on&sort=relevance&t=all`,
      imdb: `https://www.imdb.com/find?ref_=nv_sr_fn&q=${uriEncodedQuery}&s=all`
    }

    return (
      <div className={menuClasses}>
        <div
          className='searchBar'
          onFocus={() => this.setState({ menuActive: true })}
          onBlur={() => {
            if (!this.state.searchQuery) {
              this.setState({ menuActive: false, })
            }
          }}
        >
          <i className="fas fa-search"></i>
          <input
            id='searchInput'
            type='text'
            name='searchQuery'
            placeholder='...Search'
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
          {renderIf(this.state.searchQuery,
            <SearchDisplay
              movies={this.handleSearch()}
            />
          )}
        </div>
        <div className={searchClasses}>
          <div className='search-menu-icon'>
            <i className="fab fa-imdb" onClick={() => this.handleSearchClick(anchorPoints.imdb)}></i>
          </div>
          <div className='search-menu-icon'>
            <i className="fab fa-reddit-square" onClick={() => this.handleSearchClick(anchorPoints.reddit)}></i>
          </div>
          <div className='search-menu-icon'>
            <i className="fab fa-twitter-square" onClick={() => this.handleSearchClick(anchorPoints.twitter)}></i>
          </div>
          <div className='search-menu-icon'>
            <i className="fab fa-google" onClick={() => this.handleSearchClick(anchorPoints.google)}></i>
          </div>
        </div>
      </div>
    )
  }

  handleScroll() {
    this.setState({
      scrollY: window.pageYOffset,
    });
  }

  handleInputChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSearchClick(url) {
    if (this.state.searchQuery) {
      window.open(url, '_blank')
    } else alert('please submit a query in the search bar')
  }

  handleSearch() {
    // this function needs to search for reviews on the backend
    const results = []
    this.props.movieData.map(movie => {
      const movieName = movie.name.toLowerCase()
      const searchTerm = this.state.searchQuery.toLowerCase()
      if (movieName.indexOf(searchTerm) !== -1) {
        results.push(movie)
      }
    })
    return results
  }
}

const mapStateToProps = state => ({
  movieData: state.movies.data,
})

Menu.propTypes = {
  movieData: PropTypes.array,
}

export default connect(
  mapStateToProps,
  null,
)(Menu)