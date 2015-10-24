/**
 * Created by austinsprawls on 10/24/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './GarageInfo.css'
import { Input } from 'react-bootstrap'

class GarageInfo extends Component {
  constructor(){
    super();
    console.log("VehicleForm constructor(): this",this)
  }

  static propTypes = {
  };

  render() {

    return (
      <div className="GarageInfo">
       <Input type="text"
              placeholder="Zip Code"
              label="Where is it garaged?"
              help="Enter a valid TX zip code"
              required
         />
        <Input type="text"
               placeholder="County"
               label="County"
               required
          />
        <Input type="select"
               placeholder="Ownership Status"
               label="Ownership Status"
          >
          <option value="PAY">Paid</option>
          <option value="FIN">Financed</option>
          <option value="LEA">Leased</option>
        </Input>
      </div>
    );
  }
}

export default GarageInfo;
