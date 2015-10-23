/**
 * Created by austinsprawls on 10/23/15.
 */
import React, { PropTypes, Component } from 'react'
import styles from './VehicleInfo.css'
import { Row, Col, Input } from 'react-bootstrap'

class VehicleForm extends Component {
  constructor(){
    super();
    console.log("VehicleForm constructor(): this",this)
  }

  static propTypes = {
  };

  render() {

    return (
      <div className="VehicleInfo">
        <Row>
          <Col md={6}>
            <Input type="select" label="Auto Information" placeholder="Select a year">
              <option value={2015}>2015</option>
              <option value={2014}>2014</option>
            </Input>
          </Col>
          <Col md={6}></Col>
        </Row>
      </div>
    );
  }
}

export default VehicleForm;
