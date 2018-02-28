var questions = new Array(30);

$(document).ready(function () {

var height = $(document).height();
var menu_height = $("#upperBar").height();
var content_height = height - menu_height;

$(".mainArea").css("height", content_height);
$(".mainArea").css("top", menu_height);
});

function createTrueFalseQuestion() {
	$(".questions").append('<ul>' +
								'<li>Enter Question:</li>' +
								'<li><input type="text" id="question_text"></li>' +
								'<br />' +
								'<li>Add options:</li>' +
							'</ul>');
}