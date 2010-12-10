function(doc, req) { 
	var base64 = require('lib/commonjs/base64');
	if (!doc) {
		var doc = {};
		var shortio = function() {
			function generateSecret(length) {
					var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
					var secret = '';
					for (var i=0; i<length; i++) {
						secret += tab.charAt(Math.floor(Math.random() * tab.length));
					}
			return secret;
			}
		return generateSecret(4);
		}

		var shortened = shortio();

		//convert the "search" string to an object
		submitData = req.form;
		paramString = base64.decode(submitData.search);
		//cut off possible leading '?' and tailing anchors '#'
		if (paramString.indexOf('?') >-1) {
			paramString = paramString.substring(paramString.indexOf('?')+1);
		}
		if (paramString.indexOf('#') >-1) {
			paramString = paramString.substring(0, paramString.indexOf('#'));
		}
		var paramArr = paramString.split(/&/);
		paramObj = {};
		for (i=0; i<paramArr.length; i++) {
			keyValue = paramArr[i].split("=");
			paramObj[keyValue[0]] = keyValue[1];
		}
		submitData.search = paramObj;
		
		doc._id = shortened;
		doc.created_at = new Date();
		doc.createData=submitData;
		doc.theReq = req;
		
		return [doc, "{\"status\": \"success\", \"msg\": \"\"}"];
	}
	else {
		//todo: falls doc schon vorhanden: submitter adden//req.userCtx;
		return [doc, "{\"status\": \"failure\", \"msg\": \"bookmark already exists\"}"]; 
	}
 }