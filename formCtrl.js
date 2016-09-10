//** This controller is doing things related to the whole form
//** Firstly checking validation of all inputs,
//**    then sending request to php file and getting response to preset on webpage

numberSortApp.controller('formCtrl', operateForm);

function operateForm($scope, $http, $q, glbConstantService, clearFormMsgService,
                      isAllInputValid, formMessage){

  $scope.formData = {};
  $scope.formData.numberType = "Decimal";
  formMessage = clearFormMsgService.clearFormMsg(formMessage);
  $scope.formMessage = formMessage;

  $scope.processForm = function(){
    formMessage = clearFormMsgService.clearFormMsg(formMessage);
    $scope.formMessage = formMessage;
    //** validate inputs
    var numArr = $scope.formData.numToSort;

    var inputCountPromise = checkInputCount(numArr);
    //** set formMessage.inputCount
    inputCountPromise.then(function(isProceedPost){
      if(isProceedPost){
        formMessage.inputCount = "";
      }
      else{
        formMessage.inputCount = "You have to put at least "
                          + glbConstantService.minInputNumber
                          + " numbers.";
      }
      $scope.formMessage.inputCount = formMessage.inputCount;
    });

    var inputValidPromise = checkInputValid(isAllInputValid.value);
    //** set formMessage.inputValid
    inputValidPromise.then(function(isProceedPost){
      if(isProceedPost){
        formMessage.inputValid = "";
      }
      else{
        formMessage.inputValid = " Please modify the invalid input marked in red frame.";
      }
      $scope.formMessage.inputValid = formMessage.inputValid;
    });
    $q.all([inputCountPromise, inputValidPromise])
    //** after checking both count of inputs and validation
    .then(function(results){
      console.log(results);
      if( results[0] && results[1] ){
      //** if both return true, send request
        $http({
          method : 'POST',
          url : 'processFormContent.php',
          data : {
            "formData" : $scope.formData,
            "globalVar" : glbConstantService
          }
        })
        .success(function(response){
          console.log(response);
          formMessage.result = response.toString();
          $scope.formMessage.result = formMessage.result;
        })
      }
    })
  }

  //** checkInputCount: check if count of input is larget than minInputNumber
  //** developer comment: wrap into a function which creates deferr.promise
  //**                    because calling service brings potential async
  //** parameters: 1)inputArr: array, include all input numbers
  //** return: promise with isProceedPost
  //** example: checkInputCount([0:"1", "2":3]) should return a promise with false
  function checkInputCount(inputArr){
    var deferred = $q.defer();
    var isProceedPost = true;
    var numArr = inputArr;
    var inputCount = Object.keys(numArr).length;
    if( inputCount < glbConstantService.minInputNumber){
    //** check number of inputs
      var isProceedPost = false;
    }
    else{
      var isProceedPost = true;
    }
    deferred.resolve(isProceedPost);
    return deferred.promise;
  }

  //** checkInputValid: check if global value isAllInputValid.value is true
  //** developer comment: wrap into a function which creates deferr.promise
  //**                    because calling service brings potential async
  //** parameters: 1)isAllValid: boolean
  //** example: checkInputValid(true) should return a promise with true
  function checkInputValid(isAllValid){
    var deferred = $q.defer();
    var isProceedPost = true;
    if(!isAllValid){
      isProceedPost = false;
    }
    else{
      isProceedPost = true;
    }
    deferred.resolve(isProceedPost);
    return deferred.promise;
  }
}
