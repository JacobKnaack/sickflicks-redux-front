import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchNews } from '../../../dux/news'
import NewsItem from '../NewsItem'
import * as util from '../../../lib/util'

class News extends React.Component {

  componentWillMount() {
    this.props.fetchNews()
  }

  render() {
    const newsData = this.props.newsData
    const News = (articleArray) => (
      articleArray.map(article => (
        <NewsItem
          key={article.title}
          title={article.title}
          source={article.source}
          url={article.url}
          publishedAt={article.publishedAt}
          imgSrc={article.urlToImage}
        />
      ))
    )

    return (
      <div className='newsContainer'>
        {util.renderIf(newsData.length > 0,
          News(newsData)
        )}
        {util.renderIf(newsData.length === 0,
          <h3>Loading News...</h3>
        )}
      </div>
    )
  }
}

News.propTypes = {
  fetchNews: PropTypes.func,
  newsData: PropTypes.array,
}

const mapStateToProps = (state) => {
  return { 
    newsData: state.news.data,
  }
}

export default connect(mapStateToProps, { fetchNews })(News)