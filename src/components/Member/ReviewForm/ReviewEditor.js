import React from 'react'
import ReactQuill from 'react-quill'

class ReviewEditor extends React.Component {
  constructor() {
    super()
  }

  render() {
    const editorStyle = {
      backgroundColor: '#ffffff',
      outline: 'none',
    }

    return (
      <div className='editor-container'>
        <ReactQuill
          ref={(el) => this.quillRef = el}
          onChange={this.props.handleReviewChange}
          value={this.props.reviewHTML}
          modules={ReviewEditor.modules}
          formats={ReviewEditor.formats}
          toggleGallery={this.props.toggleImageGallery}
          bounds={'.reviewSubmissionForm'}
          style={editorStyle}
          theme='snow'
          placeholder='Type or paste your Review (required)'
        />
      </div>
    )
  }
}

function imageHandler() {
  const Quill = ReactQuill.Quill
  var range = this.quill.getSelection();
  var value = prompt('What is the image URL');
  this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
}

ReviewEditor.modules = {
  toolbar: {
    container: [
      [{ 'header': '2' }],
      ['italic', 'strike', 'blockquote'],
      ['link', 'video', 'image'],
    ],
    handlers: {
      'image': imageHandler
    }
  },
  clipboard: {
    matchVisual: false,
  }
}

ReviewEditor.formats = [
  'header',
  'italic', 'strike', 'blockquote',
  'link', 'video', 'image'
]

export default ReviewEditor