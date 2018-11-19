import React from 'react'
import { connect } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill'
import MovieForm from './MovieForm'
// import quill from 'quill'

import { fetchMovieById } from '../../dux/movies'
import { fetchReviewById } from '../../dux/reviews'
import { selectMovie } from '../../dux/tmdb'
import ImageGallery from './components/ImageGallery'
import * as util from '../../lib/util'

const initialState = {
  reviewId: '',
  imageSelectorOpen: false,
  releaseDate: '',
  movieTitle: '',
  reviewTitle: '',
  reviewHTML: '',
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.toggleGallery = this.toggleGallery.bind(this)
    this.imageHandler = this.imageHandler.bind(this)

    this.modules = {
      toolbar: {
        container: [
          [{ 'header': '2' }],
          ['italic', 'strike', 'blockquote'],
          ['link', 'video', 'image'],
        ],
        handlers: {
          'image': () => this.toggleGallery()
        }
      },
      clipboard: {
        matchVisual: false,
      }
    }

    this.formats = [
      'header',
      'italic', 'strike', 'blockquote',
      'link', 'video', 'image'
    ]
  }

  componentWillMount() {
    const searchQuery = this.props.location.search

    if (searchQuery.indexOf('review') !== -1) {
      const _id = util.parseUrlQuery('review')
      this.setState({ reviewId: _id }, () => {
        this.props.fetchReviewById(_id)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.reviewId &&
      nextProps.reviewData &&
      nextProps.reviewData !== this.props.reviewData
    ) {
      this.props.reviewData.map(review => {
        if (review._id === this.state.reviewId) {
          this.setState({
            reviewTitle: review.title,
            reviewHTML: review.html,
          }, () => {
            // this.props.selectMovie() need to fetch tmbd data for a movie
            this.props.fetchMovieById(review.movieId)
          })
        }
      })
    }

    if (
      this.state.reviewId &&
      nextProps.reviewMovie &&
      nextProps.reviewMovie !== this.props.reviewMovie
    ) {
      this.setState({
        movieTitle: nextProps.reviewMovie.name,
        releaseDate: nextProps.reviewMovie.release,
      })
    }
  }

  render() {
    const containerStyle = {
      backgroundColor: '#ffffff',
    }
    const editorStyle = {
      backgroundColor: '#ffffff',
      outline: 'none',
    }

    return (
      <div
        className="review-editor-container"
        style={containerStyle}
      >
        {util.renderEither(this.state.movieTitle && this.state.releaseDate,
          <div className='editor-container'>
            {util.renderIf(this.state.imageSelectorOpen,
              <ImageGallery
                toggleGallery={this.toggleGallery}
                imageHandler={this.imageHandler}
              />
            )}

            <ReactQuill
              ref={(el) => this.quillRef = el}
              onChange={this.props.handleReviewChange}
              value={this.state.reviewHTML}
              modules={this.modules}
              formats={this.formats}
              bounds={'.reviewSubmissionForm'}
              style={editorStyle}
              theme='snow'
              placeholder='Type or paste your Review (required)'
            />
          </div>,
          <MovieForm />
        )}
      </div>
    )
  }

  imageHandler(imageUrl, imageCaption) {
    const range = this.quillRef.getEditor().selection.savedRange
    this.quillRef.getEditor().insertEmbed(range.index, 'image', imageUrl, Quill.sources.User)
    this.quillRef.getEditor().insertText(range.index + 1, imageCaption)
  }

  toggleGallery() {
    this.setState({
      imageSelectorOpen: !this.state.imageSelectorOpen,
    })
  }
}

const mapStateToProps = state => ({
  movieData: state.movies.data,
  reviewMovie: state.movies.reviewMovie,
  reviewData: state.reviews.data,
})

const mapDispatchToProps = {
  fetchMovieById,
  fetchReviewById,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor)
