import React from 'react'
import { connect } from 'react-redux'
import { login, logout, errorSeen } from '../../dux/member'
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
      memberForm: null,
      movieFormOpen: false,
      updateFormOpen: false,
      menuSelected: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleMovieForm = this.toggleMovieForm.bind(this)
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
    this.menuSelect = this.menuSelect.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    if(this.props.member && !this.state.username) {
      this.setState({ username: this.props.member.username })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.member !== this.props.member && nextProps.member) {
      this.setState({
        username: nextProps.member.username,
      })
    } else {
      this.setState({
        username: '',
      })
    }
  }

  render() {
    let memberClasses = 'member'
    if (this.state.movieFormOpen) {
      memberClasses += ' movieFormActive'
    }

    return (
      <div className={memberClasses}>
        {util.renderEither(this.props.accessToken,
          <div className='memberArea'>
            <div className='username'>
              <h2>Welcome <span>{this.state.username}</span></h2>
              <div className='logout-btn'
                   onClick={this.logout}>
                <p>Log Out</p>
                <i className="fas fa-sign-out-alt"></i>
              </div>
            </div>
            {util.renderIf(!this.state.menuSelected,
              <MemberMenu
                toggleMovieForm={this.toggleMovieForm}
                toggleUpdateForm={this.toggleUpdateForm}
                toggleForm={this.toggleForm}
                menuSelect={this.menuSelect}
              />
            )}
            {util.renderIf(this.state.movieFormOpen,
              <MovieForm
                history={this.props.history}
                toggleMovieForm={this.toggleMovieForm}
                menuSelect={this.menuSelect}
              />
            )}
            {util.renderIf(this.state.updateFormOpen,
              <div>
                <h2>Updating a Movie</h2>
                <button onClick={() => {
                  this.toggleUpdateForm()
                  this.menuSelect()
                }}>
                  Close
            </button>
              </div>
            )}
          </div>,
          <div className='login'>
            {util.renderEither(this.props.authError,
              <div className='authError'>
                <h2>Unauthorized</h2>
                <p>Please enter a valid username and password</p>
                <button onClick={this.props.errorSeen}>OK</button>
              </div>,
              <div className='authPrompt'>
                <i className="memberIcon fas fa-unlock-alt"></i>
                <h2>This is the Member Area for <span id='span1'>sickflicks</span><span id='span2'>.review</span></h2>
              </div>
            )}
            <form id='loginForm' onSubmit={this.login}>
              <h3>Please enter your Username and Password:</h3>
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
            {/* <div>
              <p>not a member?</p>
              <h3>Sign Up</h3>
            </div> */}
          </div>
        )}
      </div>
    )
  }

  login(e) {
    e.preventDefault()
    if (this.state.username && this.state.password) {
      this.props.login(this.state.username, this.state.password)
    } else {
      alert('no username or password given')
    }

    this.setState({
      username: '',
      password: '',
    })
  }

  logout() {
    this.props.logout()
    if (this.state.movieFormOpen) this.setState({ movieFormOpen: false })
    if (this.state.updateFormOpen) this.setState({ updateFormOpen: false })
  }

  handleInputChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  toggleForm(form) {
    this.setState({memberForm: form})
  }

  toggleMovieForm() {
    this.setState({ movieFormOpen: !this.state.movieFormOpen })
  }

  toggleUpdateForm() {
    this.setState({ updateFormOpen: !this.state.updateFormOpen })
  }

  menuSelect() {
    this.setState({ menuSelected: !this.state.menuSelected })
  }
}

const mapStateToProps = state => ({
  member: state.member.data.author,
  accessToken: state.member.data.accessToken,
  authError: state.member.error,
  authRequest: state.member.isFetching,
})

const mapDispatchToProps = {
  login,
  logout,
  errorSeen,
}

export default connect(mapStateToProps, mapDispatchToProps)(Member)