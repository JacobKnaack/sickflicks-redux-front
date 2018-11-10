import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import MovieForm from './MovieForm'
// import quill from 'quill'

import ImageGallery from './components/ImageGallery'
import * as util from '../../lib/util'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSelectorOpen: false,
      releaseDate: '',
      movieTitle: '',
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
    const containerStyle = {
      backgroundColor: '#ffffff',
    }
    const editorStyle = {
      backgroundColor: '#ffffff',
      outline: 'none',
    }

    return (
      <div
        className="review-editor-container"
        style={containerStyle}
      >
        {util.renderEither(this.state.movieTitle && this.state.releaseDate,
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
          </div>,
          <MovieForm />
        )}
      </div>
    )
  }

  imageHandler(imageUrl, imageCaption) {
    const range = this.quillRef.getEditor().selection.savedRange
    this.quillRef.getEditor().insertEmbed(range.index, 'image', imageUrl, Quill.sources.User)
    this.quillRef.getEditor().insertText(range.index + 1, imageCaption)
  }

  toggleGallery() {
    this.setState({
      imageSelectorOpen: !this.state.imageSelectorOpen,
    })
  }
}

export default Editor
