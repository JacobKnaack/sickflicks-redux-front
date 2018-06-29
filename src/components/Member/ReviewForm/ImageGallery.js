import React from 'react'
import { connect } from 'react-redux'

import * as util from '../../../lib/util'
import './_reviewForm.scss'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: '',
      captionText: '',
    }
    
    this.submitImage = this.submitImage.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
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
      height: '90vh',
      padding: '15px', 
      left: 'calc(10vw - 7.5px)',
      top: 'calc(5vh - 7.5px)',
      overflowY: 'auto',
      backgroundColor: '#000000',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 1000\'%3E%3Cg %3E%3Ccircle fill=\'%23000000\' cx=\'50\' cy=\'0\' r=\'50\'/%3E%3Cg fill=\'%23111111\' %3E%3Ccircle cx=\'0\' cy=\'50\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'50\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%231b1b1b\' cx=\'50\' cy=\'100\' r=\'50\'/%3E%3Cg fill=\'%23262626\' %3E%3Ccircle cx=\'0\' cy=\'150\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'150\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%23303030\' cx=\'50\' cy=\'200\' r=\'50\'/%3E%3Cg fill=\'%233b3b3b\' %3E%3Ccircle cx=\'0\' cy=\'250\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'250\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%23474747\' cx=\'50\' cy=\'300\' r=\'50\'/%3E%3Cg fill=\'%23525252\' %3E%3Ccircle cx=\'0\' cy=\'350\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'350\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%235e5e5e\' cx=\'50\' cy=\'400\' r=\'50\'/%3E%3Cg fill=\'%236a6a6a\' %3E%3Ccircle cx=\'0\' cy=\'450\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'450\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%23777777\' cx=\'50\' cy=\'500\' r=\'50\'/%3E%3Cg fill=\'%23848484\' %3E%3Ccircle cx=\'0\' cy=\'550\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'550\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%23919191\' cx=\'50\' cy=\'600\' r=\'50\'/%3E%3Cg fill=\'%239e9e9e\' %3E%3Ccircle cx=\'0\' cy=\'650\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'650\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%23ababab\' cx=\'50\' cy=\'700\' r=\'50\'/%3E%3Cg fill=\'%23b9b9b9\' %3E%3Ccircle cx=\'0\' cy=\'750\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'750\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%23c6c6c6\' cx=\'50\' cy=\'800\' r=\'50\'/%3E%3Cg fill=\'%23d4d4d4\' %3E%3Ccircle cx=\'0\' cy=\'850\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'850\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%23e2e2e2\' cx=\'50\' cy=\'900\' r=\'50\'/%3E%3Cg fill=\'%23f1f1f1\' %3E%3Ccircle cx=\'0\' cy=\'950\' r=\'50\'/%3E%3Ccircle cx=\'100\' cy=\'950\' r=\'50\'/%3E%3C/g%3E%3Ccircle fill=\'%23ffffff\' cx=\'50\' cy=\'1000\' r=\'50\'/%3E%3C/g%3E%3C/svg%3E")',
      backgroundAttachment: 'fixed',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      borderRadius: '5px',
    }
    const imagePromptStyle = {
      fontFamily: 'Saira, sans-serif',
      textAlign: 'center',
      borderBottom: 'thin solid #ffffff',
      color: '#ffffff',
      fontSize: '150%',
    }
    const imagesContainerStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    }
    const imageStyle = {
      margin: '5% 5%',
      width: '40%',
      display: 'block',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
    }
    const imageOptionsStyle = {
      width: '50%',
      display: 'flex',
      margin: '0 auto',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }
    const imageBtnContainerStyle ={
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '5px',
    }
    const btnStyle = {
      textAlign: 'center',
      margin: '0 10px',
      backgroundColor: '#a9a9a9',
      borderRadius: '10px',
      width: '100px',
      cursor: 'default',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      fontFamily: 'Saira, sans-serif',
    }
    const inputContainerStyle = {
      backgroundColor: '#ffffff',
      borderRadius: '5px',
      fontFamily: 'Saira, sans-serif',
      height: '30px',
      padding: '0 5px',
      lineHeight: '30px',
      display: 'flex',
      flexDirection: 'row',
    }
    const captionInputStyle = {
      backgroundColor: 'none',
      border: 'none',
      outline: 'none',
      width: '60%',
      height: '30px',
      fontSize: '100%',
      lineHeight: '30px',
      margin: '0 10px',
      padding: '0',
    }
    const selectedImageStyle = {
      margin: '20% auto 20px auto',
      width: '60%',
      display: 'block',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
    }

    return (
      <div className='imageModal' style={modalStyle}>
        <div className='imageGallery' style={galleryStyle}>
          {util.renderEither(!this.state.imageUrl,
            <div>
              <h2 style={imagePromptStyle}>Click on an Image Below</h2>
              <div className='images' style={imagesContainerStyle}>
                {this.props.tmdbData.images.backdrops.map(image =>
                  <div
                    key={image.file_path}
                    className='imageContainer'
                    style={imageStyle}
                    onClick={() => this.setState({ imageUrl: `https://image.tmdb.org/t/p/w780/${image.file_path}` })}
                  >
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                      alt={image.file_path} />
                  </div>
                )}
              </div>
              <div className='images' style={imagesContainerStyle}>
                {this.props.tmdbData.images.posters.map(image =>
                  <div
                    key={image.file_path}
                    className='imageContainer'
                    style={imageStyle}
                    onClick={() => this.setState({ imageUrl: `https://image.tmdb.org/t/p/w500/${image.file_path}` })}
                  >
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      alt={image.file_path} />
                  </div>
                )}
              </div>
            </div>,
            <div className='selectedImageContainer'>
              <div
                className='selectedImage'
                style={selectedImageStyle}
              >
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={this.state.imageUrl}
                  alt='selected from image gallery' />
              </div>
              <div className='captionInput' style={imageOptionsStyle}>
                <div style={inputContainerStyle}>
                  <p>Optional Caption:</p>
                  <input
                    type='text'
                    name='captionText'
                    style={captionInputStyle}
                    value={this.state.captionText}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className='selectedImageOptions' style={imageBtnContainerStyle}>
                  <h4 onClick={() => this.setState({ imageUrl: '' })}
                      style={btnStyle}>
                    Cancel
                  </h4>
                  <h4 onClick={this.submitImage}
                      style={btnStyle}>
                    Submit
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  submitImage() {
    this.props.imageHandler(this.state.imageUrl, this.state.captionText)
    this.props.toggleGallery()
  }

  handleInputChange(e) {
    const { name,value } = e.target
    this.setState({ [name]: value })
  }
}

const mapStateToProps = state => ({
  tmdbData: state.tmdb.data, 
})

export default connect(mapStateToProps, null)(ImageGallery)