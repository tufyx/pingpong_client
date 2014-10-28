app.controller('PlayersController', function($scope,$http){
	var messages = new Array();
	messages['integrity_error'] = "This email was already registered"
	messages['success'] = "Player was successfully added";
	messages['error'] = "There was an error while completing the request";
	messages['invalid_email'] = "The email you provided is invalid"
	messages['required_field'] = "All fields are required";
	
	this.players = null;
	this.player = null;
	this.formVisible = false;
	this.displayAlert = false;
	this.displaySuccess = false;
	this.displayError = false;
	this.action = "add";
	  
	this.notificationMessage = "";
	
	this.getDisplaySuccess = function() {
		return this.displaySuccess;
	}
	
	this.getDisplayError = function() {
		return this.displayError;
	}
	
	this.getDisplayAlert = function(type) {
		return this.displayAlert;
	}
  
	this.setDisplayAlert = function(displayAlert,type,message) {
		this.displayAlert = displayAlert;
		this.notificationMessage = message;
		switch(type) {
			case "success":
				this.displaySuccess = displayAlert;
				this.displayError 	= !displayAlert;
				break;
			case "error":
				this.displaySuccess = !displayAlert;
				this.displayError 	= displayAlert;
				break;
		}
	}
  
	this.setFormVisible = function(formVisible) {
		this.formVisible = formVisible;
	}
  
	this.getFormVisible = function() {
		return this.formVisible;
	}
  
	this.getAllPlayers = function(){
		var url = API_URL + "/users";
		$http.get(url)
	    	.success(function(data, status, headers, config) {
	    		this.players = data['response'];
	    		for (el in this.referees) {
	    			this.referees[el]['imageURL'] = IMAGES + this.referees[el]['image'];
	    			this.referees[el]['selected'] = false;
	    		}
	    	}.bind(this))
	    	.error(function(data, status, headers, config) {
	    		console.log(config);
	    	}.bind(this));  
	}
  
	this.openForm = function(action) {
		this.action = action;
		switch (action) {
	  		case "add":
	  			this.player = null;
	  			break;
	  		case "edit":
	  			for (el in this.players) {
	  				if(this.players[el]['selected']) {
	  					this.player = this.players[el];
	  				}
	  			}
	  			this.buttonTitle = "Edit";
	  			break;
		}
		this.setFormVisible(true);
  }
  
  this.addPlayer = function() {
	  	var url = API_URL + "/user/add";
	  	if (this.validatePlayer()) {
	  		$http.post(url,this.player)
	  		.success(function(data, status, headers, config) {
	  			if (data.response) {
	  				this.setDisplayAlert(true,"success",messages['success']);
	  				this.getAllPlayers();
	  			} else {
	  				this.setDisplayAlert(true,"error",messages[data.error]);
	  			}
	  			
	  			this.setFormVisible(false);
	  			
	  		}.bind(this))
	  		.error(function(data, status, headers, config) {
	  			this.setDisplayAlert(true,"error",messages['error']);
	  		}.bind(this));	  		
	  	}
  	}
  
  	this.validatePlayer = function() {
  		var regex_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		if (this.player) {
  			console.log('email = ' + this.player.email);
			if (!this.player.email || !regex_email.test(this.player.email)) {
  				this.setDisplayAlert(true,"error",messages['invalid_email']);
  				return false;
  			}
  			if (!this.player.firstName || !this.player.lastName) {
  				this.setDisplayAlert(true,"error",messages['required_field']);
  				return false;
  			} 
  		} else {
  			this.setDisplayAlert(true,"error",messages['required_field']);
  			console.log('field required, no player data');
			return false;
  		}
  		return true;
  	}
  
  	this.getAllPlayers();
  });