$(document).ready(function() {
	var input = 0,
			operator = null,
			left = '',
			right = '',
			$output = $('.output'),
			answer = null;

	// TO DO:
	// 1. figure out how to treat . (decimal) - allow only once; 
	// 2. % percentage sign
	// 3. limit display to X digits

	// when 0-9 button clicked
	$('.num').on('click', function() {
		input = $(this).html();
		// if operator not yet assigned, concatenate input onto 'left'
		if (operator === null) {
			left = left.concat(input);
			display(left);
			// also, clear the answer if still set from a previous calculation
			answer = null;
		// since operator is assigned, concatenate input onto 'right'
		} else {
			// if answer has a value, and the operator is clicked, then the user is trying to use the answer as their left input
			if (answer !== null) {
				left = answer;
			}
			right = right.concat(input);
			display(right);
		}
	});

	// when operator clicked
	$('.oper').on('click', function() {
		// allow for method chaining
		if (left && right && operator) {
			compute();
			left = answer;
			right = '';
		}
		operator = $(this).html();
	});

	// when clear clicked
	$('.clear').on('click', function() {
		left = '';
		right = '';
		operator = null;
		answer = null;
		$output.html(0);
	});

	// when equals clicked
	$('.equals').on('click', function() {
		compute();
		// reset
		operator = null;
		left = '';
		right = '';
	});

	// convert left and right to numbers, evaluate operator, compute answer & display
	function compute() {
		left = +left;
		right = +right;
		switch (operator) {
			case '+':
				answer = left + right;
				break;
			case '-':
				answer = left - right;
				break;
			case '/':
				answer = left / right;
				break;
			case 'X':
				answer = left * right;
				break;
		}
		display(answer);
	}

	// update display on output screen
	function display(value) {
		$output.html(value);
	}

});