$(document).ready(function () {

    var preview = $('.preview-image');
    var scaleX = 0.5;
    var scaleY = 0.5;
    var output_size = 1024; // px
    var output_name = 'avatar.png';
    
        var text = { 'frames' : [
		{'name':'YTC Chào Đón K63', 'src' :'uploads/frame-ytc.png'}, 
		{'name':'Mùa Hè Xanh NTU','src' :'uploads/frame0.png'}, 
	    ]};


    var select = $('.frame-change select');
    select.html('');
    $.each( text.frames, function ( idx, item ) {
        if(idx == 0) {
            $('.frame-image').css('background-image', 'url(' + item.src + ')');
        }
        select.append('<option value="' + item.src + '">' + item.name + '</option>');
    });

//     $.post( "ajax.php", function( data ) {
//         if( ! data ) {
//             alert('Lấy dữ liệu thất bại. Vui lòng tải lại trang.');
//             return;
//         }
//         var select = $('.frame-change select');
//         select.html('');
//         $.each( data, function ( idx, item ) {
//             if(idx == 0) {
//                 $('.frame-image').css('background-image', 'url(' + item.src + ')');
//             }
//             select.append('<option value="' + item.src + '">' + item.name + '</option>');
//         });
//     });

    preview.cropper({
        aspectRatio: 1 / 1,
        dragMode: 'move',
        guides: false,
        center: false,
        modal: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        autoCrop: false,
        minCropBoxWidth: $('.dyn-box').outerWidth(),
        toggleDragModeOnDblclick: false,
    });

    $('.btn-upload').click(function () {
        $('#upload-file').click();
    });

    $('#upload-file').change(function (e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var image_url = e.target.result;
            preview.cropper('replace', image_url);
            $('.btn').removeClass('hidden');
        };
        reader.readAsDataURL(file);
    });

    $('.btn-rotate-left').click(function () {
        preview.cropper('rotate', -90);
    });

    $('.btn-rotate-right').click(function () {
        preview.cropper('rotate', 90);
    });

    $('.btn-zoom-in').click(function () {
        preview.cropper('zoom', 0.1);
    });

    $('.btn-zoom-out').click(function () {
        preview.cropper('zoom', -0.1);
    });

    $('.btn-flip-horizon').click(function () {
        scaleX = -scaleX;
        preview.cropper('scaleX', scaleX);
    });

    $('.btn-flip-vertical').click(function () {
        scaleY = -scaleY;
        preview.cropper('scaleY', scaleY);
    });

    $('.btn-reset').click(function () {
        preview.cropper('reset');
        scaleX = 1;
        scaleY = 1;
    });

    $('.btn-download').click(function () {
        preview.cropper('crop');
        var cropped_image = preview.cropper('getCroppedCanvas');

        var canvas = document.createElement('canvas');
        canvas.width = output_size;
        canvas.height = output_size;
        var ctx = canvas.getContext('2d');

        var _img = new Image();
        var _frame = new Image();

        _img.src = cropped_image.toDataURL();
        _img.onload = function () {
            ctx.drawImage(_img, 0, 0, _img.width, _img.height, 0, 0, output_size, output_size);
            _frame.src = $('.frame-change select').val();
            _frame.onload = function () {
                ctx.drawImage(_frame, 0, 0, _frame.width, _frame.height, 0, 0, output_size, output_size);
                $('<a download="' + output_name + '" href="' + canvas.toDataURL() + '">Download Image</a>')[0].click();
            };
        };
    });

    $('.frame-change select').change(function () {
        $('.frame-image').css('background-image', 'url(' + $(this).val() + ')');
    });
});

