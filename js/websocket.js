
//###############################################################################
//#######################    WebSocket           ################################
//###############################################################################
var HC_WS = new function() 
{
  this.FancyWebSocketServer = true;
  this.reconec_c=0;
  this.reconecttimeout;

  this.msg = new Object();
  this.pingtimeout;
  this.reconec=true;
  this.users=new Array();
  this.server_datetime;
  this.callback_list=new Array();
  
  this.after_connect=false;
  this.after_disconnect=false;
  this.system_callback=false;

  
  this.run = function(url){
		this.log('Connecting...');
		this.FancyWebSocketServer = new FancyWebSocket(url);
		//Let the user know we're connected
		this.FancyWebSocketServer.bind('open', function() {
			clearTimeout(HC_WS.reconecttimeout);HC_WS.reconec_c=0;
			HC_WS.log( "Connected" );
			if(typeof HC_WS.after_connect=== "function"){HC_WS.after_connect();}
			$('#channel_list').click();
		});
		//OH NOES! Disconnection occurred.
		this.FancyWebSocketServer.bind('close', function( data ) {
			clearTimeout(HC_WS.pingtimeout);
			delta=HC_WS.getRandomArbitary(3000, 8000)+900;
			console.log(delta);
			if(HC_WS.reconec)HC_WS.reconecttimeout=setTimeout(HC_WS.reconect, delta);
			if(typeof HC_WS.after_disconnect=== "function"){HC_WS.after_disconnect();}
			HC_WS.log( "Disconnected." );
		});
		//Log any messages sent from server
		this.FancyWebSocketServer.bind('message', function( payload ) {
			var data= JSON.parse(payload);
			HC_WS.parser(data);
		});

		this.FancyWebSocketServer.connect();
	  
	};
  

  this.send = function(data){
		data=JSON.stringify(data);
		this.FancyWebSocketServer.send( 'message', data );
	};
	this.reconect = function(){
		HC_WS.reconec_c++;
		//HC_WS.log(HC_WS.reconec_c);
		if(HC_WS.reconec_c<10){HC_WS.FancyWebSocketServer.connect();}
		else{HC_WS.reconec=false;	}
	}
	this.conect = function(){
		HC_WS.reconec=true;
		HC_WS.FancyWebSocketServer.connect();
	}
	this.disconect = function(){
		HC_WS.reconec=false;
		HC_WS.FancyWebSocketServer.disconnect();
	}

	this.parser = function(msg_)	
	{
		if(typeof this.callback_list[msg_.type] === "function"){this.callback_list[msg_.type](msg_);}
		else if(typeof this.system_callback === "function"){this.system_callback(msg_);}
		return false;
	};

	//###############################################################################################
	this.prolongate_channel=function(data,callback) 
	{
		this.msg['type']='prolongate_channel';
		this.msg['data']=data;
		this.callback_list[this.msg['type']]=callback;
		this.send(this.msg);		
	}
	this.remove_channel=function(data,callback) 
	{
		this.msg['type']='remove_channel';
		this.msg['data']=data;
		this.callback_list[this.msg['type']]=callback;
		this.send(this.msg);		
	}
	this.create_channel=function(data,callback) 
	{
		this.msg['type']='create_channel';
		this.msg['data']=data;
		this.callback_list[this.msg['type']]=callback;
		this.send(this.msg);		
	}
	this.create_private_channel=function(nickname,callback) 
	{
		this.msg['type']='create_channel';
		this.msg['data']=nickname;
		this.msg['key']=ws_key;
		this.msg['type_']='988';
		this.callback_list[988]=callback;
		this.send(this.msg);
	}
	this.channel_list=function(callback) 
	{
		this.msg['type']='channel_list';
		this.callback_list[this.msg['type']]=callback;
		this.send(this.msg);		
	}
	this.follow_channel=function(id,callback,onmessage)
	{
		this.msg['type']='follow_channel';
		this.msg['id']=id;
		this.callback_list['channel_'+id]=callback;
		this.callback_list['message_to_'+id]=onmessage;
		this.send(this.msg);		
	}
	this.unfollow_channel=function(id,callback)
	{
		this.msg['type']='unfollow_channel';
		this.msg['id']=id;
		this.callback_list['channel_'+id]=callback;
		this.send(this.msg);		
	}
	this.send_message_to=function(id,text,callback)
	{
		this.msg['type']='send_message_to';
		this.msg['msg']=text;
		this.msg['id']=id;
		this.callback_list['message_to_'+id]=callback;
		this.send(this.msg);		
	}
	//###############################################################################################
	this.log = function(msg) 
	{
	var i=0;
		$('#syslog .log_i').each(function()
			{
				i++;
			 if(i>22)$(this).remove();
			});
		$('#syslog').prepend('<div class="log_i">'+msg+'</div>');
		console.log(msg);
	}
	this.getRandomArbitary=function (min, max)
	{
	  return parseInt(Math.random() * (max - min) + min);
	}
	

};

//###############################################################################

var FancyWebSocket = function(url)
{
	var callbacks = {};
	var ws_url = url;
	var conn;
	var status=false;

	this.bind = function(event_name, callback){
		callbacks[event_name] = callbacks[event_name] || [];
		callbacks[event_name].push(callback);
		return this;// chainable
	};

	
	this.send = function(event_name, event_data){
		this.conn.send( event_data );
		return this;
	};

	this.connect = function() {
		if(typeof(MozWebSocket)=='function' ){this.conn = new MozWebSocket(url);}
		else{this.conn = new WebSocket(url);}
		this.status=true;

		// dispatch to the right handlers
		this.conn.onmessage = function(evt){
			dispatch('message', evt.data);
		};

		this.conn.onclose = function(){dispatch('close',null)}
		this.conn.onopen = function(){dispatch('open',null)}

	};

	this.disconnect = function() {
		this.conn.close();
		this.status=false;
	};

	var dispatch = function(event_name, message){
		var chain = callbacks[event_name];
		if(typeof chain == 'undefined') return; // no callbacks for this event
		for(var i = 0; i < chain.length; i++){
			chain[i]( message )
		}
	}
};