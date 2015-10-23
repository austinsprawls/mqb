/**
 * Created by jlillz on 10/22/15.
 */

import React, { PropTypes, Component } from 'react'
import CoreStore from '../../stores/CoreStore'
// Might have to rethink how this gets required perhaps with an adaptation of the react-proxy-loader
// Or to directly pull the component from the backend as a slug?
// http://stackoverflow.com/questions/26518629/dynamically-rendering-a-react-component
// https://github.com/webpack/react-proxy-loader
var components = {
    'TX': React.createFactory( require('../States/TX/VehicleForm') ),
    'FL': React.createFactory( require('../States/FL/VehicleForm') ),
};
var territory = CoreStore.getState();
// var vehicleFormPathString = '../States/' + CoreStore.getState() + '/VehicleForm';
// var VehicleForm = require.include(vehicleFormPathString);


class VehicleList extends Component {

  static propTypes = {
    vehicles: PropTypes.array.isRequired,
  };

  render() {
    const vehicleForms = this.props.vehicles.map(vehicle => {
      // ...vehicle is the spread operator which spreads the keys and values across the jsx element
      return (
        new components[territory]({...vehicle})
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
        {vehicleForms}
      </div>
    );
  }

}

export default VehicleList;
