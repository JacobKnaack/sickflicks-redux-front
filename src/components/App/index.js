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
    const appStyles = {
      width: '100%',
      backgroundColor: '#01FFC4',
      minHeight: '100vh',
    }

    const headerStyles = {
      width: '100%',
      zIndex: '5',
      height: '200px',
      background: 'linear-gradient(#d74898, #01ffc4)',
    }

    const logoStyle = {
      position: 'absolute',
      width: '275px',
      left: '50vw',
      marginLeft: '-137.5px',
    }

    const subtitleStyle =  {
      position: 'relative',
      top: '150px',
      fontFamily: "'Libre Barcode 39 Text', cursive",
      color: '#2f4f4f',
      fontSize: '50px',
      textAlign: 'center',
    }

    const menuBtnStyle = {
      position: 'fixed',
      zIndex: '7',
      top: '10px',
      left: '10px',
      color: '#2f4f4f',
      fontSize: '150%',
    }

    const MdbLogoStyling = {
      width: '75px',
      position: 'absolute',
      right: '10px',
      top: '10px',
    }

    let navigationMenuClasses = 'navigationMenu'
    if (this.state.navMenu) {
      navigationMenuClasses += ' active'
    }

    return(
      <div className='app container' style={appStyles} >
        <nav className={navigationMenuClasses}>
          <Link to='/member' onClick={this.toggleNavigation}>
            <div className='navItem'>
              <i className="fas fa-user-secret"></i>
              <h4>Member Area</h4>
            </div>
          </Link>
          <Link to='/' onClick={this.toggleNavigation}>
            <div className='navItem'>
              <i className="fas fa-home"></i>
              <h4>Home</h4>
            </div>
          </Link>
        </nav>
        <i
          style={menuBtnStyle}
          className="fas fa-bars"
          onClick={this.toggleNavigation}
        ></i>
        <header className='appHeader' style={headerStyles}>
          <img style={logoStyle} src={Logo} alt='SFNP' />
          <h3 style={subtitleStyle}>Movie Reviews</h3>
          <img
            style={MdbLogoStyling}
            src='https://www.themoviedb.org/static_cache/v4/logos/powered-by-square-green-11c0c7f8e03c4f44aa54d5e91d9531aa9860a9161c49f5fa741b730c5b21a1f2.svg'
            alt='Powered By The Movie Database'
          />
        </header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/member' component={Member} />
          {/* <Route path='/flick/:reviewId' component={Flick} /> */}
          <Route path='/flick/:movieId' component={Flick} />
        </Switch>
        <h5 className='copyright'>SFNP 2018</h5>
      </div>
    )
  }

  toggleNavigation() {
    this.setState({ navMenu: !this.state.navMenu })
  }
}

export default App