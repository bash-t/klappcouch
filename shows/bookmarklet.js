function(doc, req) {
	var ddoc = this;
	var path = require("vendor/couchapp/lib/path").init(req);
	var mustache = require("lib/mustache-s");
	
	var data = {};
	data.header = {
	title: 'Bookmarklet'
	//cssdir: path.asset('style')
	}; // for partials
	data.footer = {};
	data.pageTitle = 'Bookmarklet install';
	data.url = path.absolute('/'+req.info.db_name+'/'+ddoc._id+'/');
	//data.cssdir = path.asset('style');*/
	return mustache.to_html(ddoc.templates.bmlet, data, ddoc.templates.partials);
	
	
	/*the original bookmarklet:
	javascript:
	(function(){
		jq=document.createElement('SCRIPT');
		jq.type='text/javascript';
		jq.src='{{url}}jquery.js';
		document.getElementsByTagName('head')[0].appendChild(jq);
	)()
	
	(function(){
		var c_iframe='comp_bookmarklet_iframe';
		var calcstring=escape('hostname='+document.location.hostname+'&port='+document.location.port+'&pathname='+document.location.pathname+'&search='+escape(document.location.search)+'&title='+document.title);
		var iframe_url='{{url}}?'+calcstring;
		var existing_iframe=document.getElementById(c_iframe);
		if(existing_iframe){
			if(calcstring!=''){
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
		document.body.insertBefore(iframe,document.body.firstChild);
		$(iframe).ready(function() {
			setTimeout(function(){$(iframe).remove();},10000);
		});
	})()
	*/
}