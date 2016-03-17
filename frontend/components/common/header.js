import React from "react";
import throttle from "lodash.throttle";
import {Component} from "./component";

export default class Header extends Component {
  static propTypes = {
    component: React.PropTypes.string,
    toggleClasses: React.PropTypes.object,
  }

  static defaultProps = {
    component: "div",
    toggleClasses: {
      visible: "navbar-down",
      hidden: "navbar-up"
    },
  }

  constructor() {
    super();
    this.state = {
      className: "",
    };
  }

  hasScrolled() {
    let windowHeight = window.innerHeight;
    let topPosition = document.body.scrollTop;
    let documentHeight = document.body.clientHeight;

    // Make sure users scroll more than delta
    if (Math.abs(this.lastScrollTop - topPosition) <= this.deltaHeight) { return; }

    // If they scrolled down and are past the navbar, add class `this.props.toggleClasses.visible`.
    // This is necessary so you never see what is "behind" the navbar.
    if (topPosition > this.lastScrollTop && topPosition > this.elementHeight) {
      this.setState({className: this.props.toggleClasses.hidden});
    }
    else {
      if ((topPosition + windowHeight) < documentHeight) {
        this.setState({className: this.props.toggleClasses.visible});
      }
    }
    this.lastScrollTop = topPosition;
  }

  componentDidMount() {
    // Init options
    this.deltaHeight = this.props.deltaHeight ? this.props.deltaHeight : 5;
    this.delay = this.props.delay ? this.props.delay : 250;
    this.lastScrollTop = 0;
    this.elementHeight = React.findDOMNode(this).offsetHeight;

    // Add event handler on scroll
    window.addEventListener("scroll", throttle(this.hasScrolled, this.delay), false);

    // Update component"s className
    this.setState({className: this.props.toggleClasses.visible});
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.hasScrolled, false);
  }

  render() {
    let component = this.props.component;
    let props = {className: this.props.className + " " + this.state.className};
    return React.createElement(
      component,
      props,
      this.props.children
    );
  }
}
import {filter} from "ramda";
import React from "react";
import {Component, ShallowComponent} from "./component";

export default class TextHolder extends ShallowComponent {
  getListOfNodeParents(el) {
    let parents = [];
    while (el) {
      parents.unshift(el);
      el = el.parentNode;
    }
    return parents;
  }

  updateMaxWidth() {
    let sectionNode = React.findDOMNode(this);

    // http://www.pearsonified.com/2012/01/characters-per-line.php
    let lettersPerRow = this.props.lettersPerRow || 80;
    let relation = this.props.relation || 2.1;
    let ps = sectionNode.querySelectorAll("p");
    let dropDisabledItems = filter(item => item.classList && !item.classList.contains("disable-holder"));
    for (let p of ps)  {
      let parents = this.getListOfNodeParents(p);
      let enabledParents = dropDisabledItems(parents);
      if (enabledParents.length) {
        let fontSize = parseInt(window.getComputedStyle(p)["font-size"]); // result is always px
        let maxWidth = parseInt(lettersPerRow * (fontSize / relation));
        p.style.maxWidth = maxWidth + "px";
      }
    }
  }

  componentDidMount() {
    this.updateMaxWidth();
  }

  componentDidUpdate() {
    this.updateMaxWidth();
  }

  render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
}
