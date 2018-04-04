import React from 'react'
import { connect } from 'react-redux'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backdrops: [],
      posters: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      backdrops: nextProps.tmdbData.images.backdrops,
      posters: nextProps.tmdbData.images.posters,
    })
  }

  render() {
    const galleryStyle = {
      position: 'fixed',
      width: '80vw',
      top: '5px',
      left: '20vw',
    }

    return (
      <div className='imageGallery' style={galleryStyle}>
        <h3>Movie Stills</h3>
        {this.state.backdrops.map(image => 
          <div className='imageContainer'>
            <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt={image.file_path} />
          </div>
        )}
        <h3>Movie Posters</h3>
        {this.state.posters.map(image => 
          <div className='imageContainer'>
            <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt={image.file_path} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tmdbData: state.tmdb.data, 
})

export default connect(mapStateToProps, null)(ImageGallery)