import React, { Component } from 'react';
import './CateListPage.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';
import swal from 'sweetalert';
import MyButton from 'components/button/Button';
import * as Msal from 'msal';

import {applicationConfig} from 'utils/securityAPI/apiCaller';

import {actFetchCategoryRequest, actDeleteCategoryRequest, searchCategoryRequest} from 'redux/categoryManagement/actions/index';
import {FormGroup,FormControl,Form,Button} from 'react-bootstrap';
class CateListPage extends Component {  
    constructor(props){
        super(props);
        this.state={
            iSearch:"ALL",
            pageSize:5,
            pageIndex:1,
            listPageVisit:[1],
            listPageVisitFilter:[1],
        };
    }
    login=()=> {
        var clientApplication = new Msal.UserAgentApplication(applicationConfig.clientID, applicationConfig.authority, function (errorDesc, token, error, tokenType) {
        });
        var that =this;
        clientApplication.loginPopup(applicationConfig.b2cScopes).then( (idToken) =>{
            clientApplication.acquireTokenSilent(applicationConfig.b2cScopes).then( (accessToken)=> {
                sessionStorage.setItem("accessToken",accessToken);
                console.log(accessToken +" phong 1");
                that.componentDidMount();
                that.forceUpdate();
            }, function (error) {
                clientApplication.acquireTokenPopup(applicationConfig.b2cScopes).then(function (accessToken) {
                    sessionStorage.setItem("accessToken",accessToken);
                    that.componentDidMount();
                    that.forceUpdate();
                    console.log(accessToken+" phong 2");
                }, function (error) {
                    console.log("Error acquiring the popup:\n" + error);
                });
           
            })
        }, function (error) {
            console.log("Error during login:\n" + error);
        });
        this.render();
    }
    componentDidMount(){
        if(sessionStorage.getItem('accessToken')!==null) {
            var {pageSize,pageIndex,iSearch} = this.state;
            this.props.fetchAllCategory(pageSize,pageIndex,iSearch);
        }
    }
    componentWillMount(){
        // Gọi trước khi component đc render lần đầu tiên 
        var {pageSize,pageIndex,iSearch} = this.state;
        if(sessionStorage.getItem('accessToken')!==null) {
            this.props.fetchAllCategory(pageSize,pageIndex,iSearch);
        }
    }
    onChange=e =>{
        var val =e.target.value;
        if(val.trim()===''){
            this.setState({iSearch:"ALL"});
            this.props.fetchAllCategory(this.state.pageSize,this.state.pageIndex,"ALL");
        }else{
            this.setState({iSearch:e.target.value},function(){
             this.props.searchCategory(this.state.pageSize,this.state.pageIndex,this.state.iSearch);
            });
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
    }

    searchHandle=e=>{
        e.preventDefault();
        var word = this.state.iSearch;
        if(word!==''){
            if(word==='ALL'){
                this.props.fetchAllCategory(this.state.pageSize,this.state.pageIndex,"ALL");
            }else{
                console.log(word+" is word search, pageSize: "+this.state.pageSize+" pageInd: "+this.state.pageIndex);
                this.props.searchCategory(this.state.pageSize,this.state.pageIndex,word);
            }
        }else{
            console.log("Lỗi này hơi bị ghê!!!");
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
       
    }
    onDelete = (id) => { 
        var {onDeleteCategory} = this.props;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                onDeleteCategory(id,this.state.pageSize,this.state.pageIndex,this.state.iSearch);
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }
    
    logout=()=> {
        var clientApplication = new Msal.UserAgentApplication(applicationConfig.clientID, applicationConfig.authority, function (errorDesc, token, error, tokenType) {
        });
        clientApplication.logout();
        sessionStorage.removeItem('accessToken');
        // this.forceUpdate();
        this.render();
    }

    render() {
        var { isFetchingCategory,categorys,fetchAllCategory,searchCategory } = this.props;
       return (sessionStorage.getItem('accessToken')===null) ?
            (<div>
               <h1 style={{color:'red'}}>Để xem chức năng này bạn cần phải đăng nhập trước!!!</h1>
                <Button onClick={this.login}>Đăng nhập</Button>
           </div>)
        :
         (<div className="container-content">
               
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="container-table">
                            <div className="row-button">
                                <div className="button-left">
                                    <Link to="/cate/add" className="btn btn-primary mb-5">
                                        <i className="glyphicon glyphicon-plus"></i> Thêm Sản Phẩm
                                    </Link>
                                </div>
                                <div className="button-right" >
                                    <Button style={{float:'right'}} onClick={this.logout}>Đăng xuất</Button>
                                </div>
                                <div className="button-right" >
                                    <Form inline onSubmit={this.searchHandle}>
                                        <FormGroup controlId="formInlineName">
                                            <FormControl onChange={this.onChange} type="text" name="iSearch" ref="iSearch" placeholder="Search by word..." />
                                        </FormGroup>{' '}
                                        <Button type="submit">Search</Button>
                                    </Form>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                           <div style={{width:'100%',marginTop:'30px',}}>
                           <ReactTable data={categorys}
                                        loading={isFetchingCategory}
                                        defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                        columns={[
                                        {
                                            Header: "ID",
                                            id: "productCategoryCode",
                                            accessor: d => d.productCategoryCode,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["productCategoryCode"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Description",
                                            id: "productCategoryDescription",
                                            accessor: d => d.productCategoryDescription,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["productCategoryDescription"] }),
                                            filterAll: true
                                        },
                                        
                                        {
                                            Header: "Edit",
                                            accessor:"productCategoryCode",
                                            filterable:false,
                                            Cell: row => (
                                            <div className="button-table"> 
                                                <MyButton small aria_label='EDIT' 
                                                    ID={row.value}
                                                    obj="cate"
                                                    pagination={[
                                                        this.state.pageIndex,
                                                        this.state.pageSize,
                                                        this.state.iSearch
                                                ]}/>
                                            </div>
                                            )
                                        },
                                        {   
                                            Header: "Delete",
                                            accessor:"productCategoryCode",
                                            filterable:false,
                                            Cell: row => (
                                            <div className="button-table"> 
                                                <MyButton  size="small"  aria_label='DELETE' 
                                                    onClickComponent={()=>this.onDelete(row.value)}/> 
                                            </div>
                                            )
                                        }]}
                                        defaultPageSize={5}
                                        onPageChange={(pageInd) => {
                                            var stringFilter = this.state.iSearch;
                                                if(stringFilter===''||stringFilter==="ALL"){
                                                    var pageVisit = this.state.listPageVisit;
                                                    this.setState({
                                                    pageIndex:pageInd+1,
                                                    listPageVisitFilter:[],
                                                },
                                                    function(){
                                                        // console.log(this.state.listPageVisit);
                                                        var isPageVisit= this.state.listPageVisit.includes(pageInd+1);
                                                        if(isPageVisit===false){
                                                            pageVisit.push(pageInd+1);
                                                            this.setState({listPageVisit:pageVisit, });
                                                            fetchAllCategory(
                                                                this.state.pageSize,
                                                                this.state.pageIndex,
                                                                "ALL"
                                                            );
                                                           
                                                        }
                                                    });
                                                }else{
                                                    this.setState({pageIndex:pageInd+1,listPageVisit:[]},
                                                        function(){
                                                            var pageVisit = this.state.listPageVisitFilter;
                                                            var isPageVisit= this.state.listPageVisitFilter.includes(pageInd+1);
                                                            if(isPageVisit===false){
                                                                pageVisit.push(pageInd+1);
                                                                this.setState({listPageVisitFilter:pageVisit, });
                                                                searchCategory(
                                                                    this.state.pageSize,
                                                                    this.state.pageIndex,
                                                                    stringFilter
                                                                );
                                                            }
        
                                                        });
                                                    }

                                            }
                                        } // Called when the page index is changed by the user
                                        onPageSizeChange={(pSize, pIndex) => {
                                            this.setState({
                                                pageIndex:pIndex+1,
                                                pageSize:pSize,
                                                listPageVisit:[],
                                                listPageVisitFilter:[],
                                            },
                                                function(){
                                                    if(this.state.iSearch===0||
                                                        this.state.iSearch===''||
                                                        this.state.iSearch==="ALL"){
                                                            fetchAllCategory(
                                                                this.state.pageSize,
                                                                this.state.pageIndex,
                                                                "ALL"
                                                            );
                                                        }else{
                                                            searchCategory(
                                                                this.state.pageSize,
                                                                this.state.pageIndex,
                                                                this.state.iSearch
                                                            );
                                                        }
                                                });                                            
                                            }
                                        } 
                                        className="-striped -highlight"
                                    />
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {

    return {
        categorys: state.categorys_index,
        isFetchingCategory:state.isFetchingCategory
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCategory: (pageSize,pageIndex,StringFilter) => {
            dispatch(actFetchCategoryRequest(pageSize,pageIndex,StringFilter));
        },
        searchCategory: (pageSize,pageNow,keywork) => {
            dispatch(searchCategoryRequest(pageSize,pageNow,keywork))
        },
        onDeleteCategory: (id,pageSize,pageIndex,StringFilter) => {
            dispatch(actDeleteCategoryRequest(id,pageSize,pageIndex,StringFilter));
        },
        

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CateListPage);
