import React from 'react';
import CateListPage from 'pages/categoryManagement/CateListPage/CateListPage';
import CateActionPage from 'pages/categoryManagement/CateActionPage/CateActionPage';
import ProductListPage from './pages/productManagement/ProductListPage/ProductListPage';
import ProductActionPage from './pages/productManagement/ProductActionPage/ProductActionPage';
import AppSecurity from 'pages/pageDemo';
// import AppSecurity from 'containers/App';

export const adminRoutes = [
    {
        path: '/cate-list',
        exact: false,
        main: () => <CateListPage />
    },
    {
        path: '/cate/add',
        exact: false, 
        main: ({ location, history }) => <CateActionPage location={location} history={history} />
    },
    {
        path: '/security-api',
        exact: false,
        main: () => <AppSecurity/>
    },
    {
        path: '/cate/:id/:pagination/edit',
        exact: false,
        main: ({ match, history }) => <CateActionPage match={match} history={history} />
    },
    {
        path: '/product-list',
        exact: false,
        main: () => <ProductListPage />
    },
    {
        path: '/product/add',
        exact: false, 
        main: ({ location, history }) => <ProductActionPage location={location} history={history} />
    },
    {
        path: '/product/:id/:pagination/edit',
        exact: false,
        main: ({ match, history }) => <ProductActionPage match={match} history={history} />
    },
];
export const userRoutes = [
    {
        path: '/cate-list',
        exact: false,
        main: () => <CateListPage />
    },
    {
        path: '/security-api',
        exact: false,
        main: () => <AppSecurity/>
    },
    {
        path: '/product-list',
        exact: false,
        main: () => <ProductListPage/>
    },
];
