<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	header("HTTP/1.0 404 Not Found");
}

$frames = [
	[
		'name' => 'YTC Chào Đón K63',
		'src'  => 'uploads/frame-ytc.png'
	],
	[
		'name' => 'Mùa Hè Xanh NTU',
		'src'  => 'uploads/frame0.png'
	],

];

header('Content-Type: application/json');
echo json_encode( $frames );
?>