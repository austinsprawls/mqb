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
          <Col md={12}>
            <Input type="select" label="Auto Information" placeholder="Select a year" required>
              <option value={2015}>2015</option>
              <option value={2014}>2014</option>
            </Input>
            <Input type="select" placeholder="Select a make" required>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Hyundai">Hyundai</option>
            </Input>
            <Input type="select" placeholder="Select a model" required>
              <option value="CLA-250">CLA-250</option>
              <option value="Sonata">Sonata</option>
            </Input>
            <Input type="select" placeholder="Select a year" required>
              <option value="4WD">4WD</option>
              <option value="2WD">2WD</option>
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VehicleForm;
