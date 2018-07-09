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
  for (let i = 0; i < fullList.length; i ++) {
    if (matchString.includes(fullList[i].id)) {
      result.push(fullList[i].name)
    }
  }

  return result
}

export const parseUrlQuery = (queryString) => {
  const regex = new RegExp(`[?&]${queryString}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(window.location.href)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const formatMovieRelease = (date) => {
  let result = ''
  const month = new Date(date).getMonth()
  const day = new Date(date).getDate()
  const year = new Date(date).getFullYear()

  switch(month) {
    case 0:
      result = 'January'
      break
    case 1:
      result = 'February'
      break
    case 2:
      result = 'March'
      break
    case 3:
      result = 'April'
      break
    case 4:
      result = 'May'
      break
    case 5:
      result = 'June'
      break
    case 6:
      result = 'July'
      break
    case 7:
      result = 'August'
      break
    case 8:
      result = 'September'
      break
    case 9:
      result = 'October'
      break
    case 10:
      result = 'November'
      break
    case 11:
      result = 'December'
      break
    default:
      return 'No Date Found'
  }

  return result += ` ${day}, ${year}` 
}

export const formatReviewDate = (date) => {
  let result = ''
  let hours = new Date(date).getHours()
  const minutes = new Date(date).getMinutes()
  const dateNum = new Date(date).getDate()
  const month = new Date(date).getMonth()
  const year = new Date(date).getFullYear()

  switch (month) {
    case 0:
      result += 'Jan'
      break
    case 1:
      result += 'Feb'
      break
    case 2:
      result += 'Mar'
      break
    case 3:
      result += 'Apr'
      break
    case 4:
      result += 'May'
      break
    case 5:
      result += 'Jun'
      break
    case 6:
      result += 'Jul'
      break
    case 7:
      result += 'Aug'
      break
    case 8:
      result += 'Sep'
      break
    case 9:
      result += 'Oct'
      break
    case 10:
      result += 'Nov'
      break
    case 11:
      result += 'Dec'
      break
    default:
      return 'Incorrect Month supplied'
  }

  const time = () => {
    let meridiem = ' AM'
    if (hours > 12) {
      hours -= 12
      meridiem = ' PM'
    }

    return `${hours}:${minutes} ${meridiem}`
  }

  return result += ` ${dateNum}, ${year} @ ${time()}`
}

export const convertToKabob = (string) => {
  return string.replace(/\s+/g, '-').toLowerCase()
}