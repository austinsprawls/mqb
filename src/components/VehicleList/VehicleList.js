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
    handleChange: PropTypes.func.isRequired,
  };

  deleteVehicle(event) {};

  addVehicle(event) {
    console.log("CREATE_VEHICLE action called: ", event);
    event.preventDefault();
    var quoteID = this.props.vehicles[this.props.vehicles.length-1]._quoteID;
    VehicleActions.createVehicle({_quoteID: quoteID});
  };

  render() {
    const districtForm = DistrictForms[this.props.district];
    const displayVehicleHeader = (vehicle) => {
      if (vehicle.year && vehicle.make && vehicle.model && vehicle.trim) {
        return (
          <h3>{vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model}</h3>
        );
      }
      return null;
    };
    const addVehicleButton = (
      <Button type="button" bsStyle="warning" onClick={this.addVehicle}>Add Another Vehicle</Button>
    );
    const vehicleForms = this.props.vehicles.map((vehicle, index) => {
      return (
        <Row>
          <Col md={8} mdOffset={2}>
            <Panel header={displayVehicleHeader(vehicle)} footer={index===this.props.vehicles.length-1 ? addVehicleButton : null}>
              {districtForm({vehicle: vehicle,
                  key: vehicle._id,
                  vehicleYears: this.props.vehicleYears,
                  vehicleMakes: this.props.vehicleMakes,
                  handleChange: this.props.handleChange,
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
