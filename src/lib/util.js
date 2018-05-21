export const renderIf = (test, component) => test ? component : null

export const renderEither = (test, component1, component2) => test ? component1 : component2

export const formatMovieRelease = (date) => {
  let result = ''
  const month = new Date(date).getMonth()
  const day = new Date(date).getDate()
  const year = new Date(date).getFullYear()

  switch(month) {
    case 1:
      result = 'January'
      break
    case 2:
      result = 'Februry'
      break
    case 3:
      result = 'March'
      break
    case 4:
      result = 'April'
      break
    case 5:
      result = 'May'
      break
    case 6:
      result = 'June'
      break
    case 7:
      result = 'July'
      break
    case 8:
      result = 'August'
      break
    case 9:
      result = 'September'
      break
    case 10:
      result = 'October'
      break
    case 11:
      result = 'November'
      break
    case 12:
      result = 'December'
      break
    default:
      return 'No Date Found'
  }

  return result += ` ${day}, ${year}` 
}