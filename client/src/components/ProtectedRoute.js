
import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withCookies } from 'react-cookie'

class ProtectedRoute extends React.Component {

    isAuthenticated() {
        const token = this.props.cookies.get('token')

        if (!token || token === "undefined" || token === "null") {
            return false
        }

        return true
    }

    render() {
        const Comp = this.props.component

        return (
            this.isAuthenticated() ? (
                <Comp />
            ) : (
                    <Redirect to="/" />
                )
        )

    }
}

export default withCookies(withRouter(ProtectedRoute))