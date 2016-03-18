import Globalize from "globalize";
import {branch} from "baobab-react/decorators";
import React from "react";
import {Link} from "react-router";
import DocumentTitle from "react-document-title";
import api from "shared/api/softEng";
import {statics} from "frontend/helpers/react";
import state from "frontend/state";
import actions from "frontend/actions/softEng";
import {ShallowComponent, DeepComponent, ItemLink, NotFound} from "frontend/components/common";

let dataCursor = state.select(api.plural);

@statics({
  loadData: actions.establishItem,
})
@branch({
  cursors: {
    havePendingRequests: [api.plural, "havePendingRequests"],
    item: [api.plural, "currentItem"],
  }
})
export default class softEngDetail extends DeepComponent {
  render() {
    let {havePendingRequests, item} = this.props;

    if (item) {
      return (
        <DocumentTitle title={"Detail " + item.name}>
          <div>
            <Actions {...this.props}/>
            <section className="container margin-top-lg">
              <div className="row">
                <div className="col-xs-12 col-sm-3">
                  <div className="thumbnail">
                    <img src={"http://flathash.com/" + item.id + "?set=set2&size=200x200"} width="200px" height="200px"/>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-9">
                  <h1 className="nomargin-top">{item.name}</h1>
                  <dl>
                    <dt>Serial Number</dt>
                    <dd>{item.id}</dd>
                    <dt>citizenship</dt>
                    <dd>{item.citizenship}</dd>
                    <dt>Birth Date</dt>
                    <dd>{Globalize.formatDate(item.birthDate)}</dd>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </DocumentTitle>
      );
    } else if (havePendingRequests) {
      return null;
    } else {
      return <NotFound/>;
    }
  }
}

class Actions extends ShallowComponent {
  render() {
    let {item} = this.props;

    return (
      <div className="actions">
        <div className="container">
          <div className="btn-group btn-group-sm pull-left">
            <Link to="softEng-index" className="btn btn-gray-light" title="Back to list">
              <span className="fa fa-arrow-left"></span>
              <span className="hidden-xs margin-left-sm">Back to list</span>
            </Link>
          </div>
          <div className="btn-group btn-group-sm pull-right">
            <Link to="softEng-add" className="btn btn-sm btn-green" title="Add">
              <span className="fa fa-plus"></span>
            </Link>
            <ItemLink to="softEng-edit" params={{id: item.id}} className="btn btn-orange" title="Edit">
              <span className="fa fa-edit"></span>
            </ItemLink>
            <a className="btn btn-red" title="Remove" onClick={() => actions.removeItem(item.id)}>
              <span className="fa fa-times"></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
