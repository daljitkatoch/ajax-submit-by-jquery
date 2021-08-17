jQuery("#submitBtn").submit(function(e) {

	e.preventDefault();
	
	jQuery("input,select,textarea").css('border','1px solid black');
	jQuery('.mes').remove();
    	var url = jQuery(this).attr('action');
	var formData = new FormData(jQuery(this)[0]);

    	jQuery.ajax({
		
		type: "POST",
		url: url,
		data:  formData, 
		processData: false,
		dataType:'json',
		contentType: false,
		success: function(data)
		{

			if(data.status== false){
				
				jQuery('#message').html(data.message);    
				var a= data['errors'];     
			   jQuery.each(data.errors, function(key, value){           
					jQuery("input[name='"+key+"'],select[name='"+key+"'],textarea[name='"+key+"']").css('border','1px solid red'); 
					jQuery("input[name='"+key+"'],select[name='"+key+"'],textarea[name='"+key+"']").after("<small class='mes'>"+value+"</small>");
			   });
			}
			
			if(data.status==true){

				jQuery("input[type=text],select,textarea").css('border','1px solid #1abb9c').delay( 2000 ).css('border','1px solid #e2e2e4');
				jQuery("input[type=text],select,textarea").val('');				
				jQuery('#message').html(data.message);  
				jQuery("#message").fadeIn(100);
				jQuery("html, body").animate({
					scrollTop: jQuery("#message").offset().top-100
				}, 1000);
				jQuery("#message").delay(3000);
				jQuery("#message").fadeOut(100);
				
			}             
		}
    });
});
