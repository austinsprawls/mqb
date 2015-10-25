/**
 * Created by jmunsch 10/24/2015
 */
import React, { PropTypes, Component } from 'react'
import styles from './DriversContactInfoInput.css'
import { Input, Col, Glyphicon } from 'react-bootstrap'

class DriversContactInfoInput extends Component {
  constructor(){
    super();
    console.log("DriversContactInfoInput constructor(): this",this)
  }

  static propTypes = {
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    suffixName: PropTypes.string,
    handleChange: PropTypes.func,
  };

  render() {
    const handleChange = this.props.handleChange;
    console.log('Render Name Input: handleChange', handleChange)
    return (
      <div className="DriversContactInfoInput">
        <Col md={6}>
          <span>
            <Input type="text"
                   name="email"
                   onChange={handleChange}
                   placeholder="Email"
                   label="Driver's email?"
                   help="Enter email"
                   required
              />
            </span>
        </Col>
        <Col md={6}>
          <Input type="text"
                 name="phone"
                 onChange={handleChange}
                 placeholder="(___)___-____"
                 label="Your phone number?"
                 help="Enter phone number"
                 required
            />
        </Col>
      </div>
    );
  }
}

export default DriversContactInfoInput;
