/**
 * Created by jlillz on 10/22/15.
 */

import React, { PropTypes, Component } from 'react'
import {Button, Row, Col, Panel} from 'react-bootstrap'
import DistrictForms from '../../constants/DistrictForms'
import VehicleActions from '../../actions/VehicleActions'


class VehicleList extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    vehicles: PropTypes.array.isRequired,
    district: PropTypes.string.isRequired,
    vehicleYears: PropTypes.array.isRequired,
    vehicleMakes: PropTypes.array.isRequired,
    vehicleModels: PropTypes.array.isRequired,
    vehicleTrims: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  deleteVehicle(vehicle, event) {
    console.log("DELETE_VEHICLE action called: ", event);
    event.preventDefault();
    VehicleActions.deleteVehicle(vehicle);
  };

  saveAndAddVehicle(vehicleToSave, event) {
    event.preventDefault();
    console.log("The vehicle to be saved: ", vehicleToSave);
    VehicleActions.updateVehicle(vehicleToSave);
    console.log("UPDATE_VEHICLE action called: ", event);
    VehicleActions.createVehicle({_quoteID: vehicleToSave._quoteID});
    console.log("CREATE_VEHICLE action called: ", event);
  };

  render() {
    const districtForm = DistrictForms[this.props.district];
    const displayVehicleHeader = (vehicle) => {
      console.log(" the vehicle inside displayVehicleHeader ", vehicle);
      if (vehicle.year && vehicle.make && vehicle.model && vehicle.trim) {
        console.log("The vehicle has a year: ", vehicle);
        return (
          <div>
            <h3 className="pull-left">{vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model}</h3>
            <i className="fa fa-times fa-2x pull-right" onClick={this.deleteVehicle}></i>
          </div>
        );
      }
      return null;
    };
    const addVehicleButton = (vehicle, index) => {
      console.log("The index of this vehicle ", index);
      console.log(" the vehicle inside addVehicleButton ", vehicle);
      if (index===this.props.vehicles.length-1) {
        return (
          <Button type="button" bsStyle="warning" onClick={this.saveAndAddVehicle.bind(this, vehicle)}>Add Another Vehicle</Button>
        );
        return null;
      }
    };
    const vehicleForms = this.props.vehicles.map((vehicle, index) => {
      console.log("the vehicle: ", vehicle);
      return (
        <Row key={vehicle._id}>
          <Col md={8} mdOffset={2}>
            <Panel header={displayVehicleHeader(vehicle)} footer={ addVehicleButton(vehicle, index) }>
              {districtForm({vehicle: vehicle,
                  key: vehicle._id,
                  vehicleYears: this.props.vehicleYears,
                  vehicleMakes: this.props.vehicleMakes,
                  vehicleModels: this.props.vehicleModels,
                  vehicleTrims: this.props.vehicleTrims,
                  onChange: this.props.onChange,
                }
              )}
            </Panel>
          </Col>
        </Row>
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
