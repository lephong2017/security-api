import React,{ Component } from 'react';
import ItemForm from './itemForm';
export default class extends Component{
   
    render(){
        return(<div>
            {
                this.props.columns.map((val,ind)=>{
                    switch(val.type){
                        case "SELECT":
                            return ItemForm.Select(
                                val.label,
                                val.dataOption,
                                val.keyID,
                                this.props.listObj[ind][val.name],
                                val.placeholder,
                                ind,
                                val.action
                            );
                        case "DATALIST":
                            return ItemForm.Datalist(
                                val.label,
                                val.dataOption,
                                val.keyID,
                                this.props.listObj[ind][val.name],
                                val.placeholder,
                                ind,
                                val.action
                            );
                        case "INPUT":
                            return ItemForm.Input(
                                val.label,
                                val.name,
                                val.keyID,
                                val.placeholder,
                                this.props.listObj[ind][val.keyID],
                                val.action,
                                val.validationStateID
                            );
                        case "NUMBER":
                            return ItemForm.Number(
                                val.label,
                                val.name,
                                val.keyID,
                                val.placeholder,
                                this.props.listObj[ind][val.keyID],
                                val.action,
                                val.max,
                                val.min,
                            );
                        default:
                            return ItemForm.Input(val.label,val.name,val.keyID,val.placeholder,val.value,val.action);
                        }
                })
            }
        </div>
        )
    }
}