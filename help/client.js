$.getScript('//buldakoff.com/js/ws.js',function(){append_iframe();FancyWebSocket_load_bind_();});
    
function FancyWebSocket_load_bind_(){
 HC_WS.after_connect=_after_connect;
 HC_WS.after_disconnect=_after_disconnect;
 HC_WS.system_callback=_system_callback;
 HC_WS.run('wss://buldakoff.com/_ws_/');

 }

//###############################################################################
function beta_open_chat(){
	console.log($('#hc_help_ws_username').val());
	if($('#hc_help_ws_username').val()=='')
		{
		$('#hc_help_ws_username').focus();
		}
	else
		{
		$('#ws_chat_text').show();
		$('#beta_help_chat_').prepend('<div id="mm_block" style="overflow-y: auto; width: 100%; height: 180px; padding: 10px 4px 4px 12px; "></div>');
		if($('#chatAudio').length==0){$('<audio id="chatAudio"><source src="//buldakoff.com/help/1.ogg" type="audio/ogg"><source src="//buldakoff.com/help/1.mp3" type="audio/mpeg"></audio>').appendTo('body');}
		$('.button').hide();
		$('.send_msg').show();
		$('#ws_chat_text').keydown(function (e) {  if (e.ctrlKey && e.keyCode == 13) {
				beta_help_send_message();
			  }});
		var nickname=$('#hc_help_ws_username').val();
		HC_WS.create_private_channel(nickname,beta_help_chat_open);
		}
}
function beta_help_chat_open(data){
	HC_WS.id_channel=data.id;
	HC_WS.follow_channel(data.id,follow_channel_,onmessage_);
}
function beta_help_send_message(){if($('#ws_chat_text').val()!=''){HC_WS.send_message_to(HC_WS.id_channel,$('#ws_chat_text').val(),onmessage_);$('#ws_chat_text').val('');}}
function _after_connect()
	{
	append_ws_link();
	//var t=$('#beta_help_chat_'); t.css('width','380px');t.css('height','220px');$('#hc_help_ws_username').val('test_1');beta_open_chat();
	}
function _after_disconnect(){append_iframe();}

//###############################################################################		
function onmessage_(data){
	if(data.status=='online_offline')
		{
		//if(data.msg=='online'){append_ws_link();}
		//else if(data.msg=='offline'){append_iframe();}
		}
	if(data.status=='ok')
	{
	$('#beta_help_chat_ #mm_block').prepend('<div style="clear: both;"></div>');
	if(data.autor==1){$('#beta_help_chat_ #mm_block').prepend('<div style="text-align: right;background: #f1fcd4; border: 1px solid #97c226; margin: 2px 0px 2px 40px; float: right; border-radius: 6px; padding: 2px 6px;  ">'+data.msg+'</div>');	}
	else{$('#chatAudio')[0].volume=.5;$('#chatAudio')[0].play();$('#beta_help_chat_ #mm_block').prepend('<div style=" padding: 4px; border-radius: 6px; background: #f8f8f8;margin: 2px 40px 2px 0px; float: left;">'+data.msg+'</div>');}
	}
console.log(data);
}
function follow_channel_(data){
//console.log(data);
}
function _system_callback(data)
{
	if(data.admin_online!= undefined && data.admin_online>0)
		{
		append_ws_link();
		}
	if(data.admin_online!= undefined && data.admin_online==0)
		{
		append_iframe();
		}
//	console.log('system');
//	console.log(data);
}

//############## HTML #############################
function append_iframe()
{
  $('#hc_presite_contact_form_').remove();
  if($('#beta_help_chat_').length==0){$('body').append('<div id="beta_help_chat_" style="overflow: hidden;transition: width 0.7s,height 0.5s,top 0.4s;z-index: 1000; width: 80px; height: 60px; background: #fff; border-radius: 20px 0px 0px 20px; padding: 5px;  position: absolute; right: 0px; top:200px; box-shadow: #bbb 0px 0px 10px;"></div>');}
  if($('.iframe_icon_').length==0)
  {
	  $('#beta_help_chat_').html('');
	  $('#beta_help_chat_').append('<svg class="iframe_icon_" onclick="var t=$(\'#beta_help_chat_\'); t.css(\'width\',\'360px\');t.css(\'height\',\'220px\');" style="cursor: pointer;transition: height 0.4s,fill 0.6s;" height="50" viewBox="0 0 24 24" width="50" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>');  
	  $('#beta_help_chat_').append('<iframe style="border: none;" src="//buldakoff.com/help/help.php" width="100%" height="180" align="left"></iframe>');
	  
  }
	if($('#beta_help_chat_').width()<100)
	{
	$('#beta_help_chat_').css('height','60px');
	$('#beta_help_chat_').css('width','60px');
	}
}
function append_ws_link()
{
	$('#beta_help_chat_').html('');
	$('#beta_help_chat_').append('<svg class="ws_icon_" onclick="var t=$(\'#beta_help_chat_\'); t.css(\'width\',\'380px\');t.css(\'height\',\'220px\');" style="z-index: 100; top: 5px; left: 5px;position: absolute;cursor: pointer;transition: height 0.4s,fill 0.6s;" height="50" viewBox="0 0 24 24" width="50" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>');
	$('#beta_help_chat_').append('<input type="text" id="ws_chat_text" style="display: none;width: 90%; border: 1px solid #97c226;margin: 0px 10px; padding: 3px 6px;height: 28px;" name="message" placeholder="message">');
	$('#beta_help_chat_').append('<div class="button send_msg" onclick="beta_help_send_message();" style="display: none;position: absolute;z-index: 200; right: 0px; height: 28px;bottom: 3px;border: none;background: #97c226;color: #fff;text-align: center; padding: 4px 10px;margin: 4px;font: 15px Arial;cursor: pointer;">>></div>');
	$('#beta_help_chat_').append('<br><br><input class="button" id="hc_help_ws_username" value="" style="width: 200px;border: 1px solid #bbb;color: #333; padding: 4px 6px;margin: 4px;font: 15px Verdana;" placeholder="Name">');	
	$('#beta_help_chat_').append('<div class="button" onclick="beta_open_chat();" style="width: 200px;border: none;background: #97c226;color: #333;text-align: center; padding: 8px 20px;margin: 4px;font: 15px Verdana;cursor: pointer;">open chat</div>');
	$('#beta_help_chat_').append('<div class="button" onclick="append_iframe();" style="width: 200px;border: none;background: #97c226;color: #333;text-align: center; padding: 8px 20px;margin: 4px;font: 15px Verdana;cursor: pointer;">offline message</div>');
	if($('#beta_help_chat_').width()<100){
		$('#beta_help_chat_').css('height','36px');
		$('#beta_help_chat_').css('width','40px');
		}
	$('#beta_help_chat_ svg').css('fill','#97c226');
	$('#beta_help_chat_ svg').css('height','26px');
	$('#beta_help_chat_ svg').css('width','auto');

}

