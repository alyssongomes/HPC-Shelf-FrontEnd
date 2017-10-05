function getUserLogged(callback){
	$.get("/getUserLogged",function(data) {
		data = JSON.parse(data);
		callback(data);
	});
}