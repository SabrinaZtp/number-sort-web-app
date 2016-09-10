//** This is the root module for the web application
//** Directives, global values, services should be registerd/defined here 

var numberSortApp = angular.module('numberSortApp', []);

// ------------------------------------  Directives --------------------------------------------- //

//** register directive numberSortPanel in module
numberSortApp.directive('numberSortPanel', function(){
  return {
    restrict: 'E',  // restrict directive to be used in HTML as an element
    replace : 'true',
    templateUrl : 'numberSortPanelTemplate.html'
  }
});

// ------------------------------------- Values ---------------------------------------------- //

//** isAllInputValid: boolean, store whether all input nodes values are valid
numberSortApp.value('isAllInputValid', {value : true});

numberSortApp.value('formMessage', {
  inputCount: "",
  inputValid: "",
  result: ""
});

// ------------------------------------- Services ----------------------------------------------- //

//** glbConstantService: return global constants
//** example: glbConstantService.minInputNumber should return 5
numberSortApp.factory('glbConstantService', function(){
  return {
    minInputNumber : 5,
    maxInputNumber : 10
  }
});

//** clearFormMsgService: reset formMessage to empty strings
numberSortApp.service('clearFormMsgService', function(){
  this.clearFormMsg = function(formMessage){
    formMessage.inputCount = "";
    formMessage.inputValid = "";
    formMessage.result = "";
    return formMessage;
  }
});

//** rangeService: return array of integers
//** parameters: 1) maxNumber: integer: maximum integer in array
//** example: rangeService.getRangeArray(3) should return [0,1,2]
numberSortApp.service('rangeService', function(){
  this.getRangeArray = function(maxNumber){
    var arr = [];
    var start = 0;
    while(arr.push(start++)<maxNumber);
    return arr;
  }
});

//** convertToBase10Service: convert number in any radix to base 10
//** parameters: 1)num: number in any radix  2)radix: base of number (eg.2,6,8,10)
//** example: convertToBase10Service.convertToBase10("010", 2) should return 2
numberSortApp.service('convertToBase10Service', function(){
  this.convertToBase10 = function(num, radix){
    return parseInt(num, radix);
  }
});
