import React from 'react'
import ReactQuill from 'react-quill'

class ReviewEditor extends React.Component {

  render() {
    const editorStyle = {
      backgroundColor: '#ffffff',
      outline: 'none',
    }

    return (
      <div className='editor-container'>
        <ReactQuill 
          onChange={this.props.handleReviewChange}
          value={this.props.reviewHTML}
          modules={ReviewEditor.modules}
          formats={ReviewEditor.formats}
          bounds={'.reviewSubmissionForm'}
          style={editorStyle}
          theme='snow'
          placeholder='Type or paste your Review (required)'
        />
      </div>
    )
  }
}

ReviewEditor.modules = {
  toolbar: [
    [{ 'header': '2' }],
    ['italic', 'strike', 'blockquote'],
    ['link', 'video'],
  ],
  clipboard: {
    matchVisual: false,
  }
}

ReviewEditor.formats = [
  'header',
  'italic', 'strike', 'blockquote',
  'link', 'video'
]

export default ReviewEditor