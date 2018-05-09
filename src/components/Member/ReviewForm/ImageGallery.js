import React from 'react'
import { connect } from 'react-redux'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props)
    
    this.selectImage = this.selectImage.bind(this)
  }

  render() {
    const galleryStyle = {
      position: 'fixed',
      zIndex: '101',
      width: '80vw',
      height: '80vh',
      padding: '15px', 
      left: 'calc(10vw - 7.5px)',
      top: 'calc(10vh - 7.5px)',
      overflowY: 'auto',
      backgroundColor: '#a9a9a9',
    }
    const imageStyle = {
      margin: '10px auto',
      display: 'block',
    }
    const closeBtnStyle = {
      position: 'fixed',
      left: 'calc(50% - 50px)',
      textAlign: 'center',
      bottom: '10vh',
      width: '100px',
      cursor: 'default',
    }
    return (
      <div className='imageGallery' style={galleryStyle}>
        <h3>Movie Stills</h3>
        {this.props.tmdbData.images.backdrops.map(image => 
          <div 
            key={image.file_path}
            className='imageContainer'
            onClick={() => this.selectImage(`https://image.tmdb.org/t/p/w500/${image.file_path}`)}
          >
            <img
              style={ imageStyle }
              src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
              alt={image.file_path} />
          </div>
        )}
        <h3>Movie Posters</h3>
        {this.props.tmdbData.images.posters.map(image => 
          <div
            key={image.file_path}
            className='imageContainer'
            onClick={() => this.props.setImageUrl(`https://image.tmdb.org/t/p/w500/${image.file_path}`)}
          >
            <img
              style={imageStyle}
              src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
              alt={image.file_path} />
          </div>
        )}
        <h4
          onClick={this.props.toggleGallery}
          style={closeBtnStyle}
        >
          Close
        </h4>
      </div>
    )
  }

  selectImage(url) {
    this.props.setImageUrl(url)
    this.props.toggleGallery()
  }
}

const mapStateToProps = state => ({
  tmdbData: state.tmdb.data, 
})

export default connect(mapStateToProps, null)(ImageGallery)