(function(){
	// An alternative to usind d3 would be to convert our csv to json and use jQuery's $.getJSON function.
	d3.csv('data/DOITT_SUBWAY_ENTRANCE_01_13SEPT2010.csv', function(error, subwayStations){
		// console.log(error, subwayData);
		subwayStations.forEach(function(subwayStation){
			var delimiter = '(';
			var subway_station_name_parts = subwayStation.name.split(delimiter);
			var subway_direction = subway_station_name_parts[1];

			if (subway_direction){
				subway_direction = subway_direction.replace(/\)/g, '');
				subwayStation.direction = subway_direction;
			}
			//replace the name with the name minus the direction

			subwayStation.name=subway_station_name_parts[0].trim();

			//make a new column that is our line column but as an array of lines
			subwayStation.lineList=subwayStation.line.split('-');
			
		});
		//The above was my loop that cleans the data
	

	$(".buttons").on("click",function(){

		$('#canvas').html('');

		var selected = $(this).attr("id");

		var filtered_line = subwayStations.filter(function(subwayStation){
			return (_.contains(subwayStation.lineList, selected))
		});


		filtered_line.forEach(function(subwayStation){
			$('#canvas').append('<div>' + subwayStation.name  
				+ '</div>' + subwayStation.lineList.join(' - ') + '</div>' + '</br>');
			});

		});
	});

}).call(this);
