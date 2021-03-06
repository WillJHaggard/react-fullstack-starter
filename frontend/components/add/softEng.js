import {clone, map} from "ramda";
import Globalize from "globalize";
import Class from "classnames";
import {branch} from "baobab-react/decorators";
import React from "react";
import {Link} from "react-router";
import DocumentTitle from "react-document-title";
import api from "shared/api/softEng";
import {debounce, hasValues} from "shared/helpers/common";
import {formatQuery} from "shared/helpers/jsonapi";
import {formatTyped} from "shared/formatters";
import {softEng} from "shared/types";
import {statics} from "frontend/helpers/react";
import actions from "frontend/actions/softEng";
import alertActions from "frontend/actions/alert";
import {ShallowComponent, DeepComponent, ItemLink, NotFound} from "frontend/components/common";
import state from "frontend/state";

let dataCursor = state.select(api.plural);

let validateFormDebounced = debounce(key => {
  actions.validateAddForm(key).catch(err => null);
}, 500);

@statics({
  loadData: actions.loadIndex,
})
@branch({
  cursors: {
    form: [api.plural, "addForm"],
    errors: [api.plural, "addFormErrors"],
  }
})
export default class softEngAdd extends DeepComponent {
  handleBlur(key) {
    actions.validateAddForm(key).catch(err => null);
  }

  handleChange(key, data) {
    actions.updateAddForm(key, data);
    validateFormDebounced(key);
  }

  handleSubmit() {
    actions
      .validateAddForm("")
      .then(actions.addItem)
      .then(item => {
        alertActions.addItem({
          message: "Engineer added with id: " + item.id,
          category: "success",
        });
      })
      .catch(error => {
        alertActions.addItem({
          message: "Failed to add Engineer: " + error,
          category: "error",
        });
      });
  }

  render() {
    let {form, errors} = this.props;

    return (
      <DocumentTitle title={"Add Engineer"}>
        <div>
          <Actions {...this.props}/>
          <section className="container margin-top-lg">
            <div className="row">
              <div className="col-xs-12 col-sm-9">
                <h1 className="nomargin-top">Add Software Engineer</h1>
                <fieldset>
                  <div className={Class("form-group", {
                    required: false,
                    error: Boolean(errors.name),
                  })}>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                      value={form.name}
                      onBlur={() => this.handleBlur("name")}
                      onChange={event => this.handleChange("name", event.currentTarget.value)}
                      id="name" ref="name"
                      className="form-control"/>
                    <div className={Class("help", {
                      error: Boolean(errors.name),
                    })}>
                      {map(message => <span key="">{message}</span>, [errors.name])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                    required: false,
                    error: Boolean(errors.citizenship),
                  })}>
                    <label htmlFor="citizenship">Citizenship</label>
                    <input type="text"
                      value={form.citizenship}
                      onBlur={() => this.handleBlur("citizenship")}
                      onChange={event => this.handleChange("citizenship", event.currentTarget.value)}
                      id="citizenship" ref="citizenship"
                      className="form-control"/>
                    <div className={Class("help", {
                      error: Boolean(errors.citizenship),
                    })}>
                      {map(message => <span key="">{message}</span>, [errors.citizenship])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                    required: false,
                    error: Boolean(errors.birthDate),
                  })}>
                    <label htmlFor="birthDate">Birth Date</label>
                    <input type="text"
                      value={form.birthDate}
                      onBlur={() => this.handleBlur("birthDate")}
                      onChange={event => this.handleChange("birthDate", event.currentTarget.value)}
                      id="birthDate" ref="birthDate"
                      className="form-control"/>
                    <div className={Class("help", {
                      error: Boolean(errors.birthDate),
                    })}>
                      {map(message => <span key="">{message}</span>, [errors.birthDate])}
                    </div>
                  </div>
                </fieldset>
                <div className="btn-group">
                  <button className="btn btn-default" type="button" onClick={() => this.handleReset()}>Reset</button>
                  <button className="btn btn-primary" type="button" onClick={() => this.handleSubmit()} disabled={hasValues(errors)}>Submit</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DocumentTitle>
    );
  }
}

class Actions extends ShallowComponent {
  render() {
    return (
      <div className="actions">
        <div className="container">
          <div className="btn-group btn-group-sm pull-left">
            <Link to="softEng-index" className="btn btn-gray-light" title="Back to list">
              <span className="fa fa-arrow-left"></span>
              <span className="hidden-xs margin-left-sm">Back to list</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
