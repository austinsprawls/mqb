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
    vehicleInfoOptions: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleChange(change, vehicle, event) {
    var selectedYear = this.refs.year.getValue();
    var selectedMake = this.refs.make.getValue();
    var selectedModel = this.refs.model.getValue();
    this.props.onChange(vehicle._id, event);
    if (change==='year') {
      vehicle.make = vehicle.model = vehicle.trim = '';
      VehicleActions.getVehicleMakes(vehicle._id, selectedYear);
    } else if (change==='make') {
      vehicle.model = vehicle.trim = '';
      VehicleActions.getVehicleModels(vehicle._id, selectedYear, selectedMake);
    } else if (change==='model') {
      vehicle.trim = '';
      VehicleActions.getVehicleTrims(vehicle._id, selectedYear, selectedMake, selectedModel);
    }
   };

  render() {

    console.log("the value of vehicleInfoOptions inside vehicleInfo: ", this.props.vehicleInfoOptions);

    const vehicleYearOptions = this.props.vehicleYears.map(year => {
      return (
        <option value={year}>{year}</option>
      );
    });

    const vehicleMakeOptions = this.props.vehicleInfoOptions[this.props.vehicle._id].makes.map(make => {
      return (
        <option value={make}>{make}</option>
      );
    });

    const vehicleModelOptions = this.props.vehicleInfoOptions[this.props.vehicle._id].models.map(model => {
      return (
        <option value={model}>{model}</option>
      );
    });

    const vehicleTrimOptions = () => {
      console.log("the trimOptions: ", Object.keys(this.props.vehicleInfoOptions[this.props.vehicle._id].trims));
      let trimOptions = Object.keys(this.props.vehicleInfoOptions[this.props.vehicle._id].trims);
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
