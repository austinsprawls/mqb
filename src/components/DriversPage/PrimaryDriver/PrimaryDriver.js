/**
 * Created by jmunsch 10/24/2015
 */
import React, { PropTypes, Component } from 'react'
import styles from './PrimaryDriver.css'
import withStyles from '../../../decorators/withStyles'
import {  Row, Col, Input, Panel, Button } from 'react-bootstrap'
import DriversStore from '../../../stores/DriversStore'

import DriversNameInput from '../FormParts/DriversNameInput'
import DriversContactInfoInput from '../FormParts/DriversContactInfoInput'

@withStyles(styles)
class PrimaryDriver extends Component {
  constructor() {
    super();
    this.setDriverState = this.setDriverState.bind(this);
    console.log('PrimaryDriver page: this', this);
  }
  static propTypes = {
    primaryDriver: PropTypes.object,
    panel: PropTypes.number,
    updateDriver: PropTypes.func,
    updatePanel: PropTypes.func,
  };

  setDriverState(event) {
    var field = event.target.name
    var value = event.target.value;
    this.props.updateDriver(field, value);
    this.setState({primaryDriver: this.primaryDriver, panel: this.panel});
  }

  render() {
    const firstName =  this.props.primaryDriver.firstName || 'First'
    const middleName = this.props.primaryDriver.middleName || 'Middle'
    const lastName = this.props.primaryDriver.lastName || 'Last'
    const suffixName = this.props.primaryDriver.suffixName || 'Suffix'
    const driverName = [firstName, middleName, lastName, suffixName !== 'Suffix' ? suffixName : ''].join(' ')

    return (
      <div className="primaryDriver">
        <Row>
          <Col md={12}>
            <Panel
              onClick={()=> this.props.updatePanel(0)}
              header={driverName}
              collapsible
              expanded={this.props.panel === 0}>
              <Row>
                <Col md={12}>
                  <DriversNameInput
                    firstName={firstName}
                    middleName={middleName}
                    lastName={lastName}
                    suffixName={suffixName}
                    handleChange={this.setDriverState}
                    />
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col md={12}>
                  <DriversContactInfoInput
                    handleChange={this.setDriverState}
                    />
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
        <hr/>
      </div>
    );
  }

}

export default PrimaryDriver;
