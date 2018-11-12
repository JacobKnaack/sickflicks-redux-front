import dateFormat from 'dateformat'

export const renderIf = (test, component) => test ? component : null

export const renderEither = (test, component1, component2) => test ? component1 : component2

export const convertUrl = (url) => {
  if (url) return url.replace(/^http:\/\//i, 'https://');
  return url
}

// function that takes in an html string and adds a class to p tags with img tags inside
export const htmlParser = (html) => {
  if (html) {
    var matchArray = html.match(/\<p[^<]*\<img.*?\<\/p\>/g)
    var editorContent = ''
    if (matchArray) {
      for (var match of matchArray) {
        let captionIndex = match.indexOf('">') + 2
        editorContent = [match.slice(0, captionIndex), 'caption text: ', match.slice(captionIndex)].join('')
      }
    }
    return {
      reviewDisplay: html.replace(/\<p[^<]*\<img/g, '<p class="imgContainer"><img'),
      editorDisplay: html.replace(/\<p[^<]*\<img.*?\<\/p\>/g, editorContent)
    }
  }

  return html
}

export const arrayIdMatch = (fullList, idMatches) => {
  const matchString = idMatches.join('');
  const result = []
  for (let i = 0; i < fullList.length; i++) {
    if (matchString.includes(fullList[i].id)) {
      result.push(fullList[i].name)
    }
  }

  return result
}

export const parseUrlQuery = (queryString) => {
  const regex = new RegExp(`[?&]${queryString}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(window.history.state.url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const formatMovieRelease = (date) => {
  const DateObj = new Date(date)
  const formattedDate = dateFormat(DateObj, "mmmm dS, yyyy")

  return formattedDate
}

export const formatReviewDate = (date) => {
  const DateObj = new Date(date)
  const formattedDate = dateFormat(DateObj, "mmmm dS yyyy, @ h:MM TT")

  return formattedDate
}

export const convertToKabob = (string) => {
  let removedCharacters = string.replace(/[^\w\s]/gi, '')
  return removedCharacters.replace(/\s+/g, '-').toLowerCase()
}