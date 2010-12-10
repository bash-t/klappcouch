(
function(){
	var c_iframe='comp_bookmarklet_iframe';
	var calcstring=escape('hostname='+document.location.hostname+'&port='+document.location.port+'&pathname='+document.location.pathname+'&search='+escape(document.location.search)+'&title='+document.title);
	var iframe_url="http://127.0.0.1:5984/test1/_design/test1/bookmarklet_form.html?"+calcstring;
	var existing_iframe=document.getElementById(c_iframe);
	if(existing_iframe){
		if(calcstring!=""){
		  var iframe=existing_iframe;	
		  iframe.src=iframe_url;
		}
	}
	else{
		var iframe=document.createElement('IFRAME');
		iframe.name=c_iframe;
		iframe.id=c_iframe;
		iframe.src=iframe_url;
		iframe.width=300;
		iframe.height=70;
		iframe.style.border='0';
	}
	document.body.insertBefore(iframe, document.body.firstChild);
	$(iframe).ready(function() {
		setTimeout(function(){$(iframe).remove();},10000);
	});
})()