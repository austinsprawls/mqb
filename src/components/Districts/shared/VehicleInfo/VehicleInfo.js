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
    vehicleTrims: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleChange(change, vehicle, event) {
    var selectedYear = this.refs.year.getValue();
    var selectedMake = this.refs.make.getValue();
    var selectedModel = this.refs.model.getValue();
    this.props.onChange(vehicle._id, event);
    if (change==='year') {
      vehicle.make = vehicle.model = vehicle.trim = '';
      VehicleActions.getVehicleMakes(selectedYear);
    } else if (change==='make') {
      vehicle.model = vehicle.trim = '';
      VehicleActions.getVehicleModels(selectedYear, selectedMake);
    } else if (change==='model') {
      vehicle.trim = '';
      VehicleActions.getVehicleTrims(selectedYear, selectedMake, selectedModel);
    }
   };

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

    const vehicleTrimOptions = () => {
      let trimOptions = Object.keys(this.props.vehicleTrims);
      trimOptions = trimOptions.map(trim => {
        return (
          <option value={trim}>{trim}</option>
        );
      });
      return trimOptions;
    };

    console.log("when you call vehicleModelOptions: ", vehicleModelOptions);

    console.log("when you call vehicleTrimOptions: ", vehicleTrimOptions());

    //const vehicleTrimOptions = this.props.vehicleTrims.map(trim => {
    //  return (
    //    <option value={trim}>{trim}</option>
    //  );
    //});

    return (
      <div className="VehicleInfo">
        <Row>
          <Col md={12}>
            <Input type="select"
                   label="Auto Information"
                   placeholder="Select a year"
                   onChange={this.handleChange.bind(this, 'year', this.props.vehicle)}
                   ref="year"
                   name="year"
                   value={this.props.vehicle.year || ''}
                   required>
              <option value="" disabled>Select a year</option>
              {vehicleYearOptions}
            </Input>
            <Input type="select"
                   placeholder="Select a make"
                   onChange={this.handleChange.bind(this, 'make', this.props.vehicle)}
                   value={this.props.vehicle.make || ''}
                   ref="make"
                   name="make"
                   required>
              <option value="" disabled>Select a make</option>
              {vehicleMakeOptions}
            </Input>
            <Input type="select"
                   placeholder="Select a model"
                   onChange={this.handleChange.bind(this, 'model', this.props.vehicle)}
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
              {vehicleTrimOptions()}
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VehicleInfo;
