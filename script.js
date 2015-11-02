$(document).ready(function() {
	var input = 0,
			operator = null,
			left = '',
			right = '',
			$output = $('.output'),
			answer = null;

	// when 0-9 button clicked
	$('.num').on('click', function() {
		input = $(this).html();
		// if operator not yet assigned, concatenate input onto 'left'.
		if (operator === null) {
			// Do not allow multiple decimal points to be entered
			if (left.indexOf('.') !== -1 && input == '.') {
				return;
			}
			left = left.concat(input);
			display(left);
			// also, clear the answer if still set from a previous calculation
			answer = null;
		// since operator is assigned, concatenate input onto 'right'
		} else {
			// Do not allow multiple decimal points to be entered
			if (right.indexOf('.') !== -1 && input == '.') {
				return;
			}
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

	// when percent sign clicked
	$('.percent').on('click', function() {
		if (right) {
			left = +left / 100;
			right = +right / 100;
			compute();
		} else if (left) {
			left = +left / 100;
			left = String(left);
			display(left);
		} else {
			answer = answer / 100;
			display(answer);
			// reset
			operator = null;
			left = '';
			right = '';
		}
	});

	// when equals clicked
	$('.equals').on('click', function() {
		compute();
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
		// reset
		operator = null;
		left = '';
		right = '';
	}

	// update display on output screen
	function display(value) {
		if (String(value).length > 10) {
			value = Number(value).toPrecision(7);
		}
		$output.html(value);
	}
});