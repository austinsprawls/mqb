/**
 * Created by austinsprawls on 10/23/15.
 */
import React, { PropTypes, Component } from 'react'
import VehicleActions from '../../../../actions/VehicleActions'
import styles from './VehicleInfo.css'
import { Row, Col, Input } from 'react-bootstrap'

class VehicleForm extends Component {
  constructor(){
    super();
    console.log("VehicleForm constructor(): this",this)
  }

  static propTypes = {
    vehicleYears: PropTypes.array.isRequired,
    vehicleMakes: PropTypes.array.isRequired
  };

  getVehicleMakes(){
    console.log("the value of the selected year: ", this);
    var selectedYear = this.refs.year.getValue();
    VehicleActions.getVehicleMakes(selectedYear);
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

    return (
      <div className="VehicleInfo">
        <Row>
          <Col md={12}>
            <Input type="select"
                   label="Auto Information"
                   placeholder="Select a year"
                   onChange={this.getVehicleMakes.bind(this)}
                   ref="year"
                   required>
              {vehicleYearOptions}
            </Input>
            <Input type="select" placeholder="Select a make" required>
              {vehicleMakeOptions}
            </Input>
            <Input type="select" placeholder="Select a model" required>
              <option value="CLA-250">CLA-250</option>
              <option value="Sonata">Sonata</option>
            </Input>
            <Input type="select" placeholder="Select a year" required>
              <option value="4WD">4WD</option>
              <option value="2WD">2WD</option>
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VehicleForm;
