    
function FancyWebSocket_load_bind_(){
 HC_WS.after_connect=_after_connect;
 HC_WS.after_disconnect=_after_disconnect;
 HC_WS.run('wss://buldakoff.com/_ws_/');
 }

//###############################################################################		


//###############################################################################

$.getScript('//buldakoff.com/js/websocket.js?v=12', function()
		{
		FancyWebSocket_load_bind_();
		    // script is now loaded and executed.
		    // put your dependent JS here.
		});


