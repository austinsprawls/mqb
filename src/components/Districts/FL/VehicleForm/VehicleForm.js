/**
 * Created by austinsprawls on 10/23/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './VehicleForm.css'
import withStyles from '../../../../decorators/withStyles'
import { Panel, Row, Col, Input } from 'react-bootstrap'
import VehicleInfo from '../../shared/VehicleInfo'

class VehicleFormFL extends Component {
  constructor(){
    super();
    console.log("VehicleForm constructor(): this",this)
  }

  static propTypes = {
    vehicle: PropTypes.object.isRequired,
    vehicleYears: PropTypes.array.isRequired,
    vehicleMakes: PropTypes.array.isRequired,
    vehicleModels: PropTypes.array.isRequired,
    vehicleTrims: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const stateInfo = React.createElement('h1', null, 'Florida Content');
    console.log("hi i'm here in the VehicleForm component: ", this.props.vehicle);

    return (
      <div className="VehicleForm">
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
              <Input type="text"
                     label="Where is it garaged?"
                     placeholder="Zip Code"
                     help="Enter a valid FL zip code"
                     required
                />
              <label>What is its primary use?</label>
              <Input type="radio"
                     label="Personal"
                />
              <Input type="radio"
                     label="Business"
                />
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default VehicleFormFL;
