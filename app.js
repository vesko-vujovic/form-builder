$(document).ready(function(){
   // Main functions for this app 
   
   var textareaMaxSize = '300px'


   
   // Defaults for this app  
   var index      = null;
   var sortable   = $('.sortable');
   var parent     = $('.parent-zone'); 
   var edit       = $('.edit');
   var defaults   = {
    id:  0,
   	key: "Untitled",
   	width: "100px",
   	heigth: "50px",
   	index: 0,
    status: 1,
   	dropdown: {
        name:       "first choice",
        deleted:    "false",
        is_default: "true"
   	}
   }

    // Initialize sortable
    $(".sortable ").sortable({	
    	revert:  true,
        helper: "clone",
        stop:   function(event, ui) {
             // Prevent click event when dragging element
             $( event.toElement ).one('click', function(e){ e.stopImmediatePropagation(); } );
        },
    	update: function(event, ui) {
    		var typeOfField = ui.item.text();
    		// Only render new dragged elements on the list (flag: replaced)
    		if(!ui.item.hasClass('replaced')) {
    			ui.item.addClass('replaced');
    			var li = renderDraggedFields(typeOfField, ui.item);
                getDataAttrs(li);
    		};
    		
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
        
    	switch(obj.formInformation.field_type) {
    		case 'text': 
    		sortable.append('<li  class="quarter" data-status="'+ obj.status +'" data-id="'+ obj.id +'"  data-desc="'+obj.description +'" data-custom="'+ obj.isCustom +'" data-required="' +  obj.required +'" data-type="' + obj.formInformation.field_type +'" data-order="' + obj.order +'">' +
    		'<label>' + obj.name + '</label>' + 
    		'<div>' +
    		'<input type="text" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'input-number': 
    		sortable.append('<li class="quarter" data-status="'+ obj.status +'" data-id="'+ obj.id +'"  data-desc="'+obj.description +'"  data-custom="'+ obj.isCustom +'" data-required="' +  obj.required +'" data-type="' + obj.formInformation.field_type +'" data-order="' + obj.order +'">' +
    		'<label>' + obj.name + '</label>' + 
    		'<div>' +
    		'<input type="number" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'input-decimal':
    		sortable.append('<li class="quarter" data-status="'+ obj.status +'" data-id="'+ obj.id +'"   data-desc="'+obj.description +'"  data-custom="'+ obj.isCustom +'"  data-required="' +  obj.required +'"  data-required="'+  +'"    data-type="' + obj.formInformation.field_type +'" data-order="' + obj.order +'">' +
    		'<label>' + obj.name + '</label>' + 
    		'<div>' +
    		'<input type="number" disabled=true step="any">' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'textarea':
    		sortable.append('<li class="quarter" data-status="'+ obj.status +'" data-id="'+ obj.id +'"   data-desc="'+obj.description +'"  data-custom="'+ obj.isCustom +'"   data-required="' +  obj.required +'" data-type="' + obj.formInformation.field_type +'" data-order="' + obj.order +'">' +
    		'<label>' + obj.name + '</label>' + 
    		'<div>' +
    		'<textarea draggable="false" disabled=true> </textarea>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'dropdown': 
    		sortable.append('<li class="quarter" data-status="'+ obj.status +'" data-id="'+ obj.id +'"   data-desc="'+obj.description +'"  data-custom="'+ obj.isCustom +'"  data-required="' +  obj.required +'" data-type="' + obj.formInformation.field_type +'" data-order="' + obj.order +'">' +
    		'<label>' + obj.name + '</label>' + 
    		'<div>' +
    		'<select disabled=true> <option value="'+ obj.formInformation +'"   >' + obj.formInformation.dropdown_choices[0].name  + '</option>' + '</select>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'datepicker':
    		sortable.append('<li class="quarter" data-status="'+ obj.status +'" data-id="'+ obj.id +'"   data-desc="'+obj.description +'"  data-custom="'+ obj.isCustom +'"  data-required="' +  obj.required +'" data-type="' + obj.formInformation.field_type +'" data-order="' + obj.order +'">' +
    		'<label>' + obj.name + '</label>' + 
    		'<div>' +
    		'<input type="text" value="'+today +'" disabled=true>' + 
    		'</div>'+
    		'</li>');
    		break;

    		case 'checkbox':
    		sortable.append('<li class="quarter" data-status="'+ obj.status +'" data-id="'+ obj.id +'"   data-desc="'+obj.description +'"  data-custom="'+ obj.isCustom +'"  data-required="' +  obj.required +'" data-type="' + obj.formInformation.field_type +'" data-order="' + obj.order +'">' +
    		'<label>' + obj.name + '</label>' + 
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
    function renderDraggedFields(typeOfField, objectOfDraggedElement) {

    	var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()
		var yyyy = today.getFullYear();
		today = mm+'/'+dd+'/'+yyyy;


        var text          = $('<li class="quarter" data-status="'+ defaults.status +'" data-id="'+ defaults.id +'"   data-desc=""  data-custom="1" data-required="false" data-type="' + typeOfField +'" data-order="' + defaults.index +'">' +
            '<label>' + defaults.key + '</label>' + 
            '<div>' +
            '<input type="text" disabled=true>' + 
            '</div>'+
            '</li>');

        var inputNumber  = $('<li class="quarter" data-status="'+ defaults.status +'" data-id="'+ defaults.id +'"  data-desc=""  data-custom="1" data-required="false" data-type="' + typeOfField +'" data-order="' + defaults.index +'">' +
            '<label>' + defaults.key + '</label>' + 
            '<div>' +
            '<input type="number" disabled=true>' + 
            '</div>'+
            '</li>');

        var inputDecimal = $('<li class="quarter" data-status="'+ defaults.status +'" data-id="'+ defaults.id +'"  data-desc="" data-custom="1" data-required="false" data-type="' + typeOfField +'" data-order="' + defaults.index +'">' +
            '<label>' + defaults.key + '</label>' + 
            '<div>' +
            '<input type="number" disabled=true step="any">' + 
            '</div>'+
            '</li>');

        var textarea      = $('<li class="quarter" data-status="'+ defaults.status +'" data-id="'+ defaults.id +'"  data-desc="" data-custom="1"  data-type="' + typeOfField +'" data-order="' + defaults.index +'">' +
            '<label>' + defaults.key + '</label>' + 
            '<div>' +
            '<textarea draggable="false" disabled=true> </textarea>' + 
            '</div>'+
            '</li>');

        var dropdown      = $('<li class="quarter" data-status="'+ defaults.status +'" data-id="'+ defaults.id +'"  data-desc="" data-dropdown="" data-custom="1" data-required="false" data-type="' + typeOfField +'" data-order="' + defaults.index +'">' +
            '<label>' + defaults.key + '</label>' + 
            '<div>' +
            '<select disabled=true> <option value="'+ defaults.dropdown.state_id  +'"   >' + defaults.dropdown.name  + '</option>' + '</select>' + 
            '</div>'+
            '</li>');

        var datepicker    = $('<li class="quarter" data-status="'+ defaults.status +'" data-id="'+ defaults.id +'"  data-desc="" data-custom="1" data-required="false" data-type="' + typeOfField +'" data-order="' + defaults.index +'">' +
            '<label>' + defaults.key + '</label>' + 
            '<div>' +
            '<input type="text" value="'+today +'" disabled=true>' + 
            '</div>'+
            '</li>');

        var checkbox      = $('<li class="quarter" data-status="'+ defaults.status +'" data-id="'+ defaults.id +'"  data-desc="" data-custom="1" data-required="false" data-type="' + typeOfField +'" data-order="' + defaults.index  +'">' +
            '<label>' + defaults.key  + '</label>' + 
            '<div>' +
            '<input type="checkbox" disabled=true>' + 
            '</div>'+
            '</li>');


    	switch(typeOfField) {
    		case 'text': 
    		objectOfDraggedElement.replaceWith(text);
            return text;
    		break;

    		case 'input-number': 
    		objectOfDraggedElement.replaceWith(inputNumber);
            return inputNumber;
    		break;

    		case 'input-decimal':
    		objectOfDraggedElement.replaceWith(inputDecimal);
            return inputDecimal;
    		break;

    		case 'textarea':
    		objectOfDraggedElement.replaceWith(textarea);
            return textarea;
    		break;

    		case 'dropdown': 
    		objectOfDraggedElement.replaceWith(dropdown);
            return dropdown;
    		break;

    		case 'datepicker':
    		objectOfDraggedElement.replaceWith(datepicker);
            return datepicker
    		break;

    		case 'checkbox':
    		objectOfDraggedElement.replaceWith(checkbox);
            return checkbox;
    		break;	
    	}
    	
    }
     // Call edit function for clicked element
     $(".sortable").on('click', 'li', function(event) {

        var clickedElement;

         // If click is on li element then you don't have parents('li')
         if($(event.target).parents('li').length === 0) {
            clickedElement = $(event.target);
         } else {
            clickedElement = $(event.target).parents('li');
         }
         getDataAttrs(clickedElement);

     });

     // Get data attrs needed for edit function
     function getDataAttrs(clickedElement) {
        // @param obj {object} - object of data attrs of li element
        var obj = {
            id:        '' + clickedElement.data('id') + '',
            type:      '' + clickedElement.data('type') + '',
            custom:    '' + clickedElement.data('custom')  + '',
            required:  '' + clickedElement.data('required') + '',
            order:     '' + clickedElement.data('order') + '',
            desc:      '' + clickedElement.data('desc') + ''
        };
        editField(clickedElement, obj);
     }

     // Edid field function 
     function editField(clickedElement, obj) {

        // Show edit field
        edit.empty();
    
        // Generate form based on field type
        switch(clickedElement.data('type')) {
            case 'text': 
            editTextType($(clickedElement));
            break;

            case 'datepicker':
            editTextType($(clickedElement));
            break;

            case 'input-number':
            editTextType($(clickedElement));
            break;

            case 'input-decimal':
            editTextType($(clickedElement));
            break;
            
            case 'textarea': 
            editTextArea($(clickedElement));
            break;

            case 'dropdown':
            editDropdown($(clickedElement));




        }

     }

     // Render form for text type
     function editTextType(clickedElement) {
        
        var isCustom       = clickedElement.data('custom');
        var description    = clickedElement.data('desc');
        var labelVal       = clickedElement.find('label').text();
        

        if(isCustom !== 0) {
            edit.append('<div id="edit-zone" >' +                           
            '<h3> Field Properties </h3>' + 
            '<h3> Behavior '+
            '<input type="checkbox" value="false">Required when submiting form </h3>'+
            '<h3> Field label </h3>'+ 
            '<input type="text" value="' + labelVal + '"> <br>'+
            '<h3> Description </h3>'+
            '<input class="desc" type="text" value="' + description + '"> <br>'+
            '<h3> Field Size </h3>'+
            '<select class="select-size">'+
            '<option value="quarter">--chose-- </option>'+
            '<option value="quarter"> 25% </option>'+
            '<option value="half"> 50%  </option>'+
            '<option value="third"> 75%  </option>'+
            '<option value="full"> 100%  </option>'+
            '</select>'+
            '</div>');
        } 

        // If data-required is true check the chekbox
        if(clickedElement.data('required') === true) {
            $('#edit-zone input[type=checkbox]').attr('checked', true);
        }

        // Change label text of current element
        $('#edit-zone input[type=text]').on('input', function() {
             var input = $('#edit-zone input[type=text]').val(); 
             if( input.length === 0 ) {
                input = 'Untitled';
             }
            
             clickedElement.find('label').html(input);
        });

        // Change data-required on current element
        $('#edit-zone input[type=checkbox]').change(function() {

             var checkbox = $('#edit-zone input[type=checkbox]').is(':checked');
             clickedElement.attr('data-required', checkbox);
        });

        // Change data-desc attr
        $('.desc').on('input', function() {
             var desc = $('.desc').val(); 
             clickedElement.attr('data-desc', desc);
        });
         
        //  Change size
        $('#edit-zone .select-size').change( function() {
            var selectedClass = $(this).val();
            clickedElement.removeClass('half quarter full third');
            $(clickedElement).addClass(''+ selectedClass +'');
        });

    

     }


     // Edit textarea field
     function editTextArea(clickedElement){
        var isCustom       = clickedElement.data('custom');
        var description    = clickedElement.data('desc');
        var labelVal       = clickedElement.find('label').text();

        

        if(isCustom !== 0) {
            edit.append('<div id="edit-zone" >' +                           
            '<h3> Field Properties </h3>' + 
            '<h3> Behavior '+
            '<input type="checkbox" value="false">Required when submiting form </h3>'+
            '<h3> Field label </h3>'+ 
            '<input type="text" value="' + labelVal + '"> <br>'+
            '<h3> Description </h3>'+
            '<input class="desc" type="text" value="' + description + '"> <br>'+
            '<h3> Field Size </h3>'+
            '<select class="select-size">'+
            '<option value="quarter">--chose-- </option>'+
            '<option value="quarter"> 25% </option>'+
            '<option value="half"> 50%  </option>'+
            '<option value="third"> 75%  </option>'+
            '<option value="full"> 100%  </option>'+
            '</select>'+
            '<h3> Heigth of element  </h3>'+
            '<input class="size" min="10" max="300" type="number">'+
            '</div>');
        } 

        // If data-required is true check the chekbox
        if(clickedElement.data('required') === true) {
            $('#edit-zone input[type=checkbox]').attr('checked', true);
        }

        // Change label text of current element
        $('#edit-zone input[type=text]').on('input', function() {
             var input = $('#edit-zone input[type=text]').val(); 
             if( input.length === 0 ) {
                input = 'Untitled';
             }
            
             clickedElement.find('label').html(input);
        });

        // Change data-required on current element
        $('#edit-zone input[type=checkbox]').change(function() {

             var checkbox = $('#edit-zone input[type=checkbox]').is(':checked');
             clickedElement.attr('data-required', checkbox);
        });

        // Change data-desc attr
        $('.desc').on('input', function() {
             var desc = $('.desc').val(); 
             clickedElement.attr('data-desc', desc);
        });
         
        //  
        $('#edit-zone .select-size').change( function() {
            var selectedClass = $(this).val();
            clickedElement.removeClass('half quarter full third');
            $(clickedElement).addClass(''+ selectedClass +'');
        });

        // Get and size of textarea
         $('.size').on('input', function() {
             var textAreaSize = $('.size').val() +'px';
             clickedElement.find('textarea').css('height', textAreaSize + '');
             
        });

     }

     function editDropdown(clickedElement) {

        var isCustom       = clickedElement.data('custom');
        var description    = clickedElement.data('desc');
        var labelVal       = clickedElement.find('label').text();
        

        if(isCustom !== 0) {
            edit.append('<div id="edit-zone" >' +                           
            '<h3> Field Properties </h3>' + 
            '<h3> Behavior '+
            '<input type="checkbox" value="false">Required when submiting form </h3>'+
            '<h3> Field label </h3>'+ 
            '<input type="text" value="' + labelVal + '"> <br>'+
            '<h3> Description </h3>'+
            '<input class="desc" type="text" value="' + description + '"> <br>'+
            '<h3> Field Size </h3>'+
            '<select class="select-size">'+
            '<option value="quarter">--chose-- </option>'+
            '<option value="quarter"> 25% </option>'+
            '<option value="half"> 50%  </option>'+
            '<option value="third"> 75%  </option>'+
            '<option value="full"> 100%  </option>'+
            '</select>'+
            '<h3> Dropdown Choices </h3>'+
            '<p class="add"> Add  </p>'+
            '<div class="choice">'+
            '</div>'+
            '</div>');
        } 

        // If data-required is true check the chekbox
        if(clickedElement.data('required') === true) {
            $('#edit-zone input[type=checkbox]').attr('checked', true);
        }

        // Change label text of current element
        $('#edit-zone input[type=text]').on('input', function() {
             var input = $('#edit-zone input[type=text]').val(); 
             if( input.length === 0 ) {
                input = 'Untitled';
             }
            
             clickedElement.find('label').html(input);
        });

        // Change data-required on current element
        $('#edit-zone input[type=checkbox]').change(function() {

             var checkbox = $('#edit-zone input[type=checkbox]').is(':checked');
             clickedElement.attr('data-required', checkbox);
        });

        // Change data-desc attr
        $('.desc').on('input', function() {
             var desc = $('.desc').val(); 
             clickedElement.attr('data-desc', desc);
        });
         
        //  Change size
        $('#edit-zone .select-size').change( function() {
            var selectedClass = $(this).val();
            clickedElement.removeClass('half quarter full third');
            $(clickedElement).addClass(''+ selectedClass +'');
        });
        // Add new choice
        $('.add').on('click', function(){
            var choice = $('.choice').empty();
            choice.append('<span> Delete <span><input type="text"> <p class="add"> Add  </p>');

        });

     }

      

});