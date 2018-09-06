import React, { Component } from 'react';
import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap';

export default class extends Component{
    static Input=(label,name,id,placeholder,value,actionOnchange,validationStateID)=>{
        return(<div key={id} >
            <FormGroup controlId="formBasicText" validationState={validationStateID} >
                <div className="form-group">
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder={placeholder} 
                        onChange={actionOnchange}
                        name={name}
                        defaultValue={value}
                    />
                </div>
            </FormGroup>
        </div>
        );
    }
    static Number=(label,name,id,placeholder,value,actionOnchange,max,min)=>{
        return(<div key={id} >
            <FormGroup controlId="formBasicText" >
                <div className="form-group">
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl
                        defaultValue={value}
                        type="number"
                        min={min}
                        max={max}
                        placeholder={placeholder}
                        onChange={actionOnchange}
                        name={name}
                    />
                    <FormControl.Feedback />
                </div>
            </FormGroup>
        </div>
        );
    }
    static Select=(label,dataSelect,keyID,defaultValue,placeholder,ind,actionOnchange)=>{
       return(<div key={keyID}>
        <FormGroup controlId="formBasicText"  >
            <div className="form-group">
                <ControlLabel>{label}</ControlLabel>
                <FormControl 
                        componentClass="select" name={keyID}
                        placeholder={placeholder} onChange={actionOnchange}>
                        <option defaultValue={defaultValue} > {defaultValue} </option>
                    {
                        dataSelect.map((obj,ind)=>{
                            return(
                                <option key={ind} value={obj['ID']}>
                                    {obj[keyID]}
                                </option>
                            )
                        })
                    }
                </FormControl>
                <FormControl.Feedback />
            </div>
        </FormGroup>
       </div>
       );
    }
    static Datalist=(label,dataSelect,keyID,defaultValue,placeholder,ind,actionOnchange)=>{
        return(<div key={keyID}>
         <FormGroup controlId="formBasicText" >
            <div className="form-group">
                <ControlLabel>{label}</ControlLabel>
                <FormControl list={`${keyID}-list`} name={keyID} defaultValue={defaultValue} onChange={actionOnchange}/>
                <datalist id={`${keyID}-list`}>
                    {
                        dataSelect.map((obj,ind)=>{
                            return(
                                <option key={ind} value={obj['ID']}>
                                    {obj[keyID]}
                                </option>
                            );
                        })
                    }
                </datalist>
                <FormControl.Feedback />
            </div>
        </FormGroup>
        </div>
        );
    }
}