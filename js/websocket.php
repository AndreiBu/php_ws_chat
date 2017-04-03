<?php
$salt='12345678';
//print_r($_SERVER);
$a=array('HTTP_HOST','REMOTE_ADDR','HTTP_REFERER');
$b=array();
foreach ($a as $k=>$v){if(isset($_SERVER[$v])){$b[$v]=$_SERVER[$v];}else{$b[$v]='-';}}
$key=md5(json_encode($b).$salt.date("m.d.y"));
$b['key']=$key;
$b=base64_encode(json_encode($b));
print 'var ws_key=\''.$b.'\';';
$homepage = file_get_contents(__DIR__.'/websocket.js');
echo $homepage;
?>
