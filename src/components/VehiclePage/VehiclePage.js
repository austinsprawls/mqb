/**
 * Created by jlillz on 10/22/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './VehiclePage.css'
import withStyles from '../../decorators/withStyles'
import VehicleActions from '../../actions/VehicleActions'
import VehicleStore from '../../stores/VehicleStore'

@withStyles(styles)
class VehiclePage extends Component {

  getInitialState() {
   return { vehicles: VehicleStore.getAllVehicles() };
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    VehicleStore.addChangeListener(this._onChange);
  };

  componentWillUnmount() {
    VehicleStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({ vehicles: VehicleStore.getAllVehicles() });
  };

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div className="VehiclePage">
        <div className="VehiclePage-container">
          {
            this.props.path === '/' ? null : <h1>{this.props.title}</h1>
          }
          <VehicleList vehicles={this.state.vehicles} />
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }

}

export default VehiclePage;
