//openweather account: awalter, password0

window.onload = function() {
	var request = new XMLHttpRequest();
	//will hold temperature value once it's retrieved
	var temp = 0;
	//var sunriseTime = 0;
	//var sunsetTime = 0;

	var date = new Date();
	var currentHour = date.getHours();
	var currentMin = date.getMinutes();
	//my hack-assed way of fixing hour/minute display
	if (currentMin < 10)
	{
		currentMin = "0" + currentMin;
	}
	if (currentHour > 12)
	{
		currentHour -= 12;
		currentMin = currentMin + " PM";
	}
	else
	{
		currentMin = currentMin + " AM";
	}
	
	request.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=16625,us&&units=imperial&appid=f6a43ecdd1319a9ef268cc366261662e", true);
	
	var tempCheck = function() {
		var colorIndicate = "black";
		//alert(temp);
		
		if (temp <= 33)
		{
			colorIndicate = "blue";
		}
		else if (temp <= 50) 
		{
			colorIndicate = "purple";
		}
		else if (temp <= 70)
		{
			colorIndicate = "green";
		}
		else if (temp <= 85) 
		{
			colorIndicate = "orange";
		}
		else
		{
			colorIndicate = "red";
		}
		document.getElementById("color").style.backgroundColor = colorIndicate;
	}
	
	//function converts UNIX time
	/*var time = function(var unixTime) {
		var date = new Date(unixTime*1000);
		// Hours part from the timestamp
		var hours = date.getHours();
		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();
		// Will display time in 10:30:23 format
		if (hours > 11) {
			var formattedTime = hours + '' + minutes.substr(-2);
		}
		else {
			var formattedTime = hours + ':' + minutes.substr(-2);
		}			
		
		var hours24 = parseInt(formattedTime.substring(0,2));
		var hour = ((hours24 + 11) % 12) + 1;
		var amPm = hours24 > 11 ? 'pm' : 'am';
		var minute = formattedTime.substring(2);
		return hour + ':' + minute + amPm;
	}*/
	
	request.onload = function() {
		var responseJSONData = JSON.parse(request.responseText);
		temp = responseJSONData.main.temp;
		
		document.getElementById("city").innerHTML = "<p class='data'>" + responseJSONData.name + "</p>";
		document.getElementById("time").innerHTML = "<p class='data'>" + currentHour + ":" + currentMin + "</p>";
		document.getElementById("temp").innerHTML = "<p class='data'>" + temp + "&deg;F" + "</p>";
		document.getElementById("descrip").innerHTML = "<p class='data'>" +  responseJSONData.weather[0].description + " outside</p>";
		document.getElementById("sun").innerHTML = "<p class='data'>" + "Sunrise: " + responseJSONData.sys.sunrise + "\nSunset: " + responseJSONData.sys.sunset + "</p>";
		document.getElementById("iconImage").src = "http://www.openweathermap.org/img/w/" + responseJSONData.weather[0].icon + ".png";
		
		//checking temp to set indicator color
		tempCheck();
		
	}
	
	request.onerror = function () {
		console.log("Connection Error");
	}
	
	request.send();

}