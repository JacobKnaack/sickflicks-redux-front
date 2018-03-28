import React from 'react'
import { connect } from 'react-redux'
import { selectMovie } from '../../../dux/tmdb'
import { addMovie } from '../../../dux/movies'
// import { submitReview } from '../../../dux/reviews'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewTitle: '',
      author: '',
      markdown: '',
    }

    this.formFieldTyping = this.formFieldTyping.bind(this)
  }

  componentWillMount() {
    this.props.selectMovie(this.props.tmdb_id)
    this.setState({
      author: this.props.author,
    })
  }

  render() {
    return (
      <div className='reviewForm'>
        <h2>Review Submission for {this.props.movieTitle}</h2>
        <form className='reviewSubmissionForm'>
          <input 
            name='reviewTitle'
            value={this.state.reviewTitle}
            onChange={this.formFieldTyping}
            placeholder='Title (Required)'
          />
          <input 
            name='markdown'
            value={this.state.markdown}
            onChange={this.formFieldTyping}
            placeholder='Review Goes Here (Required)'
          />
        </form>
      </div>
    )
  }

  formFieldTyping(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
}

const mapStateToProps = state => ({
  author: state.member.data.author, 
  movieData: state.tmdb.data
})

export default connect(mapStateToProps, { selectMovie })(ReviewForm)
