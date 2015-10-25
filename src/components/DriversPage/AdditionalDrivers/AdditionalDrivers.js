/**
 * Created by jmunsch on 10/24/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './AdditionalDrivers.css'
import withStyles from '../../../decorators/withStyles'
import {  Row, Col, Input, Panel, Button } from 'react-bootstrap'
import DriversStore from '../../../stores/DriversStore'

import AdditionalDriver from '../AdditionalDriver'

@withStyles(styles)
class AdditionalDrivers extends Component {
  constructor() {
    super();
    this.setDriverState = this.setDriverState.bind(this);
    //this.updateDriver = this.updateDriver.bind(this);
    console.log('AdditionalDrivers page: this', this);
  }
  static propTypes = {
    additionalDrivers: PropTypes.array,
    panel: PropTypes.number,
    updateDriver: PropTypes.func,
    updatePanel: PropTypes.func,
  };

  setDriverState(id) {
    return (event) => {
      var field = event.target.name
      var value = event.target.value;
      this.props.updateDriver(field, value, id);
      this.setState({additionalDrivers: this.state.additionalDrivers, panel: this.state.panel});
    }
  }

  render() {
    var updateDriver = this.props.updateDriver;
    var updatePanel = this.props.updatePanel;
    var additionalDrivers = this.props.additionalDrivers.map((driver, id)=>{

    var setDriverState = this.setDriverState;

      console.log('additional driver', driver)
      return (
        <AdditionalDriver
          additionalDriver={driver}
          panel={this.props.panel}
          panelId={driver._id}
          key={id}
          updatePanel={updatePanel}
          updateDriver={updateDriver}
          setDriverState={setDriverState(id)}
          />
      )
    })

    return (
      <div>
        {additionalDrivers}
      </div>
    )
  }

}

export default AdditionalDrivers;
