/**
 * Created by jlillz on 10/22/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './VehiclePage.css'
import withStyles from '../../decorators/withStyles'
import VehicleActions from '../../actions/VehicleActions'
import VehicleStore from '../../stores/VehicleStore'
import VehicleList from '../VehicleList'
import CoreStore from '../../stores/CoreStore'

@withStyles(styles)
class VehiclePage extends Component {
  constructor() {
    super();
    this.state = { vehicles: VehicleStore.getAllVehicles(), district: CoreStore.getDistrict() };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    VehicleStore.addChangeListener(this._onChange);
  };

  componentWillUnmount() {
    VehicleStore.removeChangeListener(this._onChange);
  };


  _onChange() {
    this.setState({ vehicles: VehicleStore.getAllVehicles(), district: CoreStore.getDistrict() });
  };
  render() {

    return (
      <div className="VehiclePage">
        <div className="VehiclePage-container">
          {
            this.props.path === '/' ? null : <h1>{this.props.title}</h1>
          }
          <VehicleList vehicles={this.state.vehicles} district={this.state.district} />
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }

}

export default VehiclePage;
