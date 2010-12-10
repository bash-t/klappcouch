function(doc, req) {
	var type = "dl";
		if(req && req.id && req.id.substring(0,3) == "gen") {
			type = "bookmark"
		}
	
	if (doc) {
		//update user
		var status = "";
		if(doc.submitter && doc.submitter[req.userCtx.name]) {
			status = "alreadySubscribed";
		}
		else {
			status = "subscribed";
			doc.submitter[req.userCtx.name] = {};
			doc.submitter[req.userCtx.name].name = req.userCtx.name;
			doc.submitter[req.userCtx.name].subscribeDate = new Date();
		}
		return [doc, "{\"status\": \"" + status + "\", \"type\": \"" + type + "\", \"title\": \"" + req.form.title + "\", \"submitter\": \"" + req.userCtx.name +"\"}"];
	}
	else {
		//create new doc
		
		submitData = req.form;
		//unescape/parse the search string back to a json object
		submitData.search = JSON.parse(unescape(submitData.search));
		
		//set up the bookmark structure
		var bookmark = {};
		bookmark.title = submitData.title
		bookmark.weburi = submitData;
		delete bookmark.weburi.title;
		
		//set up the submitter structure
		var submitter = {};
		submitter[req.userCtx.name] = {};
		submitter[req.userCtx.name].name = req.userCtx.name;
		submitter[req.userCtx.name].subscribeDate = new Date();
		
		nDoc = {};
		nDoc._id = req.id;
		nDoc.bookmark = bookmark;
		nDoc.createdAt = new Date();
		nDoc.submitter = submitter;
		//nDoc.theReq = req; //debug info
    	return [nDoc, "{\"status\": \"new\", \"type\": \"" + type + "\", \"title\": \"" + bookmark.title + "\", \"submitter\": \"" + req.userCtx.name +"\"}"];
	}
}