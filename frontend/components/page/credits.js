import React from "react";
import DocumentTitle from "react-document-title";
import {Component, TextHolder} from "frontend/components/common";

export default class Credits extends Component {
  render() {
    return (
      <DocumentTitle title="Credits">
        <TextHolder>
          <section className="container page home">
            <h1>Credits</h1>

            <h3>Idea</h3>
            <ul>
              <li><a href="https://twitter.com/ivankleshnin">Will Haggard</a>, inspired by <a href="https://github.com/HenrikJoreteg/humanjs-sample-app">AmpersandJS</a> <em>Humans</em> web-app sample</li>
            </ul>

            <h3>Design &amp; Programming</h3>
            <ul>
              <li><a href="https://willjhaggard.com/">WJH</a> Open Web Engineer</li>
            </ul>

            <h3>Assets</h3>
            <ul>
              <li>Pictures of <em>User Engineers</em> by Zikri Kader and <em>Software Engineers</em> by Hrvoje Novakovic from <a href="http://flathash.com/">flathash.com</a></li>
            </ul>
          </section>
        </TextHolder>
      </DocumentTitle>
    );
  }
}
