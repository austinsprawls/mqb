/**
 * Created by jlillz on 10/22/15.
 */

import React, { PropTypes, Component } from 'react'
import CoreStore from '../../stores/CoreStore'
//var vehicleFormPathString = '../States/' + CoreStore.getState() + '/VehicleForm';
//var VehicleForm = require(vehicleFormPathString);

class VehicleList extends Component {

  static propTypes = {
    vehicles: PropTypes.array.isRequired,
  };

  render() {
    const vehicleForms = this.props.vehicles.map(vehicle => {
      return (
        <VehicleForm vehicle={vehicle} />
      );
    })

    const vehicleRows = this.props.vehicles.map(vehicle => {
      return (
        <ul>
          <li>{vehicle._id}</li>
        </ul>
      );
    });
     return (
      <div className="VehicleList">
        {vehicleRows}
      </div>
    );
  }

}

export default VehicleList;
