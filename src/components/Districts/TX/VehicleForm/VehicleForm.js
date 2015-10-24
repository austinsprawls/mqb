/**
 * Created by jmunsch on 10/23/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './VehicleForm.css'
import withStyles from '../../../../decorators/withStyles'
import { Panel, Row, Col } from 'react-bootstrap'
import VehicleInfo from '../../shared/VehicleInfo'

class VehicleFormTX extends Component {
  constructor(){
    super();
    console.log("VehicleForm constructor(): this",this)
  }

  static propTypes = {
    vehicle: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  render() {
    const stateInfo = React.createElement('h1', null, 'Texas Content');
    console.log("hi i'm here in the VehicleForm component: ", this.props.vehicle);

    return (
      <div className="VehicleForm">
        {stateInfo}
        <form>
          <Row>
            <Col md={8} mdOffset={2}>
              <Panel>
                <Row>
                  <Col md={7}>
                    <VehicleInfo />
                  </Col>
                  <Col md={5}>
                  </Col>
                </Row>
              </Panel>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default VehicleFormTX;
