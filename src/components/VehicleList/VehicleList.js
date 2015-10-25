/**
 * Created by jlillz on 10/22/15.
 */

import React, { PropTypes, Component } from 'react'
// Might have to rethink how this gets required perhaps with an adaptation of the react-proxy-loader
// Or to directly pull the component from the backend as a slug?
// http://stackoverflow.com/questions/26518629/dynamically-rendering-a-react-component
// https://github.com/webpack/react-proxy-loader
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
    VehicleActions.createVehicle();
  };

  render() {
    const districtForm = DistrictForms[this.props.district];
    const addVehicleButton = (
      <Button type="button" bsStyle="warning" onClick={this.addVehicle}>Add Another Vehicle</Button>
    );
    const vehicleForms = this.props.vehicles.map(vehicle => {
      return (
        <Row>
          <Col md={8} mdOffset={2}>
            <Panel footer={addVehicleButton}>
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
