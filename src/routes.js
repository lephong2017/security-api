import React from 'react';
// import PageDemo1 from 'pages/pagedemo/page1.js';
// import PageDemo2 from 'pages/pagedemo/page2.js';
import CateListPage from 'pages/categoryManagement/CateListPage/CateListPage'
import CateActionPage from 'pages/categoryManagement/CateActionPage/CateActionPage';
import AppSecurity from 'pages/pageDemo';
// import AppSecurity from 'containers/App';
const routes = [
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
    // {
    //     path: '/page2',
    //     exact: false, 
    //     main: ({ location, history }) => <PageDemo2 location={location} history={history} />
    // },
    // {
    //     path: '/page1',
    //     exact: false, 
    //     main: ({ location, history }) => <PageDemo1 location={location} history={history} />
    // },
   
];

export default routes;