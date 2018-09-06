import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'; 
import { connect } from 'react-redux';
import { actAddCategoryRequest, actUpdateCategoryRequest, actGetCategoryRequest } from 'redux/categoryManagement/actions/index';
import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap';

class CategoryActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtDescription: '',
            addAction:false,
            validationStateID:null,
            validationStateCate:null,
            pagination:[],
        };
    }

    componentWillMount() {
        var { match } = this.props;
        if (match) { // update
            var id = match.params.id;
            var pagination = match.params.pagination;
            this.setState({pagination:pagination.split(",")},()=>{console.log(this.state.pagination)});
            this.props.onEditCategory(id);
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
                    id : itemEditing.productCategoryCode,
                    txtDescription : itemEditing.productCategoryDescription,
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
        if(name+''==="txtDescription") this.setState({validationStateName:"success"});
        if(name+''==="id") this.setState({validationStateID:"success"});
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.addAction===false) {
            var { id, txtDescription } = this.state;
            console.log("update cate act: id:"+id +" name:"+ txtDescription );
            var Category = {
                cateId: id,
                productCategoryDescription: txtDescription,
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
                    id:'', 
                    txtDescription:'',
                });
                this.props.history.goBack();
            }
        } else {
            let { id, txtDescription} = this.state;
            console.log("add act: id:"+id +" name:"+ txtDescription );
            let Category = {
                productCategoryCode: id,
                productCategoryDescription: txtDescription,
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
                    id:'', 
                    txtDescription:'',
                });
                this.props.history.goBack();
            }
        }
    }

   
    render() {
        var { txtDescription } = this.state;
        if(txtDescription===null || txtDescription===undefined){
            txtDescription ="";
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
                                        <ControlLabel>Mã loại sản phẩm: </ControlLabel>
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
                                        <ControlLabel>Mô tả loại sản phẩm: </ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="txtDescription"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>
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
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateName}
                        >
                            <div className="form-group">
                                <ControlLabel>Mô tả loại sản phẩm: </ControlLabel>
                                <FormControl
                                    value={txtDescription}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="txtDescription"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
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
        onEditCategory : (id) => {
            dispatch(actGetCategoryRequest(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryActionPage);
