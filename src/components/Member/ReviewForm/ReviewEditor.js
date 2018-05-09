import React from 'react'
import ReactQuill from 'react-quill'
import quill from 'quill'

import ImageGallery from './ImageGallery'
import * as util from '../../../lib/util'

class ReviewEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSelectorOpen: false,
    }

    this.toggleGallery = this.toggleGallery.bind(this)
    this.setImageUrl = this.setImageUrl.bind(this)
  }

  render() {
    const editorStyle = {
      backgroundColor: '#ffffff',
      outline: 'none',
    }

    return (
      <div className='editor-container'>
        {util.renderIf(this.state.imageSelectorOpen,
          <ImageGallery
            toggleGallery={this.toggleGallery}
            setImageUrl={this.setImageUrl}
          />
        )}
        <ReactQuill
          ref={(el) => this.quillRef = el}
          onChange={this.props.handleReviewChange}
          value={this.props.reviewHTML}
          modules={this.quillModules}
          formats={this.quillFormats}
          bounds={'.reviewSubmissionForm'}
          style={editorStyle}
          theme='snow'
          placeholder='Type or paste your Review (required)'
        />
      </div>
    )
  }

  quillModules = {
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

  quillFormats = [
    'header',
    'italic', 'strike', 'blockquote',
    'link', 'video', 'image'
  ]

  imageHandler() {
    // const Quill = ReactQuill.Quill
    // var range = this.quill.getSelection()
    // var value = prompt('What is the image URL');
    // this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER)
    // need to use ReactQuill getEditor method
  }

  toggleGallery() {
    this.setState({
      imageSelectorOpen: !this.state.imageSelectorOpen,
    })
  }

  setImageUrl(imageUrl) {
    console.log(imageUrl)
  }
}

export default ReviewEditor