<?php
if(count($_POST)>0)
{
    print '<h1>DANKE !!</h1>';
    die();
}
?>

 <form action="" method="post">
  <div class="li">
    <input type="text" name="name" placeholder="Name">
  </div>	
  <div class="li">
    <textarea  name="message" placeholder="message"></textarea>
  </div>
  <div class="li">
  	<input class="button" type="submit" value="send">
  </div>	
 </form>
<style>
* {margin:0;padding:0;outline:none;box-sizing: border-box}
form {margin: 0px; padding: 0px;}
input {width: 90%; border: 1px solid #999; padding: 3px 6px;}
textarea {width: 90%; border: 1px solid #999; padding: 3px 6px;height: 80px;}
.li {padding: 4px; text-align: center;}
.button {border: none;background: #97c226;color: #fdfdfd;text-align: center; padding: 8px 20px;font: bold 13px Verdana;text-transform: uppercase;cursor: pointer;transition:background 0.75s, box-shadow 0.25s, transform 0.25s, opacity 0.5s;display:inline-block;}
</style>
