/**
 * Created by austinsprawls on 10/23/15.
 */
import React, { PropTypes, Component } from 'react'
import VehicleActions from '../../../../actions/VehicleActions'
import styles from './VehicleInfo.css'
import { Row, Col, Input } from 'react-bootstrap'

class VehicleInfo extends Component {
  constructor(){
    super();
    console.log("VehicleInfo constructor(): this",this)
  }

  static propTypes = {
    vehicleYears: PropTypes.array.isRequired,
    vehicleMakes: PropTypes.array.isRequired,
    vehicleModels: PropTypes.array.isRequired,
    vehicleTrims: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleVehicleYearChange(vehicleID, event) {
    console.log("the event is: ", event);
    var selectedYear = this.refs.year.getValue();
    this.props.onChange(vehicleID, event);
    VehicleActions.getVehicleMakes(selectedYear);
  };

  handleVehicleMakeChange(vehicleID, event) {
    var selectedMake = this.refs.make.getValue();
    VehicleActions.getVehicleModels(selectedMake);
    this.props.onChange(vehicleID, event);
  };

  handleVehicleModelChange(vehicleID, event) {
    var selectedModel = this.refs.model.getValue();
    VehicleActions.getVehicleTrims(selectedModel);
    this.props.onChange(vehicleID, event)
  }

  render() {

    const vehicleYearOptions = this.props.vehicleYears.map(year => {
      return (
        <option value={year}>{year}</option>
      );
    });

    const vehicleMakeOptions = this.props.vehicleMakes.map(make => {
      return (
        <option value={make}>{make}</option>
      );
    });

    const vehicleModelOptions = this.props.vehicleModels.map(model => {
      return (
        <option value={model}>{model}</option>
      );
    });

    const vehicleTrimOptions = this.props.vehicleTrims.map(trim => {
      return (
        <option value={trim}>{trim}</option>
      );
    });

    return (
      <div className="VehicleInfo">
        <Row>
          <Col md={12}>
            <Input type="select"
                   label="Auto Information"
                   placeholder="Select a year"
                   onChange={this.handleVehicleYearChange.bind(this, this.props.vehicle._id)}
                   ref="year"
                   name="year"
                   value={this.props.vehicle.year || ''}
                   required>
              <option value="" disabled>Select a year</option>
              {vehicleYearOptions}
            </Input>
            <Input type="select"
                   placeholder="Select a make"
                   onChange={this.handleVehicleMakeChange.bind(this, this.props.vehicle._id)}
                   value={this.props.vehicle.make || ''}
                   ref="make"
                   name="make"
                   required>
              <option value="" disabled>Select a make</option>
              {vehicleMakeOptions}
            </Input>
            <Input type="select"
                   placeholder="Select a model"
                   onChange={this.handleVehicleModelChange.bind(this, this.props.vehicle._id)}
                   ref="model"
                   name="model"
                   value={this.props.vehicle.model || ''}
                   required>
              <option value="" disabled>Select a model</option>
              {vehicleModelOptions}
            </Input>
            <Input type="select"
                   placeholder="Select a trim"
                   onChange={this.props.onChange.bind(this, this.props.vehicle._id) }
                   ref="trim"
                   name="trim"
                   value={this.props.vehicle.trim || ''}
                   required>
              <option value="" disabled>Select a trim</option>
              {vehicleTrimOptions}
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VehicleInfo;
