/**
 * Created by jlillz on 10/22/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './VehiclePage.css'
import withStyles from '../../decorators/withStyles'
import { Row, Col, Button } from 'react-bootstrap'
import VehicleActions from '../../actions/VehicleActions'
import VehicleStore from '../../stores/VehicleStore'
import VehicleList from '../VehicleList'
import CoreStore from '../../stores/CoreStore'

@withStyles(styles)
class VehiclePage extends Component {
  constructor() {
    super();
    this.state = { vehicles: VehicleStore.getAllVehicles(),
                    district: CoreStore.getDistrict(),
                    vehicleYears: VehicleStore.getVehicleYears(),
                    vehicleMakes: VehicleStore.getVehicleMakes(),
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    VehicleStore.addChangeListener(this._onChange);
    CoreStore.addChangeListener(this._onChange);
  };

  componentWillUnmount() {
    VehicleStore.removeChangeListener(this._onChange);
    CoreStore.removeChangeListener(this._onChange);
  };

  setVehicleState(id, event) {
    var field = event.target.name,
        value = event.target.value;
    this.state.vehicles.map(vehicle => {
      if (vehicle._id===id) vehicle[field] = value;
    });
    this.setState({vehicles: vehicles});
  }

  _onChange() {
    this.setState({ vehicles: VehicleStore.getAllVehicles(),
                    district: CoreStore.getDistrict(),
                    vehicleYears: VehicleStore.getVehicleYears(),
                    vehicleMakes: VehicleStore.getVehicleMakes(),
    });
  };
  render() {

    return (
      <div className="VehiclePage">
        <div className="VehiclePage-container container">
          {
            this.props.path === '/' ? null : <h1>{this.props.title}</h1>
          }
          <VehicleList vehicles={this.state.vehicles}
                       district={this.state.district}
                       vehicleYears={this.state.vehicleYears}
                       vehicleMakes={this.state.vehicleMakes}
                       handleChange={this.setVehicleState}
            />
          <Row>
            <Col md={8} mdOffset={2}>
              <Button type="submit"
                      bsStyle="warning"
                      bsSize="large"
                      className="pull-right">Continue</Button>
            </Col>
          </Row>
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }

}

export default VehiclePage;
