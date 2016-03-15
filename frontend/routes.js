import React from "react";
// uxEng & softEng



// Eager Components
import {Route, DefaultRoute, NotFoundRoute} from "react-router";
import Body from "frontend/components/body";
import {About, Tech, Credits} from "frontend/components/page";
import {NotFound} from "frontend/components/common";

//Lazy Components
//import {uxEngIndex, uxEngAdd, uxEngDetail, uxEngEdit} from "react-proxy!frontend/components/uxEng";
//import {softEngIndex, softEngAdd, softEngDetail, softEngEdit} from "react-proxy!frontend/components/softEng";
//Not compatible. Check for React-Router to allow metadata passing!
import {uxEngIndex, uxEngAdd, uxEngDetail, uxEngEdit} from "frontend/components/uxEng";
import {softEngIndex, softEngAdd, softEngDetail, softEngEdit} from "frontend/components/softEng";

export default (
  <Route path="/" handler={Body}>
    <DefaultRoute name="about" handler={About}/>
    <Route path="/tech" name="tech" handler={Tech}/>
    <Route path="/credits" name="credits" handler={Credits}/>
    <NotFoundRoute handler={NotFound}/>

    <Route path="/uxEng/" name="uxEng-index" handler={uxEngIndex}/>
    <Route path="/uxEngs/add" name="uxEng-add" handler={uxEngAdd}/>
    <Route path="/uxEngs/:id" name="uxEng-detail" handler={uxEngDetail}/>
    <Route path="/uxEngs/:id/edit" name="uxEng-edit" handler={uxEngEdit}/>

    <Route path="/softEngs/" name="softEng-index" handler={softEngIndex}/>
    <Route path="/softEngs/add" name="softEng-add" handler={softEngAdd}/>
    <Route path="/softEngs/:id" name="softEng-detail" handler={softEngDetail}/>
    <Route path="/softEngs/:id/edit" name="softEng-edit" handler={softEngEdit}/>
  </Route>
);
