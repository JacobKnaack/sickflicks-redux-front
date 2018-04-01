import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../dux/member'
import MovieForm from './MovieForm'
import MemberMenu from './MemberMenu'

import * as util from '../../lib/util'
import './_member.scss'

class Member extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      movieFormOpen: false,
      menuSelected: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleMovieForm = this.toggleMovieForm.bind(this)
    this.menuSelect = this.menuSelect.bind(this)
    this.login = this.login.bind(this)
  }

  // componentWillMount() {
  //   console.log(this.props)
  // }

  render() {
    return (
      <div className='member'>
        {util.renderEither(this.props.accessToken,
          <div className='memberArea'>
            <h2 className='username'>Welcome <span>{this.state.username}</span></h2>
            {util.renderIf(!this.state.menuSelected,
              <MemberMenu
                toggleMovieForm={this.toggleMovieForm}
                menuSelect={this.menuSelect}
              />
            )}
          </div>,
          <div className='login'>
            <i className="memberIcon fas fa-unlock-alt"></i>
            <h2>This is the Member Area for <span id='span1'>sickflicks</span><span id='span2'>.review</span></h2>
            <form id='loginForm' onSubmit={this.login}>
              <h3>Input your Nit Picker credentials to proceed:</h3>
              <div id='loginForm-username'>
                <label>username:</label>
                <input
                  type='text/email'
                  value={this.state.username}
                  name='username'
                  onChange={this.handleInputChange}
                  autoComplete='off'
                />
              </div>
              <div id='loginForm-password'>
                <label>password:</label>
                <input
                  type='password'
                  value={this.state.password}
                  name='password'
                  onChange={this.handleInputChange}
                />
              </div>
              <input
                id='submitBtn'
                type='submit'
                value='Submit'
              />
            </form>
          </div>
        )}
        {util.renderIf(this.state.movieFormOpen,
          <MovieForm />
        )}
      </div>
    )
  }

  login(e) {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  handleInputChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  toggleMovieForm() {
    this.setState({
      movieFormOpen: !this.state.movieFormOpen,
    })
  }

  menuSelect() {
    this.setState({
      menuSelected: !this.state.menuSelected,
    })
  }
}

const mapStateToProps = state => ({
  member: state.member.data.author,
  accessToken: state.member.data.accessToken,
})

export default connect(mapStateToProps, { login })(Member)