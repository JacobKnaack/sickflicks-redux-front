import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function isAuthorized(accessToken) {
  return Boolean(accessToken)
}

const AuthRoute = ({ component: Component, memberData, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (isAuthorized(memberData.accessToken)) {
        return <Component {...props} />
      } else {
        return <Redirect to='/unauthorized' />
      }
    }} />
  )
}

AuthRoute.propTypes = {
  memberData: PropTypes.object,
}

const mapStateToProps = state => ({
  memberData: state.member.data,
})

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthRoute)
