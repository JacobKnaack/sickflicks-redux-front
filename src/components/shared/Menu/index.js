import React from 'react'
import './menu.scss'

class Menu extends React.Component {

  render() {
    return (
      <div className='menu container'>
        <div className='searchBar'>
          <input id='searchInput' type='text' placeholder='Search:'/>
        </div>
      </div>
    )
  }
}

export default Menu