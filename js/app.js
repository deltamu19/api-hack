
$(document).ready(function(){

	$('#search-term').submit(function(e) {
		e.preventDefault();
		var input = $('#input').val();
		getRequest(input);
		document.getElementById('search-term').reset();
	});

});

var getRequest = function(query) {
	var timestamp = new Date().getTime();
	var privatekey = '01d950df46aec69f91751240a20e16ee3263e23b';
	var publickey = '8c6cedb7a4672c9ba429030f7378775c';
	var md5 = $.md5(timestamp + privatekey + publickey);

	$.ajax({
		url:'http://gateway.marvel.com:80/v1/public/characters?name=' + query + '&limit=1&apikey=' + publickey + '&hash=' + md5 + '&ts=' + timestamp,
		dataType: 'json',
		type: 'GET'
	})

	.done(function(result){
		var character = result.data.results[0].id;

		$.ajax({
			url:'http://gateway.marvel.com:80/v1/public/events?characters=' + character + '&limit=100&apikey=' + publickey + '&hash=' + md5 + '&ts=' + timestamp,
			dataType: 'json',
			type: 'GET'
		})

		.done(function(result){
			var src = "";
			var eventName = "";
			var description = "";
			var listObjects = result.data.results;
			$.each(listObjects, function(index, value) {
				
				src += '<a target="_blank" href="' + value.urls[0].url + '"><img class="thumbnail" src="' + value.thumbnail.path + '.' + value.thumbnail.extension + '"></a>';
				eventName += value.title;
				description += value.description;
			});

			$('#events').html(src);
			
			/*
			var pixClick = function($(this).click()) {
				$('#summary').show();
				$('.event-name').text(eventName);
				$('.description').text(description);
			};
			*/
		});
	});
};



/*
value.urls[0].url
*/
