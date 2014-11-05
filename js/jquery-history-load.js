//jquery load and jquery.history.js practice
//this requires history.js https://github.com/browserstate/history.js/
var History;

if (history.pushState) {
	History = window.History;

	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState();
        console.log(State);
        $(document).find('a[href$="' + State.url + '"]').trigger("click");
    });

	$(document).on('click','.nav-link',function(e){
		e.preventDefault();
		var ajax_link = $(this);

		History.pushState('','', ajax_link.attr('href'));

		$('#ajax-container').load(ajax_link.attr('href') + ' #main-content', function() {	
			var title = ajax_link.attr("data-title");
			window.document.title = title;
		});
	});
}

//jquery AJAX practice
$(document).on('click','#get-content',function(e){
	e.preventDefault();
	link = $(this);
	$.ajax({
		url: link.attr('href'),
		success:function(returnedData){
		//use parseHTML and filter to retrieve a div from returned HTML content
		History.pushState('','', link.attr('href'));
	   	var success =  $($.parseHTML(returnedData)).filter("#first-content"); 
			$("#dynamic-content").hide(function(){
		   		$("#dynamic-content").html(success).fadeIn(500);
			});
	   },error:function(){
	      alert("error");
	   }
	});
});
