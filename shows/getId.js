function(doc, req) {
	//private function sortObject
	sortObject = function (arr){
		// Setup Arrays
		var sortedKeys = new Array();
		var sortedObj = {};
	
		// Separate keys and sort them
		for (var i in arr){
			sortedKeys.push(i);
		}
		sortedKeys.sort();
	
		// Reconstruct sorted obj based on keys
		for (var i in sortedKeys){
			sortedObj[sortedKeys[i]] = arr[sortedKeys[i]];
		}
		return sortedObj;
	}
	//private function to generate a hash
	function fnv1a(x) {
		var hash = 0x811c9dc5;
		x = x.toString();
		for (var i = x.length - 1; i >= 0; i--) {
		hash = ((hash ^ x.charCodeAt(i)) * 0x01000193) >>> 0;
		}
		return hash;
	} 
	
	
	//start  
	//doc==hostdoc

	
	//do some stuff to the param string (if there is some)
	uri = unescape(req.query.search);
	paramString = unescape(uri);
	//cut off possible leading '?'
	if (paramString.indexOf('?') >-1) {
		paramString = paramString.substring(paramString.indexOf('?')+1);
	}
	var paramArr = paramString.split(/&/);
	paramObj = new Array();
	for (i=0; i<paramArr.length; i++) {
		keyValue = paramArr[i].split("=");
		paramObj[keyValue[0]] = keyValue[1];
	}
	//sort search params and put it back to the query object
	req.query.search = sortObject(paramObj);
	
	if(doc !== null && doc.getId !== null) {
		//get the function to determine the id from the hostdoc
		getId = eval(doc.getId);
		//if id could be generated, since there is a matching key in the param string
		if((getId(doc, req.query)).indexOf("undefined") == -1) {
			//return the id specified via the getId function
			return getId(doc, req.query);
		}
		else {
			//return a generated id of the uri
			return doc.prefix + "gen_" + fnv1a(JSON.stringify(req.query)).toString(16);
		}
		
	}
	else {
		//return a generated id of the uri
		return "gen_" + fnv1a(JSON.stringify(req.query)).toString(16);
		//return JSON.stringify(req);
	}
}