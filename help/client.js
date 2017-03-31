$.getScript('//buldakoff.com/js/ws.js',function(){append_iframe();FancyWebSocket_load_bind_();});
    
function FancyWebSocket_load_bind_(){
 HC_WS.after_connect=_after_connect;
 HC_WS.after_disconnect=_after_disconnect;
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
		$('#beta_help_chat_').prepend('<div id="mm_block" style="overflow-y: auto; width: 100%; max-height: 160px; padding: 4px; "></div>');
		$('.button').hide();
		$('.send_msg').show();
		var nickname=$('#hc_help_ws_username').val();
		HC_WS.create_private_channel(nickname,beta_help_chat_open);
		}
}
function beta_help_chat_open(data)
{
	console.log(data);
	HC_WS.id_channel=data.id;
	HC_WS.follow_channel(data.id,follow_channel_,onmessage_);
	$('#beta_help_chat_').css('height','300px');
}
function beta_help_send_message()
{
	HC_WS.send_message_to(HC_WS.id_channel,$('#ws_chat_text').val(),onmessage_);
	$('#ws_chat_text').val('');
}

function _after_connect(){
	append_ws_link();
}
function _after_disconnect(){
	append_iframe();
}

//###############################################################################		
function onmessage_(data)
{
//$('#ws_log').prepend('<div style=" padding: 4px; ">'+data.msg+'</div>');
	$('#beta_help_chat_ #mm_block').prepend('<div style="clear: both;"></div>');
	if(data.autor==1){$('#beta_help_chat_ #mm_block').prepend('<div style="text-align: right;background: #f1fcd4; border: 1px solid #97c226; margin: 2px 0px 2px 40px; float: right; border-radius: 6px; padding: 2px 6px;  ">'+data.msg+'</div>');	}
	else{$('#beta_help_chat_ #mm_block').prepend('<div style=" padding: 4px; border-radius: 6px; background: #f8f8f8;margin: 2px 40px 2px 0px; float: left;">'+data.msg+'</div>');}
console.log(data);
}
function follow_channel_(data)
{
console.log(data);
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
  else
  {
	  
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
	$('#beta_help_chat_').append('<svg class="ws_icon_" onclick="var t=$(\'#beta_help_chat_\'); t.css(\'width\',\'380px\');t.css(\'height\',\'220px\');" style="cursor: pointer;transition: height 0.4s,fill 0.6s;" height="50" viewBox="0 0 24 24" width="50" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>');
	$('#beta_help_chat_').append('<textarea id="ws_chat_text" style="display: none;width: 100%; border: 1px solid #97c226; padding: 3px 6px;height: 40px;" name="message" placeholder="message"></textarea>');
	$('#beta_help_chat_').append('<div class="button send_msg" onclick="beta_help_send_message();" style="display: none;width: 200px;border: none;background: #97c226;color: #333;text-align: center; padding: 8px 20px;margin: 4px;font: 15px Verdana;cursor: pointer;">send</div>');
	$('#beta_help_chat_').append('<br><input class="button" id="hc_help_ws_username" value="" style="width: 200px;border: 1px solid #bbb;color: #333; padding: 4px 6px;margin: 4px;font: 15px Verdana;" placeholder="Name">');	
	$('#beta_help_chat_').append('<div class="button" onclick="beta_open_chat();" style="width: 200px;border: none;background: #97c226;color: #333;text-align: center; padding: 8px 20px;margin: 4px;font: 15px Verdana;cursor: pointer;">open chat</div>');
	$('#beta_help_chat_').append('<div class="button" onclick="append_iframe();" style="width: 200px;border: none;background: #97c226;color: #333;text-align: center; padding: 8px 20px;margin: 4px;font: 15px Verdana;cursor: pointer;">offline message</div>');
	if($('#beta_help_chat_').width()<100)
		{
		$('#beta_help_chat_').css('height','36px');
		$('#beta_help_chat_').css('width','40px');
		}
	$('#beta_help_chat_ svg').css('fill','#97c226');
	$('#beta_help_chat_ svg').css('height','26px');
	$('#beta_help_chat_ svg').css('width','auto');

}

