import React, { Component } from 'react';
import '../css/loader.css';

export default class FourOhFour extends Component {
  render() {
    return (
      <div className="loader">
        <h1>
          404 <span className="bullets">?</span>
        </h1>
      </div>
    );
  }
}
/**
 *
 * <div class="content">
  <div class="browser-bar">
    <span class="close button"></span>
    <span class="min button"></span>
    <span class="max button"></span>
  </div>
  <div class="text">Oops! It looks like you're lost. <br> Sorry about that. <br> Let me try and help. <br> </div>
</div>

 */