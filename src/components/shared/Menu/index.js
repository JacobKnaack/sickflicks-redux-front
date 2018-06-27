import React from 'react'
import './_menu.scss'

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      searchQuery: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render() {
    let uriEncodedQuery = this.state.searchQuery.split(' ').join('+')

    return (
      <div className='menu container'>
        <div className='searchBar'>
          <i className="fas fa-search"></i>
          <input
            id='searchInput' 
            type='text'
            name='searchQuery'
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='homeMenu-icon'>
          <a href={`https://www.google.com/search?source=hp&ei=9OIzW-z0KejA0PEPg9yFwA8&q=${uriEncodedQuery}&oq=${uriEncodedQuery}`} target='_blank'>
            <i className="fab fa-google"></i>
          </a>  
        </div>
        <div className='homeMenu-icon'>
          <a href={`https://twitter.com/search?q=${uriEncodedQuery}&src=typd&lang=en`} target='_blank'>
            <i className="fab fa-twitter-square"></i>
          </a>
        </div>
        <div className='homeMenu-icon'>
          <a href={`https://www.reddit.com/search?q=${uriEncodedQuery}&include_over_18=on&sort=relevance&t=all`} target='_blank'>
            <i className="fab fa-reddit-square"></i>
          </a>
        </div>
        <div className='homeMenu-icon'>
          <a href={`https://www.imdb.com/find?ref_=nv_sr_fn&q=${uriEncodedQuery}&s=all`} target='_blank'>
            <i className="fab fa-imdb"></i>
          </a>
        </div>
      </div>
    )
  }

  handleInputChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
}

export default Menu