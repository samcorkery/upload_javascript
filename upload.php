

<?php


return(var_dump($_FILES));
$location = "upload/".$_FILES['file']['name'];

if(move_uploaded_file($_FILES['file']['tmp_name'], $location)){
	print('yes');
}
else{
	print('no');
}










?>