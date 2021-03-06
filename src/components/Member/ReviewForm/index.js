import React from 'react'
import { connect } from 'react-redux'
import { selectMovie } from '../../../dux/tmdb'
import { addMovie } from '../../../dux/movies'
import { addReview } from '../../../dux/reviews'

import ReviewEditor from './ReviewEditor'
import Preview from './Preview'
import * as util from '../../../lib/util'
import './_reviewForm.scss'

const initialState = {
  movieName: '',
  movieRelease: '',
  movieImage: '',
  reviewTitle: '',
  genres: [],
  author: {},
  reviewHTML: '',
  reviewPreview: false,
}

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.formFieldTyping = this.formFieldTyping.bind(this)
    this.handleReviewChange = this.handleReviewChange.bind(this)
    this.toggleReviewPreview = this.toggleReviewPreview.bind(this)
    this.submitReview = this.submitReview.bind(this)
  }

  componentWillMount() {
    this.props.selectMovie(this.props.tmdb_id)
    this.setState({
      movieName: this.props.movieTitle,
      movieRelease: this.props.releaseDate,
      movieImage: this.props.imagePath,
      author: this.props.authorData,
    }, () => {
      console.log('fetch reviews for this movie and poplulate review form if it exists with: \n this.setState({ reviewHTML: })')
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movieData !== this.props.movieData) [
      this.setState({
        genres: nextProps.movieData.genres
      })
    ]

    if (nextProps.movieReviewData !== this.props.movieReviewData) {
      this.props.addReview(
        this.props.accessToken,
        nextProps.movieReviewData._id,
        this.state.reviewTitle,
        this.state.author.username,
        this.state.reviewHTML,
      )
    }

    if (nextProps.postedReviewData !== this.props.postedReviewData) {
      this.props.history.push('/')
    }
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const titleInputStyle = {
      outline: 'none',
      width: '500px',
      height: '40px',
      lineHeight: '40px',
      margin: '15px auto 10px auto',
      fontSize: '100%',
      border: 'none',
      borderRadius: '5px',
    }

    const textareaStyle = {
      outline: 'none',
      width: '600px',
      height: '50vh',
      margin: '0 auto',
      border: 'none',
    }

    const previewBttnStyle = {
      width: '150px',
      height: '40px',
      margin: '10px auto',
    }

    const cancelBttnStyle = {
      width: '100px',
      height: '40px',
      margin: '10px auto',
    }

    const reviewOptionsStyle = {
      width: '300px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }

    const reviewOptionsBtnStyle = {
      height: '40px',
      margin: '10px auto',
      fontFamily: 'Saira, sans-serif',
      fontSize: '130%'
    }

    const headingStyle = {
      height: '300px',
      width: 'auto',
      margin: '10px 20px',
      alignText: 'center',
      fontFamily: 'Ultra',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    }

    const headingInfoStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: 'calc(100% - 200px)',
      margin: '20px 0',
    }

    const headingImageStyle = {
      width: 'auto',
      height: '100%',
      marginRight: '10px',
      display: 'inline-block',
      borderRadius: '10px 0 0 10px',
    }

    const titleStyle = {
      fontSize: '350%',
      width: '80%',
      textAlign: 'left',
      borderBottom: '2px solid #00FFBC',
      color: '#ffffff',
      margin: '0 auto'
    }

    const releaseStyle = {
      fontSize: '150%',
      width: '80%',
      margin: '0 auto',
      color: '#D0C8C0',
    }

    const genreStyle = {
      borderRadius: '5px',
      backgroundColor: '#D13F8D',
      color: '#ffffff',
      width: '20%',
      margin: '5px 4px',
      fontFamily: 'Saira, sans-serif',
      textAlign: 'center',
    }

    return (
      <div className='reviewForm'>
        <div className='formHeading' style={headingStyle}>
          <img
            style={headingImageStyle}
            src={this.props.imagePath}
            alt={`${this.props.movieTitle} image`}
          />
          <div className='formHeading-reviewInfo' style={headingInfoStyle}>
            <h2 style={titleStyle}>{this.props.movieTitle}</h2>
            <h3 style={releaseStyle}>{util.formatMovieRelease(this.props.releaseDate)}</h3>
            <div className='genres'>
              {this.state.genres.map(genre => <p key={genre.id} style={genreStyle}>{genre.name}</p>)}
            </div>
          </div>
        </div>
        <form className='reviewSubmissionForm'>
          <input
            name='reviewTitle'
            autoComplete='off'
            style={titleInputStyle}
            value={this.state.reviewTitle}
            onChange={this.formFieldTyping}
            placeholder='Title (Required)'
          />
          <ReviewEditor
            handleReviewChange={this.handleReviewChange}
            reviewHTML={this.state.reviewHTML}
          />
          <div style={reviewOptionsStyle}>
            <input
              type='button'
              value='Preview and Submit'
              style={reviewOptionsBtnStyle}
              onClick={this.toggleReviewPreview}
            />
            <input
              ref={el => { this.el = el }}
              type='button'
              value='Cancel'
              style={reviewOptionsBtnStyle}
              onClick={this.props.resetReviewForm}
            />
          </div>
        </form>
        {util.renderEither(this.state.reviewPreview && this.state.reviewTitle.length && this.state.reviewHTML.length > 100,
          <Preview
            title={this.state.reviewTitle}
            author={this.state.author}
            reviewText={this.state.reviewHTML}
            toggleReviewPreview={this.toggleReviewPreview}
            submitReview={this.submitReview}
          />,
          <div>
            {util.renderIf(this.state.reviewPreview,
              <div className='validator-modal'>
                <div className='reviewValidationError'>
                  <h2>Review Validation Error</h2>
                  <h2>Please make sure you have added a title and some review content!</h2>
                  <button onClick={this.toggleReviewPreview}>close</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  cancelReview() {
    this.setState({
      movieName: '',
      movieRelease: '',
      movieImage: '',
      author: '',
      genres: [],
    })
  }

  formFieldTyping(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleReviewChange(html) {
    this.setState({
      reviewHTML: html
    })
  }

  scrollToBottom(offset = 0) {
    const top = this.el.getBoundingClientRect().top
    if ((top + offset) >= 0 && (top - offset) <= window.innerHeight) {
      this.el.scrollIntoView()
    }
  }

  toggleReviewPreview() {
    this.setState({
      reviewPreview: !this.state.reviewPreview,
    })
  }

  submitReview() {
    const uriMovieTitle = encodeURIComponent(this.state.movieName)
    fetch(`${__DB_API_URL__}/movie_title/${uriMovieTitle}`)
      .then(res => {
        return res.json()
      })
      .then(movieData => {
        if (movieData) {
          this.props.addReview(
            this.props.accessToken,
            movieData._id,
            this.state.reviewTitle,
            this.state.author.username,
            this.state.reviewHTML,
          )
        } else {
          this.props.addMovie(
            this.state.movieName,
            this.state.movieRelease,
            this.state.movieImage,
            this.props.accessToken
          )
        }
      })
      .catch(err => alert(err))
  }
}

const mapStateToProps = state => ({
  accessToken: state.member.data.accessToken,
  authorData: state.member.data.user,
  movieData: state.tmdb.movieData,
  movieReviewData: state.movies.reviewMovie,
  postedReviewData: state.reviews.data,
})

const mapDispatchToProps = {
  selectMovie,
  addMovie,
  addReview,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewForm)
