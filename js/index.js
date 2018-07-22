var table = $('table tr');
var message = $('#message');
//eu tava tentando usar table como um elemento só, mas é melhor usar cada tr como um elemento e table ser tratado como um vetor de linhas
var player = 'blue';
$(message).toggleClass(player);

/*
bacaninha e talz, mas e melhor ter os elementos no html

function initGame(){

	//inicializando a tela
	//criando tr
	for(var i = 0; i< numRows; i ++){E
		$('#gameBoard').append("<tr></tr>");
	}
	//criando td
	for( var j = 0; j < numColumns; j++){
		$('tr').append("<td></td>");
	}
	//adicionando as classes a cada elemento td de cada tr
	for(var i = 0; i< numColumns; i++){
		$('tr').each(function(){
			$(this).children().eq(i).attr('class', i);
		});
	}
	$('td').append('<div></div>').addClass('gameElement unclicked');
}

*/

function addBelow(rowNum, colNum, player){
	if(colNum >= 0){
	// por algum motivo que eu não entendi, quando clica em alguma coisa sem unclicked, ele edita a linha -1 (última)
		if($(table).eq(rowNum +1).find('td').eq(colNum).hasClass('unclicked') && rowNum <=4){
			return 1 + addBelow(rowNum+1, colNum, player);
		}else{
			$(table).eq(rowNum).find('td').eq(colNum).addClass(player);
			$(table).eq(rowNum).find('td').eq(colNum).removeClass('unclicked');
			return 0;
		}
		console.log('row '+rowNum+ ' col '+colNum);
	}
}


function checkVerticalWin(row,col, player){
	//o ultimo elemento adicionado deve ser comparado com os elementos abaixo dele na mesma coluna
	//pra que isso ocorra, o ultimo elemento adicionado deve ter sido adicionado em 2 ou menos
	if(row !== undefined && row <=2){
		return (
		$(table).eq(row).find('td').eq(col).hasClass(player)&&
		$(table).eq(row +1).find('td').eq(col).hasClass(player) && 
		$(table).eq(row +2).find('td').eq(col).hasClass(player) && 
		$(table).eq(row +3).find('td').eq(col).hasClass(player)
		);
	}return false;

}

function checkHorizontalWin(row, col, player){
	//O ultimo elemento adicionado tem que checar se o botao na posicao de elemento - 3 tem 3 elementos do lado com a mesma classe e descer fazendo isso
	//ate a posicao de elemento
	for(var i = 0; i < 4; i++ ){
		if( ($(table).eq(row).find('td').eq(i).hasClass(player)&&
				$(table).eq(row).find('td').eq(i +1).hasClass(player)&&
				$(table).eq(row).find('td').eq(i +2).hasClass(player)&&
				$(table).eq(row).find('td').eq(i +3).hasClass(player)) === true){
			return true;
		}
	}
	return false;
}
function checkDiagonalWin(player){
	for(var i = 0; i <= 5; i ++){
		for(var j = 0; j <=6; j++){
			if( ($(table).eq(i).find('td').eq(j).hasClass(player)&&
				$(table).eq(i + 1).find('td').eq(j +1).hasClass(player)&&
				$(table).eq(i + 2).find('td').eq(j +2).hasClass(player)&&
				$(table).eq(i + 3).find('td').eq(j +3).hasClass(player)) === true){
				return true;
			}
			if( ($(table).eq(i).find('td').eq(j).hasClass(player)&&
				$(table).eq(i - 1).find('td').eq(j +1).hasClass(player)&&
				$(table).eq(i - 2).find('td').eq(j +2).hasClass(player)&&
				$(table).eq(i - 3).find('td').eq(j +3).hasClass(player)) === true){
				return true;
			}	
		}
	}
	return false;
}

$(window).load(function(){
	//initGame();
	$('.unclicked').click(function(){
		$(message).toggleClass(player);
		if(player ==='blue'){
			player = 'red';
			$(message).css('blue');
		}else{
			player = 'blue';
			$(message).css('red');
		}
		//$(message).toggleClass(player);

		var col = $(this).closest('.unclicked').index();
		var row = $(this).closest('tr').index();
		var lastBtnAdded = addBelow(row,col, player);


		console.log(lastBtnAdded +"foi adicionado nessa linha");
    /* testar as funcoes propriamente tava exigindo muito do codepen, por isso as variaveis, muda isso aqui nao */ 
    var diagonalCheck = checkDiagonalWin(player);
    var horizontalCheck = checkHorizontalWin(lastBtnAdded,col, player);
    var verticalCheck = checkVerticalWin(lastBtnAdded,col, player);
    
		if(diagonalCheck || horizontalCheck || verticalCheck){
			console.log(player.toUpperCase()+" WON THE GAME!");
			$('#message').html(player.toUpperCase()+" WON THE GAME!");
			
			window.location.hash='gameover';
		}
		//var win = os checks. se win avisa o player que ganhou e talz
		//console.log(checkVerticalWin(lastBtnAdded,col, player));
		//console.log(checkHorizontalWin(lastBtnAdded,col, player));

		//console.log(checkDiagonalWin(player));
		console.log("col: "+col+ " row: "+ row);
		
	});
});