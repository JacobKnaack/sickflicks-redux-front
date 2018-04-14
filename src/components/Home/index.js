import React from 'react'

import Menu from '../shared/Menu'
import Feed from './Feed'
import './_home.scss'

class Home extends React.Component {

  render() {
    return (
      <div className='home container'>
        <Menu />
        <Feed />
      </div>
    )
  }
}

export default Home
