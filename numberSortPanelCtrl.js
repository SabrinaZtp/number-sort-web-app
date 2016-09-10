//** This controller is doing things related to Number Sort panel
//** It sets scope variables
//**    and defines functions used by elements in the panel

numberSortApp.controller('numberSortPanelCtrl', operatePanelContent);

function operatePanelContent($scope, rangeService, glbConstantService, clearFormMsgService,
                      isAllInputValid, formMessage){

  $scope.minInputNumber = glbConstantService.minInputNumber;  // user can input minimum 5 numbers
  $scope.maxInputNumber = glbConstantService.maxInputNumber;  // user can input maximum 10 numbers

  $scope.numberTypes = ["Decimal", "Binary"];
  $scope.indexArray = rangeService.getRangeArray(glbConstantService.maxInputNumber);
  $scope.inputClass = [];

  $scope.clearPanels = function(){
    $scope.inputClass = [];
    $scope.formData.numToSort = [];
    formMessage = clearFormMsgService.clearFormMsg(formMessage);
    $scope.formMessage = formMessage;
  }

  $scope.clearMessage = function(){
    formMessage = clearFormMsgService.clearFormMsg(formMessage);
    $scope.formMessage = formMessage;
  }

  $scope.checkNumber = function(num, idx){
    var isValid = true;
    if(num.length!=0){
      if($scope.formData.numberType=="Decimal"){
        isValid = isValidDecimal(num);
      }
      else if($scope.formData.numberType=="Binary"){
        isValid = isValidBinary(num);
      }
    }
    else{
      delete $scope.formData.numToSort[idx]
      isValid = true;
    }

    if(!isValid){
      $scope.inputClass[idx] = "has-error";
    }
    else{
      $scope.inputClass[idx] = "";
    }

    if($scope.inputClass.indexOf("has-error")>-1){
      isAllInputValid.value = false;
    }
    else{
      isAllInputValid.value = true;
    }

  }
}

//** isValidDecimal: check if number is a valid decimal number
//** parameters: 1)num: any number/string
//** example: isValidDecimal(2.1) should return true
function isValidDecimal(num){
  return !isNaN(parseFloat(num)) && isFinite(num);
}

//** isValidBinary: check if number is a valid binary number and can be converted to valid decimal
//** parameters: 1)num: any number/string
//** example: isValidBinary(3) should return false
function isValidBinary(num){
  var regularex = /^[01]+$/;
  if(regularex.test(num)){
  //** if valid binary, check if can be convert to valid decimal
    var binary_decimal = parseInt(num,2);
    if(!isValidDecimal(binary_decimal)){
      return false;
    }
  }
  else{
    return false;
  }
  return true;
}
