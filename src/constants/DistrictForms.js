/**
 * Created by austinsprawls on 10/23/15.
 */
"use strict";

import React from 'react';

var DistrictForms = {
  'TX': React.createFactory( require('../components/Districts/TX/VehicleForm') ),
  'FL': React.createFactory( require('../components/Districts/FL/VehicleForm/VehicleForm') )
};

export default DistrictForms;
