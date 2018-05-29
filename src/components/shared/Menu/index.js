import React from 'react'
import './menu.scss'

class Menu extends React.Component {

  render() {
    return (
      <div className='menu container'>
        <div className='searchBar'>
          <i className="fas fa-search"></i>
          <input id='searchInput' type='text' />
        </div>
      </div>
    )
  }
}

export default Menu