import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
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
    this.imageHandler = this.imageHandler.bind(this)

    this.modules = {
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

    this.formats = [
      'header',
      'italic', 'strike', 'blockquote',
      'link', 'video', 'image'
    ]
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
            imageHandler={this.imageHandler}
          />
        )}
        <ReactQuill
          ref={(el) => this.quillRef = el}
          onChange={this.props.handleReviewChange}
          value={this.props.reviewHTML}
          modules={this.modules}
          formats={this.formats}
          bounds={'.reviewSubmissionForm'}
          style={editorStyle}
          theme='snow'
          placeholder='Type or paste your Review (required)'
        />
      </div>
    )
  }

  imageHandler(imageUrl, imageCaption) {
    const range = this.quillRef.getEditor().getSelection()
    this.quillRef.getEditor().insertEmbed(range.index, 'image', imageUrl, Quill.sources.User)
    this.quillRef.getEditor().insertText(range.index + 1, imageCaption, { italic: true })
  }

  toggleGallery() {
    this.setState({
      imageSelectorOpen: !this.state.imageSelectorOpen,
    })
  }
}

export default ReviewEditor