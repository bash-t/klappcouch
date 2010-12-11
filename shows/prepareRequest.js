/**
 * This show function enriches the request by adding the determined doc.id or the generated doc.id.
 * It also parses the req.query.title if there is a parsing rule in the host document.
*/
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
		//prepare the title, if there is a regexp in the host document
		if (req.query.title) {
			req.query.title = req.query.title.replace(new RegExp(doc.titleRegEx, doc.titleRegExGlobal), doc.titleReplace);
		}
		//get the function to determine the id from the hostdoc
		getId = eval(doc.getId);
		//if id could be generated, since there is a matching key in the param string
		if((getId(doc, req.query)).indexOf("undefined") == -1) {
			//return the id specified via the getId function
			req.query.id = getId(doc, req.query);
		}
		else {
			//return a generated id of the uri
			req.query.id = doc.prefix + "gen_" + fnv1a(JSON.stringify(req.query)).toString(16);
		}
	}
	else {
		//return a generated id of the uri
		req.query.id = "gen_" + fnv1a(JSON.stringify(req.query)).toString(16);
	}
	
	//stringify/escape the searchObject, since nested objects cannot be sent by post requests later on
	req.query.search = escape(JSON.stringify(req.query.search));
	return JSON.stringify(req.query);
}