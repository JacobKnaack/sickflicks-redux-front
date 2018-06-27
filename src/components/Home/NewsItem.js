import React from 'react'
import PropTypes from 'prop-types'

import * as util from '../../lib/util'

class NewsItem extends React.Component {
 
  render() {
    return (
      <div className='newsItem'>
        <h2 className='fi-title'>
          <a href={this.props.url}
            target='_blank'>
            {this.props.title}
          </a>
        </h2>
        <div className='fi-info'>
          <h3 className='fi-source'>{this.props.source.name}</h3>
          <h3 className='fi-date'>{util.formatReviewDate(this.props.publishedAt)}</h3>
        </div>
        <img className='fi-image' src={this.props.imgSrc} />
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