function(doc, req) { 
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
		doc._id = shortened;
		doc.url = req.form.url;
		doc.description = req.form.description;
		doc.submitter = req.form.submitter;
		
		return [doc, "Bookmark added"];
	}
	else {
		//todo: falls doc schon vorhanden: submitter adden//req.userCtx;
		return [doc, "Bookmark already exists"]; 
	}
 }