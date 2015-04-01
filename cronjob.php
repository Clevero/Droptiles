<?php

//here are all jobs listed, which should be done daily or so

$str_eins = shell_exec('cd /var/www/droptiles/scripts/nasa/64d900721448875bde82/ && ./NASA\ Picture-Of-The-Day\ Wallpaper\ Script');
echo $str_eins . "<br>";
$str_zwei = shell_exec('cd /var/www/droptiles-beta/plugins/ng/national-geographic-photo-of-the-day/ && ruby ./ng_fetch.rb'');

echo $str_zwei . "<br>";

?>
