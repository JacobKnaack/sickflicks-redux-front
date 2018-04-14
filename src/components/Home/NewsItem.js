import React from 'react'
import PropTypes from 'prop-types'

class NewsItem extends React.Component {
 
  render() {
    return (
      <div className='newsItem'>
        <img className='fi-image' src={this.props.imgSrc} />
        <h2>
          <a href={this.props.url}
             target='_blank'>{this.props.title}</a>
        </h2>
        <div className='fi-info'>
          <h3>{this.props.source.name}</h3>
          <h3>{this.props.publishedAt}</h3>
        </div>
      </div>
    )
  }
}

NewsItem.propTypes = {
  title: PropTypes.string,
  source: PropTypes.object,
  url: PropTypes.string,
  publishedAt: PropTypes.string
}

export default NewsItem