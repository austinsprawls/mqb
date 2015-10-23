/**
 * Created by jlillz on 10/22/15.
 */

import React, { PropTypes, Component } from 'react'
// Might have to rethink how this gets required perhaps with an adaptation of the react-proxy-loader
// Or to directly pull the component from the backend as a slug?
// http://stackoverflow.com/questions/26518629/dynamically-rendering-a-react-component
// https://github.com/webpack/react-proxy-loader
import DistrictForm from '../../constants/DistrictForms'


class VehicleList extends Component {

  static propTypes = {
    vehicles: PropTypes.array.isRequired,
    district: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  render() {
    //var vehicleFormPath = '../Districts/' + this.props.district + '/VehicleForm';
    const vehicleForms = this.props.vehicles.map(vehicle => {
      // ...vehicle is the spread operator which spreads the keys and values across the jsx element
      return (
        new DistrictForm[this.props.district]({vehicle: vehicle, handleChange: this.props.handleChange})
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
