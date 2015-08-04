$(document).ready(function(){
   // Main functions for this app 
   
   // Defaults for this app  
   var index      = null;
   var sortable   = $('.sortable');
   var parent     = $('.parent-zone'); 
   var defaults   = {
   	key: "Untitled",
   	width: "100px",
   	heigth: "50px",
   	index: 0,
   	dropdown: {
   		state_id:    0,
        name:       "first choice",
        deleted:    "false",
        is_default: "true"
   	}
   }

    // Initialize sortable
    $(".sortable").sortable({	
    	revert: true,
    	receive:  function(event, ui) {
    		var typeOfField = ui.item.text();
    		// Render dragged field
    		renderDraggedFields(typeOfField);
  	 	
    	}	
    });

    // Initialize  draggable
    $( ".draggable li" ).draggable({
      connectToSortable: ".sortable",
      helper: "clone",
      revert: "invalid"
    });

    // Load data from database
    function getDataFromDatabase() {
    	$.ajax({
    		url: "custom-form-dummy.json",
    		method: "GET",
    		dataType: "json"
    	}).done(function(data){
    		getIndexOfFormProperty(data.groups);
    	});
    }
    
    // Make call to load data
    getDataFromDatabase();

    // Find object that has form property ( we need to know on what index is located to render view based on that data)
    function getIndexOfFormProperty(data) {

    	for(var i = 0; i < data.length; i++) {
	        if(data[i].hasOwnProperty('form')) {
	           index = i;
	        }
        }

        renderProperties(data[index].form);
        renderParents(data);
    }
    
    // Render view base on data received from database
    function renderProperties(data) {
    	$.each(data, function(key, value) {
    		renderBasedOnTypeOfField(value);
    	});
    }

    // Render properties based on type of fields
    function renderBasedOnTypeOfField(obj) {
       
    	var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()
		var yyyy = today.getFullYear();
		today = mm+'/'+dd+'/'+yyyy;


    	switch(obj.field_type) {
    		case 'input': 
    		sortable.append('<li data-type="' + obj.field_type +'" data-index="' + obj.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<input type="text" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'input-number': 
    		sortable.append('<li data-type="' + obj.field_type +'" data-index="' + obj.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<input type="number" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'input-decimal':
    		sortable.append('<li data-type="' + obj.field_type +'" data-index="' + obj.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<input type="number" disabled=true step="any">' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'textarea':
    		sortable.append('<li data-type="' + obj.field_type +'" data-index="' + obj.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<textarea draggable="false" disabled=true> </textarea>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'dropdown': 
    		sortable.append('<li data-type="' + obj.field_type +'" data-index="' + obj.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<select disabled=true> <option value="'+ obj.dropdown_choices[0].state_id  +'"   >' + obj.dropdown_choices[0].name  + '</option>' + '</select>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'datepicker':
    		sortable.append('<li data-type="' + obj.field_type +'" data-index="' + obj.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<input type="text" value="'+today +'" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'checkbox':
    		sortable.append('<li data-type="' + obj.field_type +'" data-index="' + obj.index +'">' +
    		'<label>' + obj.key + '</label>' + 
    		'<div>' +
    		'<input type="checkbox" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;
    		
    	}
    }

    // Render parents data
    function renderParents(data) {
    	$.each(data, function(i, value) {
    		// If i is not equal to index of object where we have form property display data for parents
    		if(i !== index ) {
    			parent.append('<div>' +'<h4>'+ value.name + '</h4>' + '<p>' + value.description + '</p>' + '</div>')
    		}
    		else {
    			parent.append('<div> <h4>'+ value.name +'</h4></div>')
    		}

    	})

    }

    // Render dragged fields
    function renderDraggedFields(typeOfField, objectOfElement) {

    	var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()
		var yyyy = today.getFullYear();
		today = mm+'/'+dd+'/'+yyyy;


    	switch(typeOfField) {
    		case 'input': 
    		sortable.append('<li data-type="' + typeOfField +'" data-index="' + defaults.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<input type="text" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'input-number': 
    		sortable.append('<li data-type="' + typeOfField +'" data-index="' + defaults.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<input type="number" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'input-decimal':
    		sortable.append('<li data-type="' + typeOfField +'" data-index="' + defaults.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<input type="number" disabled=true step="any">' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'textarea':
    		sortable.append('<li data-type="' + typeOfField +'" data-index="' + defaults.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<textarea draggable="false" disabled=true> </textarea>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'dropdown': 
    		sortable.append('<li data-type="' + typeOfField +'" data-index="' + defaults.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<select disabled=true> <option value="'+ defaults.dropdown.state_id  +'"   >' + defaults.dropdown.name  + '</option>' + '</select>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'datepicker':
    		sortable.append('<li data-type="' + typeOfField +'" data-index="' + defaults.index +'">' +
    		'<label>' + defaults.key + '</label>' + 
    		'<div>' +
    		'<input type="text" value="'+today +'" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;
    		
    	}










    	
    }
      






})