/**
 * Created by jlillz on 10/22/15.
 */

import React, { PropTypes, Component } from 'react'
import VehicleForm from '../States/${mqb.state}/VehicleForm'

class VehicleList extends Component {

  getInitialState() {
    return { vehicles: VehicleStore.getAllVehicles() };
  };

  static propTypes = {
    vehicles: PropTypes.array.isRequired,
  };

  render() {
    var createVehicleForm = function(vehicle) {
      return (
        <VehicleForm vehicle={vehicle} />
      );
    };
     return (
      <div className="VehicleList">
        {this.props.vehicles.map(createVehicleForm,this)}
      </div>
    );
  }

}

export default VehicleList;
