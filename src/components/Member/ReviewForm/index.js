import React from 'react'
import { connect } from 'react-redux'
import { selectMovie } from '../../../dux/tmdb'
import { addMovie } from '../../../dux/movies'
import { addReview } from '../../../dux/reviews'

import ReviewEditor from './ReviewEditor'
import Preview from './Preview'
import * as util from '../../../lib/util'
import './_reviewForm.scss'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieName: '',
      movieRelease: '',
      movieImage: '',
      reviewTitle: '',
      author: {},
      reviewHTML: '',
      reviewPreview: false,
    }

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
    })
  }
  
  componentWillReceiveProps(nextProps) {
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

  render() {
    const inputStyle = {
      outline: 'none',
      width: '500px',
      height: '30px',
      lineHeight: '30px',
      margin: '0 auto 10px auto',
      fontSize: '100%',
      border: 'none',
    }

    const textareaStyle= {
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

    const headerStyle = {
      backgroundImage: `url(${this.props.imagePath})`,
      height: '300px',
      width: 'auto',
      margin: '0 20px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      alignText: 'center',
      fontFamily: 'Ultra',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }

    return (
      <div className='reviewForm'>
        <div className='formHeading' style={headerStyle}>
          <h2>{this.props.movieTitle}</h2>
          <h3>{this.props.releaseDate}</h3>
        </div>
        <form className='reviewSubmissionForm'>
          <input 
            name='reviewTitle'
            style={inputStyle}
            value={this.state.reviewTitle}
            onChange={this.formFieldTyping}
            placeholder='Title (Required)'
          />
          <ReviewEditor 
            handleReviewChange={this.handleReviewChange}
            reviewHTML={this.state.reviewHTML}
          />
          <input
            type='button'
            value='preview and submit'
            style={previewBttnStyle}
            onClick={this.toggleReviewPreview}
          />
        </form>
        {util.renderIf(this.state.reviewPreview,
          <Preview 
            title={this.state.reviewTitle}
            author={this.state.author}
            reviewText={this.state.reviewHTML}
            toggleReviewPreview={this.toggleReviewPreview}
            submitReview={this.submitReview}
          />
        )}
      </div>
    )
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
  authorData: state.member.data.author,
  movieData: state.tmdb.data,
  movieReviewData: state.movies.reviewMovie,
  postedReviewData: state.reviews.data,
})

export default connect(mapStateToProps, { selectMovie, addMovie, addReview })(ReviewForm)
