<!DOCTYPE html>

<html lang="en">
<!-- This is the main page of the web application -->
<!-- Includes Number Sort panel, warning message panel and result panel -->

<head>
  <title>Number Sort</title>

  <?php include 'head.php'; ?>
  <?php echo $htmlStr; ?>

</head>

<body ng-app="numberSortApp">

  <form ng-controller="formCtrl" ng-submit="processForm()">

    <div class="container col-lg-offset-2 col-lg-8">

      <div class="row marginTop20" ng-controller="numberSortPanelCtrl">
        <number-sort-panel/>
      </div>
      <div class="row marginBottom20">
        <input type="submit" class="btn btn-primary col-sm-2 col-sm-offset-10" name="sortBtn" value="Sort">
      </div>

      <div class="row">
        <div class="panel panel-danger"
          ng-class="(formMessage.inputCount==''&&formMessage.inputValid=='')? 'hidden':''">
          <div class="panel-body">
            <p>Notice:</p>
            <p ng-model="formMessage.inputCount">{{formMessage.inputCount}}</p>
            <p ng-model="formMessage.inputValid">{{formMessage.inputValid}}</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="panel panel-info"
          ng-class="(formMessage.result=='')? 'hidden':''">
          <div class="panel-body">
            <p>Result:</p>
            <p ng-model="formMessage.inputCount">{{formMessage.result}}</p>
          </div>
        </div>
      </div>
    </div>


  </form>

  <!------------------------------ JavaScript part ---------------------------------->

  <!-- AngularJS scripts -->
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>

  <!-- AngularJs Application Specific Scripts -->
  <script src="numberSortApp.js"></script>
  <script src="formCtrl.js"></script>
  <script src="numberSortPanelCtrl.js"></script>

</body>

</html>
