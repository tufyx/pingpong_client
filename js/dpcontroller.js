app.controller('DPController',function ($rootScope,$scope) {
  $scope.setDate = function(date) {
	  if(date) {
		  $scope.dt = new Date(date);	  
	  } else {
		  $scope.dt = null;
	  }
    
  };
  
  $scope.getDate = function() {
	  return $scope.dt.getFullYear() + "-" + ($scope.dt.getMonth() + 1) + "-" + $scope.dt.getDate();
  }
  
  $scope.clear = function () {
    $scope.dt = null;
  };

//  // Disable weekend selection
//  $scope.disabled = function(date, mode) {
//    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
//  };

  $scope.setMinDate = function(minDate) {
    $scope.minDate = minDate;
  };
  
  $scope.setMaxDate = function(maxDate) {
    $scope.maxDate = maxDate;
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    
    $scope.opened = true;
  };

  $scope.changeDate = function($event,emitter) {
	  if($scope.triggerChange) {
		  var data = new Object();
		  data.date = $scope.getDate();
		  data.emitter = emitter;
		  $scope.$emit("DATE_CHANGED",data);  
	  }
  };
  
  $rootScope.$on("DATE_CHANGED",function($event,data) {
	  if($scope.id != data.emitter) {
		  if (data.emitter == 'start') {
			  // set min-date for end
			  $scope.setMinDate(data.date);
		  } else {
			  // set max-date for start
			  $scope.setMaxDate(data.date);
		  }
	  } else {
		  return;
	  }
  });
  
  $rootScope.$on("EDIT_SEASON",function($event,data) {
	  if($scope.id == 'start') {
		  if(data) {
			  $scope.setDate(data.startDate);  
		  } else {
			  $scope.setDate();
		  }
	  }
	  if($scope.id == 'end') {
		  if(data) {
			  $scope.setDate(data.endDate);  
		  } else {
			  $scope.setDate();
		  }
	  }
  });
  
  $scope.myinit = function(id,triggerChange) {
	  $scope.id = id;
	  $scope.triggerChange = triggerChange;
//	  $scope.setMinDate(new Date(2006,0,1));
//	  $scope.setMaxDate(new Date(2020,11,31));
	  $scope.format = 'dd-MM-yyyy';
	  $scope.dateOptions = {
			    formatYear: 'yy',
			    startingDay: 1,
			    showWeeks: false
			  };
  }
});