function(doc, req) {
	
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
	
	if (doc && doc.getId && doc.type=="hosthander") {
		getId = eval(doc.getId);
	}
	else {
		getId = function(doc, req){
			// some default way to create an _id
			//TODO - use checksum hash and sort the params
			var shortio = function(){
				function generateSecret(length){
					var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
					var secret = '';
					for (var i = 0; i < length; i++) {
						secret += tab.charAt(Math.floor(Math.random() * tab.length));
					}
					return secret;
				}
				return generateSecret(6);
			}
			return "gen_" + shortio();
		}
	}
	
	//convert the "search" string to an object
	submitData = req.form;
	paramString = unescape(submitData.search);
	//cut off possible leading '?' and tailing anchors '#'
	if (paramString.indexOf('?') >-1) {
		paramString = paramString.substring(paramString.indexOf('?')+1);
	}
	if (paramString.indexOf('#') > -1) {
		paramString = paramString.substring(0, paramString.indexOf('#'));
	}
	var paramArr = paramString.split(/&/);
	paramObj = new Array();
	for (i=0; i<paramArr.length; i++) {
		keyValue = paramArr[i].split("=");
		paramObj[keyValue[0]] = keyValue[1];
	}
	//sort search params and put it back to the submit object
	submitData.search = sortObject(paramObj);
    
	nDoc = {};
	nDoc._id=getId(doc, submitData);	
	nDoc.createData=submitData;
	nDoc.createdAt = new Date();
	//nDoc.user = req.userCtx;
	nDoc.theReq = req; //debug info
    return [nDoc, "{\"status\": \"success\", \"msg\": \"\"}"];
}