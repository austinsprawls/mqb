/**
 * Created by jmunsch on 10/24/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './DriversPage.css'
import withStyles from '../../decorators/withStyles'
import CoreStore from '../../stores/CoreStore'

import DriversActions from '../../actions/DriversActions'
import DriversStore from '../../stores/DriversStore'
import PrimaryDriver from './PrimaryDriver'
import AdditionalDrivers from './AdditionalDrivers'
import {  Row, Col, Input, Panel, Button, Glyphicon } from 'react-bootstrap'

@withStyles(styles)
class DriversPage extends Component {
  constructor() {
    super();
    this.state = {
      drivers: DriversStore.getAllDrivers(),
      district: CoreStore.getDistrict(),
      title: 'Drivers Page',
      panel: 0
    };
    this._onChange = this._onChange.bind(this);
    this.updatePanel = this.updatePanel.bind(this);
    this.updatePrimaryDriver = this.updatePrimaryDriver.bind(this);
    this.updateAdditionalDriver = this.updateAdditionalDriver.bind(this);
    this.createAdditionalDriver = this.createAdditionalDriver.bind(this);
    console.log('drivers page: this', this);
  }
  static propTypes = {
    drivers: PropTypes.object,
    district: PropTypes.string,
    title: PropTypes.string,
  };
  componentWillMount() {
    DriversStore.addChangeListener(this._onChange);
    CoreStore.addChangeListener(this._onChange);
  };
  componentDidUpdate(){
    console.log('driversPage: componentDidUpdate: ', arguments)
  }
  componentWillUnmount() {
    DriversStore.removeChangeListener(this._onChange);
    CoreStore.removeChangeListener(this._onChange);
  };

  _onChange() {
    console.log('_onChange: ', this.state)
    this.setState({
      drivers: DriversStore.getAllDrivers(),
      district: CoreStore.getDistrict(),
      panel: this.state.panel
    });
  };

  updatePanel(id) {
    console.log('Updating Panel: ', id)
    this.setState({
      drivers: this.state.drivers,
      district: this.state.district,
      panel: id
    })
  }

  updatePrimaryDriver(field, value){
      this.state.drivers['primaryDriver'][field] = value
      this.setState({
        drivers: this.state.drivers,
        district: this.state.district,
        panel: this.state.panel
      })
  }

  updateAdditionalDriver(field, value, id){
    this.state.drivers['additionalDrivers'][id][field] = value
    this.setState({
      drivers: this.state.drivers,
      district: this.state.district,
      panel: this.state.panel
    })
  }

  createAdditionalDriver(){
    console.log('Pushing Driver into Additional Drivers')
    DriversActions.createAdditionalDriver();
    var drivers = DriversStore.getAllDrivers()
    this.setState({
      drivers: drivers,
      district: CoreStore.getDistrict(),
      panel: 0 + drivers.additionalDrivers.length
    });
    console.log(this.state)
  }
  render() {
    const createAdditionalDriverButton = (
      <Button type="button" bsStyle="warning" onClick={this.createAdditionalDriver}>Add Another Person</Button>
    );
    return (
      <div className="DriversPage">
        <h3>Drivers Page</h3>
        <div className="DriversPage-container container">
          <Row>
            <Col md={6}>
                <h3>
                  <label>Primary driver</label>
                  <span>
                    <Button onClick={ ()=> this.setState({ panel: this.state.panel === 0 ? -1 : 0, primaryDriver: this.state.primaryDriver})}>
                      <Glyphicon glyph={this.state.panel === 0 ? "chevron-up" : "chevron-down"} />
                    </Button>
                  </span>
                </h3>
            </Col>

          </Row>
          <PrimaryDriver
            primaryDriver={this.state.drivers.primaryDriver}
            panel={this.state.panel}
            updateDriver={this.updatePrimaryDriver}
            updatePanel={this.updatePanel}
          />
          <Row>
            <h3>Additional drivers</h3>
          </Row>
          <AdditionalDrivers
            additionalDrivers={this.state.drivers.additionalDrivers}
            panel={this.state.panel}
            updateDriver={this.updateAdditionalDriver}
            updatePanel={this.updatePanel}
            />
          {createAdditionalDriverButton}
        </div>
      </div>
    );
  }

}

export default DriversPage;
