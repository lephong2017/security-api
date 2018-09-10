import {DropdownButton,MenuItem} from 'react-bootstrap';
import React, { Component } from 'react';
// import '../lib-css/dropdown-btn.css';
import { connect } from 'react-redux';
import { actGetCustomerOrdersRequestByCustomerID } from 'redux/customerOrdersManagement/actions/index';

class DropdownOrder extends Component{
    constructor(props){ 
        super(props)
        this.handleSelectValueOption = this.handleSelectValueOption.bind(this);
    }

    handleSelectValueOption(cateId){
        console.log(cateId +" is click cate");
        var {pagination}= this.props;
        var pageIndex = pagination[0];
        var pageSize =pagination[1];
        this.props.onGetOrderByCustomerId(cateId,pageIndex,pageSize);
    }

    render(){
        var {listCustomer} = this.props; 
        return(
            <div>
                    <DropdownButton
                        bsStyle={this.props.cateButton.toLowerCase()}
                        title={this.props.title}
                        key={this.props.id}
                        bsSize="small"
                        style={{ maxHeight: "58px" }}
                        id={`dropdown-basic-${this.props.id}`}
                        onSelect={this.handleSelectValueOption}

                        >
                        <MenuItem eventKey="all-cate" key="all-cate" >
                            All categorys
                        </MenuItem>
                        {
                            listCustomer.map(function(obj,index){
                               return( <MenuItem eventKey={obj.customerId} key={index} >
                                    {obj.customerName}
                                </MenuItem>)
                            })
                        }
                        
                    </DropdownButton>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetOrderByCustomerId : (id,pageIndex,pageSize) => {
            dispatch(actGetCustomerOrdersRequestByCustomerID(id,pageIndex,pageSize));
        }
    }
} 

export default connect(null,mapDispatchToProps)(DropdownOrder);