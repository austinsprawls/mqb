/**
 * Created by jlillz on 10/22/15.
 */

import React, { PropTypes, Component } from 'react'
// Might have to rethink how this gets required perhaps with an adaptation of the react-proxy-loader
// Or to directly pull the component from the backend as a slug?
// http://stackoverflow.com/questions/26518629/dynamically-rendering-a-react-component
// https://github.com/webpack/react-proxy-loader
import DistrictForms from '../../constants/DistrictForms'
import VehicleActions from '../../actions/VehicleActions'


class VehicleList extends Component {

  static propTypes = {
    vehicles: PropTypes.array.isRequired,
    district: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  addVehicle(event) {};

  deleteVehicle(event) {};

  render() {
    const districtForm = DistrictForms[this.props.district];
    const vehicleForms = this.props.vehicles.map(vehicle => {
      return (
        districtForm({vehicle: vehicle, key: vehicle._id, handleChange: this.props.handleChange})
      );
    });
    console.log("hi im' here in the vehicle list", this.props );
     return (
      <div className="VehicleList">
        {vehicleForms}
      </div>
    );
  }

}

export default VehicleList;
