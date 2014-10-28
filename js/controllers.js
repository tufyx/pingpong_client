// Controllers
  
  app.controller('MainNavigationController', function(){
	  this.menuEntry = -1;
	  
	  this.getMenuEntry = function() {
		  return this.menuEntry;
	  }
	  
	  this.setMenuEntry = function(menuEntry){
		  this.menuEntry = menuEntry;
	  };
	  
	  this.isSelected = function(menuEntry){
		  return this.menuEntry === menuEntry;
	  };
	  
	  this.entries = [
	                   {"name":"Players", "id":0, "path":"#/players"},
	                   {"name":"Fixtures", "id":1, "path":"#/fixtures"},
	                   {"name":"Results", "id":2, "path":"#/results"},
	                   {"name":"Regulations", "id":3, "path":"#/regulations"},
	                   {"name":"Game Rules", "id":4, "path":"#/rules"}
	                 ];
  });