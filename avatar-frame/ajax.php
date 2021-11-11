<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	header("HTTP/1.0 404 Not Found");
}

$frames = [
	[
		'name' => 'Sinh Nhật YTC Lần Thứ 3',
		'src'  => 'uploads/ytc.png'
	],
	[
		'name' => 'YTC Chào Đón K63',
		'src'  => 'uploads/frame-ytc.png'
	],

];

header('Content-Type: application/json');
echo json_encode( $frames );
?>