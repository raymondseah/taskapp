  
import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withCookies } from 'react-cookie'

class GuestRoute extends React.Component {

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
                <Redirect to="/" />
            ) : (
                <Comp />
            )
        )

    }
}

export default withCookies(withRouter(GuestRoute))