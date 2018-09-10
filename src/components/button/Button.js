import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';


class MyButton extends Component{
  constructor(props){
    super(props)
    this.state={
      propsDemo:PropTypes.object.isRequired,
    }
  }


  render(){
    var { ID,obj,pagination,isDisabled} = this.props;
    if(this.props.aria_label==='ADD') {
      return (
        <div>
          <Button disabled={isDisabled} onClick={()=>this.props.onClick} size="small" variant="fab" color="primary" aria-label={this.props.aria_label} className={this.state.propsDemo.button}>
              <AddIcon />
          </Button>
        </div>
      );
    }
    if(this.props.aria_label==='EDIT'){
      if(ID!==undefined&&!isDisabled){
        return (
          <div>
            <Link to={`/${obj}/${ID}/${pagination}/edit`} >
              <Button disabled={isDisabled}  size="small"  variant="fab" color="primary" aria-label={this.props.aria_label} className={this.state.propsDemo.button}>
                <EditIcon>edit_icon</EditIcon>
              </Button>
            </Link> 
          </div>
        );
      }else
      if(ID!==undefined){
        return (
          <div>
              <Button disabled={isDisabled}  size="small"  variant="fab" color="primary" aria-label={this.props.aria_label} className={this.state.propsDemo.button}>
                <EditIcon>edit_icon</EditIcon>
              </Button>
          </div>
        );
      }else return (
      <div>
        <Button disabled={isDisabled}  onClick={this.props.onClick} size="small" variant="fab" color="primary" aria-label={this.props.aria_label} className={this.state.propsDemo.button}>
          <EditIcon>edit_icon</EditIcon>
        </Button>
      </div>);
    }
    if(this.props.aria_label==='DELETE'){
      return (
        <div>
          <Button disabled={isDisabled}  onClick={this.props.onClickComponent}  
              size="small" variant="fab" color="primary" aria-label={this.props.aria_label} className={this.state.propsDemo.button}>
             <DeleteIcon/>
          </Button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
      products: state.products,
      saveCateCode:state.saveCateCode,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyButton);
