import React, { Component } from 'react'
import '../css/loader.css'

export default class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <h1>LOADING <span className="bullets">.</span></h1>
      </div>
    )
  }
}
