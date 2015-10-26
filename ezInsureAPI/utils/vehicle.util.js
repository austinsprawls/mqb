/**
 * Created by jlillz on 10/25/15.
 */
'use strict';
/*Start imported npm modules*/
var _ = require('lodash');
var Q = require('q');

//TODO find a good way to decouple this
var Quote = require('../../mustangCrudAPI/quote/quote.model');
var rateCtrl = require('../../mustangCrudAPI/rate/rate.controller');
/*End imported npm modules*/

module.exports = helperUtil();

function helperUtil(){
  /*Start exported variables*/
  /*End exported variables*/

  //Exported object
  var exported = {
    translateMakeNameToCode: translateMakeNameToCode,
    translateMakeCodeToName: translateMakeCodeToName,
    translateMakeCodeArrToNameArr: translateMakeCodeArrToNameArr
  };

  /*Start local variables for helperUtil*/
  //EZInsure codes
  var EZKeyToMake = {
    'ACUR': 'Acura',
    'ALFA': 'Alfa Romeo',
    'AMGL': 'American General',
    'AUDI': 'Audi',
    'AVTI': 'Avanti',
    'BMW': 'BMW',
    'BUIK': 'Buick',
    'CADI': 'Cadillac',
    'CHEV': 'Chevrolet',
    'CHRY': 'Chrysler',
    'DAEW': 'Daewoo',
    'DAIH': 'Daihatsu',
    'DODG': 'Dodge',
    'EAGL': 'Eagle',
    'FERR': 'Ferrari',
    'FIAT': 'Fiat',
    'FORD': 'Ford',
    'GMC': 'GMC',
    'HOND': 'Honda',
    'HUMM': 'Hummer',
    'HYUN': 'Hyundai',
    'INFI': 'Infiniti',
    'ISZU': 'Isuzu',
    'JAG': 'Jaguar',
    'JEEP': 'Jeep',
    'KIA': 'KIA',
    'LEXS': 'Lexus',
    'LINC': 'Lincoln',
    'LOTS': 'Lotus',
    'MASS': 'Massey-Ferguson',
    'MAZD': 'Mazda',
    'MBNZ': 'Mercedes-Benz',
    'MERC': 'Mercury',
    'MINI': 'Mini',
    'MITS': 'Mitsubishi',
    'MOBV': 'Mobility Ventures',
    'NSSN': 'Nissan',
    'OLDS': 'Oldsmobile',
    'PEUG': 'Peugeot',
    'PLYM': 'Plymouth',
    'PONT': 'Pontiac',
    'PORS': 'Porsche',
    'RAM': 'Ram',
    'ROVR': 'Rover',
    'SAAB': 'Saab',
    'SATN': 'Saturn',
    'SCIO': 'Scion',
    'SMRT': 'Smart',
    'STER': 'Sterling',
    'SUBA': 'Subaru',
    'SUZU': 'Suzuki',
    'TSLA': 'Tesla',
    'TYTA': 'Toyota',
    'VLKS': 'Volkswagen',
    'VLVO': 'Volvo',
    'VPG': 'Vehicle Production Group',
    'YUGO': 'Yugo'
  };

//Makes
  var MakeToEZKey = {
    'Acura': 'ACUR',
    'Alfa Romeo': 'ALFA',
    'American General': 'AMGL',
    'Audi': 'AUDI',
    'Avanti': 'AVTI',
    'BMW': 'BMW',
    'Buick': 'BUIK',
    'Cadillac': 'CADI',
    'Chevrolet': 'CHEV',
    'Chrysler': 'CHRY',
    'Daewoo': 'DAEW',
    'Daihatsu': 'DAIH',
    'Dodge': 'DODG',
    'Eagle': 'EAGL',
    'Ferrari': 'FERR',
    'Fiat': 'FIAT',
    'Ford': 'FORD',
    'GMC': 'GMC',
    'Honda': 'HOND',
    'Hummer': 'HUMM',
    'Hyundai': 'HYUN',
    'Infiniti': 'INFI',
    'Isuzu': 'ISZU',
    'Jaguar': 'JAG',
    'Jeep': 'JEEP',
    'KIA': 'KIA',
    'Lexus': 'LEXS',
    'Lincoln': 'LINC',
    'Lotus': 'LOTS',
    'Massey-Ferguson': 'MASS',
    'Mazda': 'MAZD',
    'Mercedes-Benz': 'MBNZ',
    'Mercury': 'MERC',
    'Mini': 'MINI',
    'Mitsubishi': 'MITS',
    'Mobility Ventures': 'MOBV',
    'Nissan': 'NSSN',
    'Oldsmobile': 'OLDS',
    'Peugeot': 'PEUG',
    'Plymouth': 'PLYM',
    'Pontiac': 'PONT',
    'Porsche': 'PORS',
    'Ram': 'RAM',
    'Rover': 'ROVR',
    'Saab': 'SAAB',
    'Saturn': 'SATN',
    'Scion': 'SCIO',
    'Smart': 'SMRT',
    'Sterling': 'STER',
    'Subaru': 'SUBA',
    'Suzuki': 'SUZU',
    'Tesla': 'TSLA',
    'Toyota': 'TYTA',
    'Volkswagen': 'VLKS',
    'Volvo': 'VLVO',
    'Vehicle Production Group': 'VPG',
    'Yugo': 'YUGO'
  };
  /*End local variables for helperUtil*/

  /*Start exported functions*/
  /**
   * @name translateMakeNameToCode
   * @description translates make names into four digit EZInsure code
   * @param makeName - name of the make of the car
   * @returns four digit code for EZInsure eg. ACUR
   */
  function translateMakeNameToCode(makeName){
    return MakeToEZKey[makeName];
  }

  /**
   * @name translateMakeCodeToName
   * @description translates EZInsure make code to full name
   * @param makeName
   * @returns name of make
   */
  function translateMakeCodeToName(makeName){
    return EZKeyToMake[makeName];
  }

  /**
   * @name translateMakeCodeArrToNameArr
   * @description translates array of EZInsure make codes to full names
   * @param makeArr - array of EZInsure make codes
   * @returns array of make full names
   */
  function translateMakeCodeArrToNameArr(makeArr){
    return makeArr.map(function(makeCode){
      return translateMakeCodeToName(makeCode);
    });
  }
  /*End exported functions*/

  /*Start local functions*/
  /*End local functions*/

  return exported;
}
