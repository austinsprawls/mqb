/**
 * Created by jmunsch on 10/23/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './VehicleForm.css'
import withStyles from '../../../../decorators/withStyles'
import {  Row, Col } from 'react-bootstrap'
import VehicleInfo from '../../shared/VehicleInfo'
import GarageInfo from '../FormParts/GarageInfo'

class VehicleFormTX extends Component {
  constructor(){
    super();
    console.log("VehicleForm constructor(): this",this)
  }

  static propTypes = {
    vehicle: PropTypes.object.isRequired,
    vehicleYears: PropTypes.array.isRequired,
    vehicleMakes: PropTypes.array.isRequired,
    vehicleModels: PropTypes.array.isRequired,
    vehicleTrims: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const stateInfo = React.createElement('h1', null, 'Texas Content');
    console.log("hi i'm here in the VehicleForm component: ", this.props.vehicle);

    return (
      <div className="VehicleForm" key={this.props.vehicle._id}>
        {stateInfo}
        <form>
          <Row>
            <Col md={4}>
              <VehicleInfo vehicle={this.props.vehicle}
                           vehicleYears={this.props.vehicleYears}
                           vehicleMakes={this.props.vehicleMakes}
                           vehicleModels={this.props.vehicleModels}
                           vehicleTrims={this.props.vehicleTrims}
                           onChange={this.props.onChange}
                />
            </Col>
            <Col md={6} mdOffset={2}>
              <GarageInfo />
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default VehicleFormTX;
