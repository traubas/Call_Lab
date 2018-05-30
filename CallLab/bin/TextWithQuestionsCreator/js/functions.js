var questions = new Array(30);
var feedbacks = new Array(30);
var questionNumber=0;
$(document).ready(function () {

	var height = $(document).height();
	var menu_height = $("#upperBar").height();
	var content_height = height - menu_height;

	$(".mainArea").css("height", content_height);
	$(".mainArea").css("top", menu_height);


});

function createTrueFalseQuestion() {
	$(".questions").append('<div id="trueFalseDiv"' +
								'<ul class="callLabUl">' +
									'<li>Enter Question:</li>' +
									'<li><textarea type="text" id="question_text" /></li>' +
									'<br />' +
									'<li>' +
										'<legend>Select True/False</legend>' +
										'<fieldset id="group1">' +
											'<div class="trueFalseInputs">'+
												'<input type="radio" value="True" name="trueFalse" id="true"/><label for="true">True</label>'+
											'</div>' +
											'<input type="text" placeholder="enter feedback" id="feedback1"><br>' +
											'<div class="trueFalseInputs">' +
												'<input type="radio" value="False" name="trueFalse" id="false" /><label for="false">False </label>'+
											'</div>' +
											'<input type="text" placeholder="enter feedback" id="feedback2">' +
										'</fieldset>' +
									'</li>' +
									'<li>' +
										'<button type="button" class="btn btn-success" onclick="saveTrueFalseQuestion()">Save</button>' +
										'<button type="button" class="btn btn-warning" onclick="cancelTrueFalse()">Cancel</button>' +
								'</ul>' +
							'</div>');
	$('.trueFalseInputs').focusin( function() {
    	$(this).addClass('focus');
	});

	// Remove the "focus" value to class attribute 
	$('.trueFalseInputs').focusout( function() {
	    $(this).removeClass('focus');
	});
	$(".addQuestionsMenu").prop("disabled",true);
	
}
function cancelTrueFalse() {
	$("#trueFalseDiv").remove();
	$(".addQuestionsMenu").prop("disabled",false);
}
/**
*Functions that gets the question text and answer value <br>
*and saves as a question array with size 2.
*/
function saveTrueFalseQuestion() {
	var question_text = $("#question_text").val();
	var answer = $('input[name="trueFalse"]:checked', "#group1").val();
	var question = new Array(3);
	var qFeedback = new Array(2);
	qFeedback[0] = $("#feedback1").val();
	qFeedback[1] = $("#feedback2").val();

	question[0] = 1;
	question[1]=question_text;
	question[2] = answer;
	questions[questionNumber]=question;
	feedbacks[questionNumber]=qFeedback;
	questionNumber+=1;
	cancelTrueFalse();
	$('<button type="button" id="question('+(questionNumber-1)+')" onclick="showQuestion('+(questionNumber-1)+')" >'+(questionNumber)+'</button>').insertBefore("#bottomMenu");
}

function showQuestion(number) {
	if (questions[number][0] == 1) {
		cancelTrueFalse();
		createTrueFalseQuestion();
		$("#question_text").val(questions[number][1]);
		var $radio = $("input:radio[name=trueFalse]");
		$radio.filter('[value='+questions[number][2]+']').prop("checked",true);
		$("#feedback1").val(feedbacks[number][0]);
		$("#feedback2").val(feedbacks[number][1]);
	}
}
function saveToFile() {
	var theText = $("#theText").val();
	theText = theText.replace(/\n\r?/g, '<br />');
	var data = { 
        "text": theText,
        "feedbacks": JSON.stringify(feedbacks),
        "questions": JSON.stringify(questions),
        "title" : $("#theTitle").val(),
        "numOfQuestions": questionNumber,
        "fileName": $("#fileName").val(),
    };
    $.post("http://localhost:8080/TextWithQuestionsPostHandler", data);
}