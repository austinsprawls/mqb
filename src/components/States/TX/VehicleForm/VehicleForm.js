/**
 * Created by jmunsch on 10/23/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './VehicleForm.css'
import withStyles from '../../../../decorators/withStyles'

class VehicleForm extends Component {
  constructor(){
    super();
    console.log("VehicleForm constructor(): this",this)
  }

  static propTypes = {
  };
  
  isObject(obj){
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
  }

  render() {
    const vehicleInfo = Object.keys(this.props).map((key) => {
      if (this.isObject(this.props[key])){
        return;
      }
      return (
          <li>
            {key} {this.props[key]}
          </li>
        );
    })
 
    return (
    	<div>
        {vehicleInfo}
      </div>
    );
  }
}

export default VehicleForm;
