/**
 * Created by jlillz on 10/22/15.
 */

import React, { PropTypes, Component } from 'react'
// Might have to rethink how this gets required perhaps with an adaptation of the react-proxy-loader
// Or to directly pull the component from the backend as a slug?
// http://stackoverflow.com/questions/26518629/dynamically-rendering-a-react-component
// https://github.com/webpack/react-proxy-loader
var components = {
    'TX': React.createFactory( require('../Districts/TX/VehicleForm') ),
    'FL': React.createFactory( require('../Districts/FL/VehicleForm/VehicleForm') ),
};



class VehicleList extends Component {

  static propTypes = {
    vehicles: PropTypes.array.isRequired,
    district: PropTypes.string.isRequired
  };

  render() {
    //var VehicleForm = require('../Districts/' + this.props.district + '/VehicleForm');
    //const vehicleForms = this.props.vehicles.map(vehicle => {
    //  // ...vehicle is the spread operator which spreads the keys and values across the jsx element
    //  return (
    //    <VehicleForm vehicle={vehicle} />
    //  );
    //})
    console.log("hi im' here in the vehicle list", this.props);
    const vehicleRows = this.props.vehicles.map(vehicle => {
      return (
        <ul key={vehicle._id}>
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
