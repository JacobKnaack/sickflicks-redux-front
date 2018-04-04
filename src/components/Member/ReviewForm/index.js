import React from 'react'
import { connect } from 'react-redux'
import { selectMovie } from '../../../dux/tmdb'
import { addMovie } from '../../../dux/movies'
// import { submitReview } from '../../../dux/reviews'

import ReviewEditor from './ReviewEditor'
import ImageGallery from './ImageGallery'
import Preview from './Preview'
import * as util from '../../../lib/util'
import './_reviewForm.scss'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewTitle: '',
      author: '',
      reviewHTML: '',
      reviewPreview: false,
      imageGallery: false,
    }

    this.formFieldTyping = this.formFieldTyping.bind(this)
    this.handleReviewChange = this.handleReviewChange.bind(this)
    this.toggleReviewPreview = this.toggleReviewPreview.bind(this)
  }

  componentWillMount() {
    this.props.selectMovie(this.props.tmdb_id)
    this.setState({
      author: this.props.author,
    })
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

    return (
      <div className='reviewForm'>
        <h2>Review for {this.props.movieTitle}</h2>
        <h3>By {this.props.author.username}</h3>
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
          />
        )}
        {util.renderIf(this.state.imageGaller,
          <ImageGallery />
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
    }, () => {
      console.log(this.state.reviewHTML)
    })
  }

  toggleReviewPreview() {
    this.setState({
      reviewPreview: !this.state.reviewPreview,
    })
  }
}

const mapStateToProps = state => ({
  author: state.member.data.author, 
  movieData: state.tmdb.data,
})

export default connect(mapStateToProps, { selectMovie })(ReviewForm)
