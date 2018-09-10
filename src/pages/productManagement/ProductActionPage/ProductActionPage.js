import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'; 
import { connect } from 'react-redux';
import { actAddProductRequest, actUpdateProductRequest, actGetProductRequest } from 'redux/productManagement/actions/index';
import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import {actFetchCategoryProductRequest} from 'redux/productManagement/actions/cates';
class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtCategory: '0323EQ',
            txtDetail: '',
            addAction:false,
            validationStateID:null,
            validationStateCate:null,
            validationStateName:null,
            validationStateDetail:null,
            validationNumber:null,
            pagination:[],
            number:'',
        };
    }

    componentWillMount() {
        var { match } = this.props;
        if (match) { // update
            var id = match.params.id;
            var pagination = match.params.pagination;
            this.setState({pagination:pagination.split(",")});
            this.props.onEditProduct(id);
        } else{
            this.setState({
                addAction:true,
                id: '',
                txtName: '',
                txtCategory: '0323EQ',
                txtDetail: '',
                number:'50107',
            });
        }
        this.props.fetchAllCategoryProduct();
        
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.addAction===false){
            if(nextProps && nextProps.itemEditing){
                var {itemEditing} = nextProps;
                this.setState({
                    id : itemEditing.productId,
                    txtCategory : itemEditing.productCategoryCode,
                    txtName : itemEditing.productName,
                    txtDetail : itemEditing.otherProductDetails,
                    number:itemEditing.productPrice
                })
            }
        }
    }


    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
        if(name+''==="txtName") this.setState({validationStateName:"success"});
        if(name+''==="txtDetail") this.setState({validationStateDetail:"success"});
        if(name+''==="id") this.setState({validationStateID:"success"});
        if(name+''==="txtCategory") this.setState({validationStateCate:"success"});
        if(name+''==="number") this.setState({validationNumber:"success"});
    }
    IsNumeric=(n)=> {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.addAction===false) {
            var { id, txtName, txtCategory, txtDetail,number } = this.state;
            console.log("update act: id:"+id +" name:"+ txtName +" cate:"+ txtCategory+" detail:"+txtDetail);
            var product = {
                productId: id,
                productCategoryCode: txtCategory,
                productName: txtName,
                otherProductDetails: txtDetail,
                productPrice:number
            };
           
            if(product.productCategoryCode===undefined||product.productCategoryCode===''||
                product.productName===undefined||product.otherProductDetails===''||
                product.otherProductDetails===undefined||product.productName===''){
                if(product.productCategoryCode===''){
                    this.setState({validationStateCate:'error'});
                } 
                if(product.otherProductDetails===''){
                    this.setState({validationStateDetail:'error'});
                } 
                if(product.productName==='') {
                    this.setState({validationStateName:'error'});
                }
                swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "success");
                e.preventDefault();
            }else{
                swal("Xong!", "Bạn đã sửa thành công!", "success");
                var pageIndex=this.state.pagination[0];
                var pageSize = this.state.pagination[1];
                var iSearch = this.state.pagination[2];
                var {saveCateCode} = this.props;
                if(saveCateCode==='all-cate') iSearch='ALL';
                if(saveCateCode!=='null') iSearch=saveCateCode;
                this.props.onUpdateProduct(product,pageIndex,pageSize,iSearch);
                this.setState({
                    validationStateID:null,
                    validationStateCate:null,
                    validationStateName:null,
                    validationStateDetail:null,
                    validationNumber:null,
                    id:'', 
                    txtName:'',
                    txtCategory:'0323EQ',
                    txtDetail:'',
                    number:'50107'
                });
                this.props.history.goBack();
            }
        } else {
            let { id, txtName, txtCategory, txtDetail,number } = this.state;
            console.log("add act: id:"+id +" name:"+ txtName +" cate:"+ txtCategory+" detail:"+txtDetail);
            let product = {
                productId: id,
                productCategoryCode: txtCategory,
                productName: txtName,
                otherProductDetails: txtDetail,
                productPrice:number
            };
            if(product.productId===undefined||product.productId===''||
                product.productCategoryCode===undefined||product.productCategoryCode===''||
                product.productName===undefined||product.otherProductDetails===''||
                product.otherProductDetails===undefined||product.productName===''){
                if(product.productId===undefined||product.productId===''){
                    this.setState({validationStateID:'error'});
                } 
                if(product.productCategoryCode===undefined||product.productCategoryCode===''){
                    this.setState({validationStateCate:'error'});
                } 
                if(product.otherProductDetails===undefined||product.otherProductDetails===''){
                    this.setState({validationStateDetail:'error'});
                } 
                if(product.productName===undefined||product.productName==='') {
                    this.setState({validationStateName:'error'});
                }
                if(product.productPrice===undefined||product.productPrice===''||!this.IsNumeric(product.productPrice)){
                    this.setState({validationNumber:'error'});
                }

                swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "success");
                e.preventDefault();
            }else{
                swal("Xong!", "Bạn vừa thêm thành công!", "success");
                this.props.onAddProduct(product);
                this.setState({
                    validationStateID:null,
                    validationStateCate:null,
                    validationStateName:null,
                    validationStateDetail:null,
                    validationNumber:null,
                    id:'', 
                    txtName:'',
                    txtCategory:'0323EQ',
                    txtDetail:'',
                    number:'50107'
                });
                this.props.history.goBack();
            }
        }
    }

   
    render() {
        var { txtName, txtCategory, txtDetail,number } = this.state;
        var {categorys} =this.props;
        if(txtName===null || txtName===undefined){
            txtName ="";
        }
        if(txtCategory===null || txtCategory===undefined){
            txtCategory ="";
        }
        if(txtDetail===null || txtDetail===undefined ){
            txtDetail ="";
        }
        if(this.state.addAction){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <form onSubmit={this.onSubmit}>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateID}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Mã sản phẩm: </ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="id"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateName}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Tên sản phẩm: </ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="txtName"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateCate}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Loại sản phẩm: </ControlLabel>
                                        <FormControl 
                                                componentClass="select" name="txtCategory"
                                                placeholder="Select" onChange={this.onChange}>
                                            {
                                                categorys.map(function(obj,ind){
                                                    return(
                                                        <option key={ind} value={obj.productCategoryCode}>
                                                            {obj.productCategoryDescription}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </FormControl>
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateDetail}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Chi tiết: </ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="txtDetail"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationNumber}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Giá sản phẩm: </ControlLabel>
                                        <FormControl
                                            type="number"
                                            min="50107"
                                            max='1000000000'
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="number"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>
                                <Link to="/product-list" className="btn btn-danger mr-5">
                                    <i className="glyphicon glyphicon-arrow-left"></i> Trở Lại
                                </Link>
                                <button type="submit" className="btn btn-primary">
                                    <i className="glyphicon glyphicon-save"></i> Lưu Lại
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <form onSubmit={this.onSubmit}>
                               
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateName}
                        >
                            <div className="form-group">
                                <ControlLabel>Tên sản phẩm: </ControlLabel>
                                <FormControl
                                    defaultValue={txtName}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="txtName"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateCate}
                        >
                            <div className="form-group">
                                <ControlLabel>Loại sản phẩm: </ControlLabel>
                                <FormControl 
                                        componentClass="select" name="txtCategory"
                                        placeholder="Select" onChange={this.onChange}>
                                        <option key={this.state.id} defaultValue={txtCategory} >
                                            {txtCategory}
                                        </option>
                                    {
                                        categorys.map(function(obj,ind){
                                            return(
                                                <option key={ind} value={obj.productCategoryCode}>
                                                    {obj.productCategoryDescription}
                                                </option>
                                            );
                                        })
                                    }
                                </FormControl>
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateDetail}
                        >
                            <div className="form-group">
                                <ControlLabel>Chi tiết: </ControlLabel>
                                <FormControl
                                    type="text"
                                    defaultValue={txtDetail}
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="txtDetail"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationNumber}
                        >
                            <div className="form-group">
                                <ControlLabel>Giá cả: </ControlLabel>
                                <FormControl
                                    type="number"
                                    min='50107'
                                    max='1000000000'
                                    defaultValue={number}
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="number"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <Link to="/product-list" className="btn btn-danger mr-5">
                            <i className="glyphicon glyphicon-arrow-left"></i> Trở Lại
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            <i className="glyphicon glyphicon-save"></i> Lưu Lại
                        </button>
                    </form>
                 </div>
                </div>
            </div>
        );
    }
    }
}

const mapStateToProps = state => {
    return {
        itemEditing : state.itemEditing,
        categorys: state.categorys,
        saveCateCode:state.saveCateCode,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product));
        },
        onUpdateProduct: (product,pageIndex,pageSize,iSearch) => {
            dispatch(actUpdateProductRequest(product,pageIndex,pageSize,iSearch));
        },
        onEditProduct : (id) => {
            dispatch(actGetProductRequest(id));
        },
        fetchAllCategoryProduct:()=>{
            dispatch(actFetchCategoryProductRequest());
        },
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
