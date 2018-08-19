import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Logo from '../../asset/img/sfnp.svg'
import Home from '../Home'
import Member from '../Member'
import Flick from '../Flick'

import './_app.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navMenu: false,
    }

    this.toggleNavigation = this.toggleNavigation.bind(this)
  }

  render() {
    let navigationMenuClasses = 'navigationMenu'
    if (this.state.navMenu) {
      navigationMenuClasses += ' active'
    }

    let navItemClasses = (itemId) => {
      console.log(itemId == 'member' && window.location.href.includes('member'))
      console.log(itemId == 'home' && !window.location.href.includes('member'))
      if (itemId === 'member' && window.location.href.includes('member')) {
        return 'navItem active'
      }

      if (itemId === 'home' && !window.location.href.includes('member')) {
        return 'navItem active'
      }

      return 'navItem'
    }

    return (
      <div className='app container'>
        <nav className={navigationMenuClasses}>
          <Link to='/' onClick={this.toggleNavigation} style={{ textDecoration: 'none' }}>
            <div className={navItemClasses('home')}>
              <i className="fas fa-home"></i>
              <h4>Home</h4>
            </div>
          </Link>
          <Link to='/member' onClick={this.toggleNavigation} style={{ textDecoration: 'none' }}>
            <div className={navItemClasses('member')}>
              <i className="fas fa-user-secret"></i>
              <h4>Member Area</h4>
            </div>
          </Link>
        </nav>
        <div className='hamburger-button'>
          <i
            className="fas fa-bars hamburger-icon"
            onClick={this.toggleNavigation}
          />
        </div>
        <header className='appHeader'>
          <img
            className='headerLogo'
            src={Logo}
            alt='SFNP'
            onClick={() => window.location.href = '/'}
          />
          <h3 className='headerSubtitle'>Movie Reviews</h3>
          <img
            className='MdbLogo'
            src='https://www.themoviedb.org/assets/1/v4/logos/powered-by-square-green-11c0c7f8e03c4f44aa54d5e91d9531aa9860a9161c49f5fa741b730c5b21a1f2.svg'
            alt='Powered By The Movie Database'
            onClick={() => window.location.href = 'https://www.themoviedb.org'}
          />
        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/member' component={Member} />
          <Route path='/flick/:movieId' component={Flick} />
        </Switch>
        <h5 className='copyright'>SFNP 2018</h5>
        <div id='bottom-color' />
      </div>
    )
  }

  toggleNavigation() {
    this.setState({ navMenu: !this.state.navMenu })
  }
}

export default App