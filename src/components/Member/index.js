import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, logout, errorSeen } from '../../dux/member'
import { fetchReviewsByAuthor } from '../../dux/reviews'

import MemberReviewListItem from './components/MemberReviewListItem'
// import MovieForm from './MovieForm'
// import MemberMenu from './MemberMenu'
// import UpdateReview from './UpdateReview'

import * as util from '../../lib/util'
import './_member.scss'

const initialState = {
  username: '',
  password: '',
  memberForm: null,
  movieFormOpen: false,
  updateFormOpen: false,
  menuSelected: false,
}

class Member extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleMovieForm = this.toggleMovieForm.bind(this)
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
    this.menuSelect = this.menuSelect.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.findMovie = this.findMovie.bind(this)
  }

  componentWillMount() {
    if (this.props.member && !this.state.username) {
      this.setState({ username: this.props.member.username }, () => {
        this.props.fetchReviewsByAuthor(this.state.username)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.member !== this.props.member && nextProps.member) {
      this.setState({
        username: nextProps.member.username,
      }, () => {
        this.props.fetchReviewsByAuthor(this.state.username)
      })
    }
    if (!nextProps.accessToken) {
      this.setState({ username: '' })
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
              <h2>Logged in as <span>{this.state.username}</span></h2>
              <Link className='review-btn' to='/member/editor'>
                <p>Review</p>
                <i className="fas fa-plus"></i>
              </Link>
              <div className='logout-btn'
                onClick={this.logout}>
                <p>Log Out</p>
                <i className="fas fa-sign-out-alt"></i>
              </div>
            </div>
            <div className='member-review-list'>
              {util.renderIf(!this.props.reviewsByAuthor.length,
                <div className="No Reviews">
                  <h2>You have no reviews yet.</h2>
                </div>
              )}
              {this.props.reviewsByAuthor.map(review => (
                <MemberReviewListItem
                  key={review.title}
                  reviewId={review._id}
                  title={review.title}
                  movie={this.findMovie(review)}
                  created_on={review.created_on}
                  updated_on={review.updated_on}
                />
              ))}
            </div>
            {/* {util.renderIf(!this.state.menuSelected,
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
              <UpdateReview
                author={this.props.member}
                history={this.props.history}
                toggleUpdateForm={this.toggleUpdateForm}
                menuSelect={this.menuSelect}
              />
            )} */}
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

  findMovie(review) {
    let result = {}
    this.props.movieData.forEach(movie => {
      if (review.movieId === movie._id) {
        result = movie
      }
    })

    return result
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
    this.setState({ memberForm: form })
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
  member: state.member.data.user,
  accessToken: state.member.data.accessToken,
  authError: state.member.error,
  authRequest: state.member.isFetching,
  reviewsByAuthor: state.reviews.data,
  movieData: state.movies.data,
})

const mapDispatchToProps = {
  login,
  logout,
  errorSeen,
  fetchReviewsByAuthor,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)