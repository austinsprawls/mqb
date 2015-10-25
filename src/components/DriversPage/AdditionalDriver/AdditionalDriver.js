/**
 * Created by jmunsch on 10/24/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './AdditionalDriver.css'
import withStyles from '../../../decorators/withStyles'
import {  Row, Col, Input, Panel, Button } from 'react-bootstrap'
import DriversStore from '../../../stores/DriversStore'

import DriversNameInput from '../FormParts/DriversNameInput'
import DriversContactInfoInput from '../FormParts/DriversContactInfoInput'

@withStyles(styles)
class AdditionalDriver extends Component {
  constructor() {
    super();
    console.log('AdditionalDriver page: this', this);
  }
  static propTypes = {
    additionalDriver: PropTypes.object,
    panel: PropTypes.number,
    panelId: PropTypes.number,
    setDriverState: PropTypes.func,
    updateDriver: PropTypes.func,
    updatePanel: PropTypes.func,
  };

  render() {
    const firstName =  this.props.additionalDriver.firstName || 'First'
    const middleName = this.props.additionalDriver.middleName || 'Middle'
    const lastName = this.props.additionalDriver.lastName || 'Last'
    const suffixName = this.props.additionalDriver.suffixName || 'Suffix'
    const driverName = [firstName, middleName, lastName, suffixName !== 'Suffix' ? suffixName : ''].join(' ')
    const goPanel = () => {
      console.log(this.props)
      this.props.updatePanel(this.props.panelId)
    }
    return (
      <div className="additionalDriver">
        <Row>
          <Col md={12}>
            <Panel
              onClick={goPanel}
              header={driverName}
              collapsible
              expanded={this.props.panel === this.props.panelId}>
              <Row>
                <Col md={12}>
                  <DriversNameInput
                    firstName={firstName}
                    middleName={middleName}
                    lastName={lastName}
                    suffixName={suffixName}
                    handleChange={this.props.setDriverState}
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
                <hr/>
              </Row>
            </Panel>
          </Col>
        </Row>
        <hr/>
      </div>
    );
  }

}

export default AdditionalDriver;
