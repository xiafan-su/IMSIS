$(document).ready(function(){

	$.ajax({
		
	});
	
	$('#news-id').click(function(){
		hide();
		$('#news-panel').show();
	});
	$('#field-id').click(function(){
		hide();
		$('#field-panel').show();
	});
	$('#service-id').click(function(){
		hide();
		$('#service-panel').show();
	});
	$('#share-id').click(function(){
		hide();
		$('#share-panel').show();
	});
	$('#member-id').click(function(){
		hide();
		$('#member-panel').show();
	});
	$('#bried-id').click(function(){
		hide();
		$('#brief-panel').show();
	});
	hide();
	$('#brief-panel').show();
});

function hide(){
	$('#news-panel').hide();
	$('#field-panel').hide();
	$('#service-panel').hide();
	$('#member-panel').hide();
	$('#share-panel').hide();
	$('#brief-panel').hide();
}