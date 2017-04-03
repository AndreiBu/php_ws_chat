<script defer type="text/javascript" src="/js/vendor/jquery-3.js"></script>
<script defer type="text/javascript" src="/js/fancywebsocket.js?v=12"></script>

<h1>JavaScript client </h1>

<div id="ws_log" style="border: 1px solid #ddd; margin: 20px; min-height: 100px;overflow-y: auto;  max-height: 360px; padding: 4px;padding: 10px;"></div>
<div id="channel_list" style="border: 1px solid #ddd; margin: 80px; padding: 20px;"></div>

<div style="border: 1px solid #ddd; margin: 80px; padding: 20px;">
    <input type="text" placeholder="msg_text" id="msg_text" style="width: 60%;"> 
    <select id="ch_lists"  style="width: 30%;">
	    <option value=""></option>
    </select>
    <a href="#" onclick="var text=$('#msg_text').val();var id=$('#ch_lists option:selected').val(); if(text=='' || id==''){return false;}HC_WS.send_message_to(id,text,onmessage_);return false;">send msg</a>
</div>

<?php
/*
<div style="border: 1px solid #ddd; margin: 80px; padding: 20px;">
<input type="text" placeholder="channal name" id="channal_name"> <a href="#" onclick="var name=$('#channal_name').val(); if(name==''){return false;}HC_WS.create_channel(name+'_channel',create_channel_);return false;">create channel</a>
<a href="#" id="channel_list" onclick="HC_WS.channel_list(channel_list_);return false;">channel list</a>
</div>
*/
?>

<div class="button online" onclick="go_online();" style="display: none;width: 200px;border: none;background: #97c226;color: #333;text-align: center; padding: 8px 20px;margin: 4px;font: 15px Verdana;cursor: pointer;">go online</div>
<div class="button offline" onclick="go_offline();" style="display: none;width: 200px;border: none;background: #999;color: #000;text-align: center; padding: 8px 20px;margin: 4px;font: 15px Verdana;cursor: pointer;">go offline</div>

<div id="syslog" style="border: 1px solid #ddd; margin: 80px; padding: 20px;"></div>

<script>
function go_online(){
	$('.online').hide();$('.offline').show();
	HC_WS.send_message_to('999','online',onmessage_online);	
}
function go_offline(){
	$('.online').show();$('.offline').hide();
	HC_WS.send_message_to('999','offline',onmessage_online);	
}
function onmessage_online(data)
{
	console.log(data);
}
function _system_callback(data)
{
	console.log('system');
	console.log(data);
}

//#######################################################

function _after_connect(){
	HC_WS.follow_channel('988',follow_channel_,onmessage_988);
	go_offline();
	if($('#chatAudio').length==0){$('<audio id="chatAudio"><source src="/help/adm.ogg" type="audio/ogg"><source src="/help/adm.mp3" type="audio/mpeg"></audio>').appendTo('body');}
}
function _after_disconnect(){
	//console.log('after_disconnect');
}
function onmessage_988(data){
	HC_WS.follow_channel(data.channel.id,follow_channel_,onmessage_);
	//HC_WS.channel_list(channel_list_);
}

//############################################################################
function onmessage_(data)
{
	console.log(data);
	if(data.status=='online_offline')
	{
	//if(data.msg=='online'){}
	//else{append_iframe();}
	}
	if(data.status=='ok')
	{
    	var style='';
    	if(data.autor==0)
    	{
    		style='floaT: left; background: #f9f9f9; margin: 4px 40px 4px 4px;';
    		$('#chatAudio')[0].volume=.3;
    		$('#chatAudio')[0].play();
    	}
    	else
    	{
    		style='floaT: right; background: #f1fcd4; margin: 4px 4px 4px 40px;';
    	}
    	$('#ws_log').prepend('<div style="clear : both; "></div>');
    	$('#ws_log').prepend('<div style="'+style+' padding: 4px 10px; border-radius: 6px; "><div><b>'+data.channel.name+'</b> '+data.dat+'</div>'+data.msg+'</div>');
	}	
}

function follow_channel_(data){
//console.log(data);
HC_WS.channel_list(channel_list_);
}


function channel_list_(data)
{
	//console.log(data);
	$('#channel_list').html('');
	$("#ch_lists").empty();
	$("#ch_lists").append( $('<option value=""></option>'));
	for (v in data.data)
		{
		var tt='';
		tt+=' <a href="#" onclick="HC_WS.follow_channel(\''+v+'\',follow_channel_,onmessage_);return false;">follow</a> ';
		tt+=' <a href="#" onclick="HC_WS.unfollow_channel(\''+v+'\',follow_channel_);return false;">unfollow</a> ';
		tt+=' <a href="#" onclick="HC_WS.send_message_to(\''+v+'\',\'echo message\',onmessage_);return false;">ping</a> ';
		tt+=' <a href="#" onclick="HC_WS.prolongate_channel(\''+v+'\',channel_list_);return false;">prolongate</a> ';
		tt+=' <a href="#" onclick="if(confirm(\'delete channel ?\')){HC_WS.remove_channel(\''+v+'\',channel_list_);}return false;">remove</a> ';
		$('#channel_list').append('<div><b>'+data.data[v]['name']+'</b> '+data.data[v]['url']+' '+data.data[v]['ip']+'  '+data.data[v]['follow']+' '+tt+'</div>');
		$("#ch_lists").append( $('<option value="'+v+'">'+data.data[v]['name']+' (id '+v+')</option>'));
		}
	
}

/*
function create_channel_(data)
{
	console.log(data);
	HC_WS.channel_list(channel_list_);
}
*/
function follow_channel_(data)
{
	//console.log(data.data);
	$('#data').html('');
	for (v in data.data)
	{
	$('#data').append('<div>'+data.data[v]+'</div>');
	}
	HC_WS.channel_list(channel_list_);
	
}
</script>