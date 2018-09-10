import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {adminRoutes,userRoutes} from '../routes';
import Menu from '../components/menu/Menu';
import {setScopeAccess} from 'redux/categoryManagement/actions/cates';
import { connect } from 'react-redux';

import {ACCESS_TOKEN} from 'settings/sessionStorage';
class App extends Component {
    componentDidMount(){
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var obj = JSON.parse(ss);
        if(ss!==null){
            this.props.setScopeOfUser(obj.profile['name']);
        } 
       
    }
    render() {
        return (
            <Router>
                <div className="container-crud">
                    <Menu />
                    {
                        this.props.scopeOfUser.includes("PRODUCT.WRITE")||this.props.scopeOfUser.includes("CATE.WRITE")?
                        this.showContentMenus(adminRoutes):
                        this.showContentMenus(userRoutes)
                    }
                </div>
            </Router>
        );
    }

    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                );
            });
        }
        return <Switch>{result}</Switch>;
    }

}
const mapStateToProps = state => {
    return {
        scopeOfUser : state.scopeOfUser,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        setScopeOfUser: (scope) => {
            dispatch(setScopeAccess(scope));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
