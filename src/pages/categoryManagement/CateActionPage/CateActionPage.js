import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'; 
import { connect } from 'react-redux';
import { actAddCategoryRequest, actUpdateCategoryRequest ,actGetCategoryRequest } from 'redux/categoryManagement/actions/index';
import {actFetchCategoryProductRequest} from 'redux/categoryManagement/actions/cates';
import DataForm from 'components/form/dataForm';
class CategoryActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productCategoryCode: '',
            productCategoryDescription: '',
            addAction:false,
            validationStateID:null,
            validationStateCate:null,
            pagination:[],
            cols:[]
        };
    }
    componentDidMount(){
        this.props.fetchAllCategory();
        const cols = [
            {
                type: "INPUT",
                keyID: "productCategoryCode",
                label: "Mã loại sản phẩm",
                placeholder: "Nhap mã loại sản phẩm",
                name: "productCategoryCode",
                value: "21",
                action: this.test,
                validationStateID:this.state.validationStateID,
            },
            {
                type: "INPUT",
                keyID: "productCategoryDescription",
                label: "Mô tả loại sản phẩm",
                placeholder: "Nhập mô tả",
                name: "productCategoryDescription",
                value: "2", 
                action: this.test,
                validationStateCate:this.state.validationStateCate
            },
        ];
        this.setState({cols:cols});
    }
    componentWillMount() {
        this.props.fetchAllCategory();
        var { match } = this.props;
        if (match) { // update
            var id = match.params.id;
            var pagination = match.params.pagination;
            this.setState({pagination:pagination.split(",")},()=>{console.log(this.state.pagination)});
            this.props.onEditCategory(id);
            const cols = [
                {
                    type: "INPUT",
                    keyID: "productCategoryDescription",
                    label: "Mô tả loại sản phẩm",
                    placeholder: "Nhập mô tả",
                    name: "productCategoryDescription",
                    value: "2", 
                    action: this.test,
                    validationStateCate:this.state.validationStateCate
                },
            ];
            this.setState({cols:cols});
        } else{
            this.setState({
                addAction:true,
                id: '',
                txtDescription: '',
            });
        }
      
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.addAction===false){
            if(nextProps && nextProps.itemEditing){
                var {itemEditing} = nextProps;
                this.setState({
                    productCategoryCode : itemEditing.productCategoryCode,
                    productCategoryDescription : itemEditing.productCategoryDescription,
                });
                const cols = [
                    {
                         type: "INPUT",
                         keyID: "productCategoryDescription",
                         label: "Mô tả loại sản phẩm",
                         placeholder: "Nhập mô tả",
                         name: "productCategoryDescription",
                         value:this.state.productCategoryDescription, 
                         action: this.onChange,
                         validationStateCate:this.state.validationStateCate
                     },
                 ];
                 this.setState({cols:cols});
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
        if(name+''==="productCategoryDescription") this.setState({validationStateName:"success"});
        if(name+''==="productCategoryCode") this.setState({validationStateID:"success"});
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.addAction===false) {
            var { productCategoryCode, productCategoryDescription } = this.state;
            console.log("update cate act: id:"+productCategoryCode +" name:"+ productCategoryDescription );
            var Category = {
                cateId: productCategoryCode,
                productCategoryDescription: productCategoryDescription,
            };
           
            if(Category.cateId===undefined||Category.cateId===''||
                Category.productCategoryDescription===undefined||Category.productCategoryDescription===''){
                if(Category.productCategoryDescription==='') {
                    this.setState({validationStateName:'error'});
                }
                swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "success");
                e.preventDefault();
            }else{
                swal("Xong!", "Bạn đã sửa thành công!", "success");
                var pageIndex=this.state.pagination[0];
                var pageSize = this.state.pagination[1];
                var iSearch = this.state.pagination[2];
                console.log(Category);
                this.props.onUpdateCategory(Category,pageIndex,pageSize,iSearch);
                this.setState({
                    validationStateID:null,
                    validationStateName:null,
                    productCategoryCode:'', 
                    productCategoryDescription:'',
                });
                this.props.history.goBack();
            }
        } else {
            let { productCategoryCode, productCategoryDescription} = this.state;
            console.log("add act: id:"+productCategoryCode +" name:"+ productCategoryDescription );
            let Category = {
                productCategoryCode: productCategoryCode,
                productCategoryDescription: productCategoryDescription,
            };
            if(Category.productCategoryCode===undefined||Category.productCategoryCode===''||
                Category.productCategoryDescription===undefined||Category.productCategoryDescription===''){
                if(Category.productCategoryCode===undefined||Category.productCategoryCode===''){
                    this.setState({validationStateID:'error'});
                } 
                if(Category.productCategoryDescription===undefined||Category.productCategoryDescription==='') {
                    this.setState({validationStateName:'error'});
                }

                swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "success");
                e.preventDefault();
            }else{
                swal("Xong!", "Bạn vừa thêm thành công!", "success");
                this.props.onAddCategory(Category);
                this.setState({
                    validationStateID:null,
                    validationStateName:null,
                    productCategoryCode:'', 
                    productCategoryDescription:'',
                });
                this.props.history.goBack();
            }
        }
    }

   
    render() {
        var { productCategoryCode } = this.state;
        var {categorys} = this.props;
        if(productCategoryCode===null || productCategoryCode===undefined){
            productCategoryCode ="";
        }
        if(this.state.addAction){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <form onSubmit={this.onSubmit}>
                                <DataForm columns={this.state.cols}  />
                                <Link to="/cate-list" className="btn btn-danger mr-5">
                                    <i className="glyphicon glyphicon-arrow-left"></i> Trở Lại
                                </Link>
                                <button type="submit" className="btn btn-primary">
                                    <i className="glyphicon glyphicon-save"></i> Thêm loại sản phẩm
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
                        <DataForm columns={this.state.cols} listObj={categorys} />
                        <Link to="/cate-list" className="btn btn-danger mr-5">
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
    console.log("============a");
    console.log(state);
    console.log("============a");
    return {
        itemEditing : state.itemCateEditing,
        categorys: state.categorys_index,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddCategory: (Category) => {
            dispatch(actAddCategoryRequest(Category));
        },
        onUpdateCategory: (Category,pageIndex,pageSize,iSearch) => {
            dispatch(actUpdateCategoryRequest(Category,pageIndex,pageSize,iSearch));
        },
        fetchAllCategory: () => {
            dispatch(actFetchCategoryProductRequest());
        },
        onEditCategory : (id) => {
            dispatch(actGetCategoryRequest(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryActionPage);
