$(document).ready(function() {
	
	var pointer = $('.calc-advance .pointer');
	var pointerWidthPart = 16;  //$(pointer).width();

	$('.ca-header li').click(function(){
		$('.ca-header li').removeClass('active');
		$(this).addClass('active');
		var ratePosition = $(this).position().left;
		var rateWidthPart = $(this).width()*0.5;
		var rateMargin = parseInt($(this).css('margin-right')); // Получаем маргин
	
		var pointerLeft = ratePosition + rateWidthPart + rateMargin - pointerWidthPart;

		$(pointer).css({'left':pointerLeft});

		var rateId = $(this).attr('id');
		var baseId = rateId.replace(/rate-/,'')
		var caDm = 'ca-dm-'+baseId;

		setTimeout(function(){
			$('.ca-dm').removeClass('active');
			$('.'+caDm).addClass('active');
		}, 350);

		$('.ca-middle').attr('id', caDm); // Для смены фона блока. Необязательно

		
		/*
		$('.ca-dm').hide(100);
		$('.'+caDm).show(400);

		$('.ca-dm').removeClass('active');
		$('.'+caDm).addClass('active');
		*/

		console.log(rateId, baseId, caDm);
	});

});