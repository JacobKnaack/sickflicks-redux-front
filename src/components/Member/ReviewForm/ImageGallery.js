import React from 'react'
import { connect } from 'react-redux'
import './_reviewForm.scss'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props)
    
    this.selectImage = this.selectImage.bind(this)
  }

  render() {
    const modalStyle = {
      position: 'fixed',
      zIndex: '100',
      width: '100vw',
      height: '100vh',
      top: '0',
      left: '0',
      backgroundColor: 'rgba(000, 000, 000, 0.7)',
    }
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
    const imagesContainerStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    }
    const containerHeadingStyle = {
      fontFamily: 'Saira, sans-serif',
      fontSize: '150%',
      textAlign: 'center',
    }
    const imageStyle = {
      margin: '10px 10px',
      width: '500px',
      display: 'block',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
    }
    const closeBtnStyle = {
      position: 'fixed',
      left: 'calc(50% - 50px)',
      textAlign: 'center',
      bottom: '5vh',
      width: '100px',
      cursor: 'default',
      fontFamily: 'Saira, sans-serif'
    }

    return (
      <div className='imageModal' style={modalStyle}>
        <div className='imageGallery' style={galleryStyle}>
          <h3 style={containerHeadingStyle}>Movie Stills</h3>
          <div className='images' style={imagesContainerStyle}>
            {this.props.tmdbData.images.backdrops.map(image => 
              <div 
                key={image.file_path}
                className='imageContainer'
                style={imageStyle}
                onClick={() => this.selectImage(`https://image.tmdb.org/t/p/w780/${image.file_path}`)}
              >
                <img
                  style={{width: '100%', height: '100%' }}
                  src={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                  alt={image.file_path} />
              </div>
            )}
          </div>
          <h3 style={containerHeadingStyle}>Movie Posters</h3>
          <div className='images' style={imagesContainerStyle}>
            {this.props.tmdbData.images.posters.map(image => 
              <div
                key={image.file_path}
                className='imageContainer'
                style={imageStyle}
                onClick={() => this.selectImage(`https://image.tmdb.org/t/p/w500/${image.file_path}`)}
              >
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt={image.file_path} />
              </div>
            )}
          </div>
          <h4
            onClick={this.props.toggleGallery}
            style={closeBtnStyle}
          >
            Close
          </h4>
        </div>
      </div>
    )
  }

  selectImage(url) {
    this.props.imageHandler(url)
    this.props.toggleGallery()
  }
}

const mapStateToProps = state => ({
  tmdbData: state.tmdb.data, 
})

export default connect(mapStateToProps, null)(ImageGallery)