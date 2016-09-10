<?php

  //** This php do bubble sort according to the number type selected
  //** To be improved: expand number types to octal, hex, ...

  //---------------------- Process Request --------------------------------- //

  //** AngularJs Post is in json format, so need to decode first
  $postData = file_get_contents("php://input");
  $request = json_decode($postData, true);  // decode to array

  //** do bubble sort
  $decimalArr = [];
  $binaryArr = [];
  $idxArr = [];
  if($request["formData"]["numberType"]=="Decimal"){
    foreach($request["formData"]["numToSort"] as $idx=>$num){
      if($num!=null){
        $decimalArr[] = $num;
        $idxArr[] = $idx;
      }
    }
    $sortedArr = bubbleSort($decimalArr, $idxArr);
    $response = $sortedArr["numArray"];
  }
  elseif($request["formData"]["numberType"]=="Binary"){
    //** convert to base 10 number
    $i=0;
    foreach($request["formData"]["numToSort"] as $idx=>$num){
      if($num!=null){
        $binaryArr[] = $num;
        $dec = bindec($num);
        $decimalArr[] = $dec;
        $idxArr[] = $i;
        $i++;
      }
    }
    $sortedArr = bubbleSort($decimalArr, $idxArr);
    //** sort original binary array according to sorted index
    $sortedIdx = $sortedArr["idxArray"];
    $sortedBinArr = [];
    foreach($sortedIdx as $idx){
      foreach($binaryArr as $binIdx=>$bin){
        if($idx==$binIdx){
          $sortedBinArr[] = $bin;
          break;
        }
      }
    }
    $response = $sortedBinArr;
  }

  //** return response
  echo json_encode($response);

  //-------------------------------- Functions ------------------------------------ //

  //** bubbleSort: sort a decimal array
  //** parameters: 1)$arr: decimal array 2)$idxArr: index array
  //** example: bubbleSort([4,5,3], [0,1,2])
  //**          should return ("numArray":[3,4,5], "idxArray":[2,0,1])
  function bubbleSort($arr, $idxArr){
    $sorted = [];
    $arrCount = count($arr);
    for( $i=0; $i < $arrCount; $i++ ){
      for ($j=0; $j < $arrCount-1-$i; $j++) {
        if( $arr[$j+1] < $arr[$j] ){
          swapNum($arr, $j, $j+1);
          swapNum($idxArr, $j, $j+1);
        }
      }
    }
    $sorted["numArray"] = $arr;
    $sorted["idxArray"] = $idxArr;
    return $sorted;
  }

  function swapNum(&$arr, $a, $b) {
    $tmp = $arr[$a];
    $arr[$a] = $arr[$b];
    $arr[$b] = $tmp;
  }

?>
