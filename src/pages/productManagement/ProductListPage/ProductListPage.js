import React, { Component } from 'react';
import './ProductListPage.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';
import swal from 'sweetalert';
import MyButton from 'components/button/Button';
import MyDropdownList from 'components/dropdown/MyDropdownBT.js';
import { actFetchProductsRequest, actDeleteProductRequest, searchProductRequest ,getTotalProduct } 
        from 'redux/productManagement/actions/index';
import {actFetchCategoryProductRequest} from 'redux/productManagement/actions/cates';
import {FormGroup,FormControl,Form,Button} from 'react-bootstrap';

import {login,logout} from 'utils/securityAPI/apiCaller';
import {ACCESS_TOKEN} from 'settings/sessionStorage';
import {setScopeAccess} from 'redux/categoryManagement/actions/cates';

class ProductListPage extends Component {  
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
    componentDidMount(){
        var {pageSize,pageIndex,iSearch} = this.state;
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var obj = JSON.parse(ss);
        if(ss!==null){
            this.props.fetchAllProducts(pageSize,pageIndex,iSearch);
            this.props.fetchAllCategoryProduct();
            this.props.setScopeOfUser(obj.profile['name']);
        }
    }
    componentWillMount(){
        // Gọi trước khi component đc render lần đầu tiên 
        var {pageSize,pageIndex,iSearch} = this.state;
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var obj = JSON.parse(ss);
        if(ss!==null){
            this.props.fetchAllProducts(pageSize,pageIndex,iSearch);
            this.props.fetchAllCategoryProduct();
            this.props.setScopeOfUser(obj.profile['name']);
        }
    }
    onChange=e =>{
        var val =e.target.value;
        if(val.trim()===''){
            this.setState({iSearch:"ALL"});
            this.props.fetchAllProducts(this.state.pageSize,this.state.pageIndex,"ALL");
            this.props.fetchAllCategoryProduct();
        }else{
            this.setState({iSearch:e.target.value},function(){
             this.props.searchProduct(this.state.pageSize,this.state.pageIndex,this.state.iSearch);
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
                this.props.fetchAllProducts(this.state.pageSize,this.state.pageIndex,"ALL");
                this.props.fetchAllCategoryProduct();
            }else{
                console.log(word+" is word search, pageSize: "+this.state.pageSize+" pageInd: "+this.state.pageIndex);
                this.props.searchProduct(this.state.pageSize,this.state.pageIndex,word);
            }
        }else{
            console.log("Lỗi này hơi bị ghê!!!");
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
       
    }
    onDeleteProduct = (id) => { 
        var {onDeleteProduct,saveCateCode} = this.props;
        var StringFilter=this.state.iSearch;
        if(saveCateCode==='all-cate'){
          StringFilter='ALL';
        }
        if(saveCateCode!=='null') StringFilter=saveCateCode;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                onDeleteProduct(id,this.state.pageSize,this.state.pageIndex,StringFilter);
                
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }
    render() {
        var { isFetching,products,categorys,fetchAllProducts,searchProduct,saveCateCode,scopeOfUser } = this.props;
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        var isDisabled = (scopeOfUser.includes("PRODUCT.WRITE"))?false:true;
       return (ss===null) ?
            (<div>
               <h1 style={{color:'red'}}>Để xem chức năng này bạn cần phải đăng nhập trước!!!</h1>
                <Button bsStyle="success" onClick={login}>Đăng nhập</Button>
           </div>)
        :(!products.includes(undefined))?
         (
            <div className="container-content">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="container-table">
                            <div className="row-button">
                                <div className="button-left">
                                    {
                                      (!isDisabled) ?
                                        (
                                            <Link to="/product/add" className="btn btn-primary mb-5">
                                                <i className="glyphicon glyphicon-plus"></i> Thêm Sản Phẩm
                                            </Link>
                                        ):
                                        ( <div>  </div> )
                                   } 
                                </div>
                                <div className="button-right" >
                                    <Button style={{float:'right'}} onClick={logout}>Đăng xuất</Button>
                                </div>
                                <div className="button-right" >
                                    <Form inline onSubmit={this.searchHandle}>
                                        <FormGroup controlId="formInlineName">
                                            <FormControl onChange={this.onChange} type="text" name="iSearch" ref="iSearch" placeholder="Search by word..." />
                                        </FormGroup>{' '}
                                        <Button type="submit">Search</Button>
                                    </Form>
                                </div>
                                <div className="button-right">
                                    <div className="backGround-dropdown" 
                                            onClick={()=>{
                                                this.setState({isActiveDropdown:true})
                                            }}>
                                        <MyDropdownList
                                         pagination={[ 
                                             this.state.pageIndex,
                                             this.state.pageSize,
                                            ]} 
                                         cateButton="Primary" 
                                         title="Category" id="1" 
                                         listCate={categorys}/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                           <div style={{width:'100%',marginTop:'30px',}}>
                           <ReactTable data={products}
                                        loading={isFetching}
                                        defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                        columns={[
                                        {
                                            Header: "ID",
                                            id: "productId",
                                            accessor: d => d.productId,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["productId"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Name",
                                            id: "productName",
                                            accessor: d => d.productName,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["productName"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Category",
                                            id: "productCategoryCode",
                                            accessor: d => d.productCategoryCode,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["productCategoryCode"] }),
                                            Cell: row=>{

                                                var result ="";
                                                categorys.forEach((cate, index) => {
                                                    if (cate.productCategoryCode === row.value) {
                                                        result = cate.productCategoryDescription;
                                                    }
                                                });
                                                return result;
                                            }
                                            ,
                                            
                                            filterAll: true
                                        },
                                        {
                                            Header: "Price",
                                            id: "productPrice",
                                            accessor: d => d.productPrice,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["productPrice"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Detail",
                                            id: "otherProductDetails",
                                            accessor: d => d.otherProductDetails,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["otherProductDetails"] }),
                                            filterAll: true
                                        },
                                        {
                                            
                                            Header: "Edit",
                                            accessor:"productId",
                                            filterable:false,
                                            Cell: row => (
                                            <div className="button-table"> 
                                                <MyButton small aria_label='EDIT' 
                                                    ID={row.value} 
                                                    obj="product"
                                                    isDisabled={isDisabled}
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
                                            accessor:"productId",
                                            filterable:false,
                                            Cell: row => (
                                            <div className="button-table"> 
                                                <MyButton size="small" 
                                                    aria_label='DELETE' 
                                                    isDisabled={isDisabled}
                                                    onClickComponent={()=>this.onDeleteProduct(row.value)}
                                                    productId={row.value} 
                                                    pagination={[this.state.pageIndex,this.state.pageSize,this.state.iSearch]}/> 
                                            </div>
                                            )
                                        }]}
                                        defaultPageSize={5}
                                        onPageChange={(pageInd) => {
                                            var stringFilter=(saveCateCode!=='null')?saveCateCode:this.state.iSearch;
                                            if(saveCateCode==='all-cate'){
                                                this.setState({
                                                    listPageVisit:[],
                                                    listPageVisitFilter:[],
                                                    iSearch:'ALL'
                                                });
                                            }
                                            if(saveCateCode==='null'||saveCateCode==='all-cate'){
                                                if(stringFilter===''||stringFilter===0||stringFilter==="ALL"){
                                                    var pageVisit = this.state.listPageVisit;
                                                    this.setState({
                                                    pageIndex:pageInd+1,
                                                    listPageVisitFilter:[],
                                                    isActiveDropdown:false,
                                                },
                                                    function(){
                                                        // console.log(this.state.listPageVisit);
                                                        var isPageVisit= this.state.listPageVisit.includes(pageInd+1);
                                                        if(isPageVisit===false){
                                                            pageVisit.push(pageInd+1);
                                                            this.setState({listPageVisit:pageVisit, });
                                                            fetchAllProducts(
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
                                                                searchProduct(
                                                                    this.state.pageSize,
                                                                    this.state.pageIndex,
                                                                    stringFilter
                                                                );
                                                            }
        
                                                        });
                                                    }
                                            }else{
                                                this.setState({
                                                    listPageVisit:[],
                                                    listPageVisitFilter:[],
                                                    pageIndex:pageInd+1,
                                                },()=>{
                                                    var pageVisit = this.state.listPageVisitFilter;
                                                    var isPageVisit= this.state.listPageVisitFilter.includes(pageInd+1);
                                                    if(isPageVisit===false){
                                                        pageVisit.push(pageInd+1);
                                                        this.setState({listPageVisitFilter:pageVisit, });
                                                        searchProduct(
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
                                                            fetchAllProducts(
                                                                this.state.pageSize,
                                                                this.state.pageIndex,
                                                                "ALL"
                                                            );
                                                        }else{
                                                            searchProduct(
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
        ):(<div>
            <h1 style={{color:'red'}}>Đã gặp sự cố, bạn vui lòng tải lại trang để tiếp tục!!!</h1>
                <Button bsStyle="success" onClick={()=>{
                   window.location.reload();
                }}>Tải lại</Button>
        </div>);
    }
}
const mapStateToProps = state => {
    return {
        saveCateCode:state.saveCateCode,
        totalData:state.totalData,
        products: state.products,
        categorys: state.categorys,
        isFetching:state.isFetching,
        scopeOfUser : state.scopeOfUser
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: (pageSize,pageIndex,StringFilter) => {
            dispatch(actFetchProductsRequest(pageSize,pageIndex,StringFilter));
        },
        fetchAllCategoryProduct:()=>{
            dispatch(actFetchCategoryProductRequest());
        },
        onDeleteProduct: (productId,pageSize,pageIndex,StringFilter) => {
            dispatch(actDeleteProductRequest(productId,pageSize,pageIndex,StringFilter));
        },
        searchProduct: (pageSize,pageNow,keywork) => {
            dispatch(searchProductRequest(pageSize,pageNow,keywork))
        },
        getTotalData: (stringFilter,condition) => {
            dispatch(getTotalProduct(stringFilter,condition))
        },
        setScopeOfUser: (scope) => {
            dispatch(setScopeAccess(scope));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
