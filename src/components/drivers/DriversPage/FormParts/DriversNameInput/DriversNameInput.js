/**
 * Created by jmunsch 10/24/2015
 */
import React, { PropTypes, Component } from 'react'
import styles from './DriversNameInput.css'
import { Input, Col } from 'react-bootstrap'

class DriversNameInput extends Component {
  constructor(){
    super();
    console.log("DriversNameInput constructor(): this",this)
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
      <div className="primaryDriversNameInput">
        <Col md={3}>
          <Input type="text"
                 name="firstName"
                 onChange={handleChange}
                 placeholder="First Name"
                 label="Driver's first name?"
                 help="Enter first name"
                 required
            />
        </Col>
        <Col md={3}>
          <Input type="text"
                 name="middleName"
                 onChange={handleChange}
                 placeholder="Middle Name"
                 label="Your middle name?"
                 help="Enter middle name"
                 required
            />
        </Col>
        <Col md={3}>
          <Input type="text"
                 name="lastName"
                 onChange={handleChange}
                 placeholder="Last Name"
                 label="Your last name?"
                 help="Enter last name"
                 required
            />
        </Col>
        <Col md={2}>
          <Input type="select"
                 name="suffixName"
                 onChange={handleChange}
                 placeholder="Suffix Name"
                 label="Suffix Name"
            >
            <option value="">No Suffix</option>
            <option value="JR">JR</option>
            <option value="SR">SR</option>
          </Input>
        </Col>
      </div>
    );
  }
}

export default DriversNameInput;
