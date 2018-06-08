var questions = new Array(30);
var feedbacks = new Array(30);
var questionNumber=0;
var editingFlag = false;
var questionEdited = 0;
var answerNumber = 1;
var triggerNumber = 0;
$(document).ready(function () {

	var height = $(document).height();
	var menu_height = $("#upperBar").height();
	var content_height = height - menu_height;

	$(".mainArea").css("height", content_height);
	$(".mainArea").css("top", menu_height);

});


function createMultipleChoiseQuestion() {
	answerNumber=1;
	$(".questions").append('<div id="mcQuestionDiv"'+
								'<ul class="callLabUl">'+
									'<li>Enter Question:</li>'+
									'<li><textarea type="text" id="question_text" /></li>'+
									'<li>'+
										'<fieldset id="typeOfQuestion">'+
											'<input type="radio" value="single" name="singleOrMultiple" id="single" /><label for="single">Single Answer</label>'+
											'<input type="radio" value="multiple" name="singleOrMultiple" id="multiple" /><label for="single">Multiple Answers</label>'+
										'</fieldset>'+
									'</li>'+
									'<br />'+
									'<li id="singleQuestionDiv">'+
									
									'</li>' +
									'<li>' +
										'<button type="button" class="btn btn-success" onclick="saveMCQuestion()">Save</button>' +
										'<button type="button" class="btn btn-warning" onclick="cancelTrueFalse()">Cancel</button>' +
								'</ul>' +
							'</div>');
	$("#typeOfQuestion input").change(function() {
		triggerNumber++;
		if (triggerNumber>1) return;
		console.log("changed");
		var choice = $('input[name="singleOrMultiple"]:checked', "#typeOfQuestion").val();
		if (choice == "single") {
			$("#singleQuestionDiv").append('<legend>Add Answer Options</legend>' +
											'<fieldset id="singleAnswers">' +
												'<div class="focusInputs" id="answer'+answerNumber+'">'+
													answerNumber + '. <input type="radio" name="answersOfSingle" value="a'+answerNumber+'" />'+
													'<input type="text" id="a'+answerNumber+'a">'+
													'<input type="text" placeholder="enter feedback" id="feedback'+answerNumber+'"><br>' +
												'</div>' +
											'</fieldset>');
			$('<button type="button" id="addMoreBtn" onclick="addMoreAnswers()">Add more answers</button>').insertAfter("#singleQuestionDiv");
			$('<button type="button" onclick="removeOneQuestion()">Remove 1 answer</button>').insertAfter("#addMoreBtn");
			answerNumber++;
		}
		else {

		}
	});
}
function removeOneQuestion() {
	answerNumber--;
	$("#answer"+answerNumber).remove();
}
function addMoreAnswers() {
	$("#singleQuestionDiv").append('<div class="focusInputs" id="answer'+answerNumber+'">'+
										answerNumber + '. <input type="radio" name="answersOfSingle" value="a'+answerNumber+'" />'+
										'<input type="text" id="a'+answerNumber+'a">'+
										'<input type="text" placeholder="enter feedback" id="feedback'+answerNumber+'"><br>' +
									'</div>');
	answerNumber++;
}
function createTrueFalseQuestion() {
	$(".questions").append('<div id="trueFalseDiv">' +
								'<ul class="callLabUl">' +
									'<li>Enter Question:</li>' +
									'<li><textarea type="text" id="question_text" /></li>' +
									'<br />' +
									'<li>' +
										'<legend>Select True/False</legend>' +
										'<fieldset id="group1">' +
											'<div class="focusInputs">'+
												'<input type="radio" value="True" name="trueFalse" id="true"/><label for="true">True</label>'+
											'</div>' +
											'<input type="text" placeholder="enter feedback" id="feedback1"><br>' +
											'<div class="focusInputs">' +
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
	$('.focusInputs').focusin( function() {
    	$(this).addClass('focus');
	});

	// Remove the "focus" value to class attribute 
	$('.focusInputs').focusout( function() {
	    $(this).removeClass('focus');
	});
	$(".addQuestionsMenu").prop("disabled",true);
	
}
function cancelTrueFalse() {
	triggerNumber=0;
	editingFlag=false;
	$("#trueFalseDiv").remove();
	$("#mcQuestionDiv").remove();
	$(".addQuestionsMenu").prop("disabled",false);
}
/**
*Functions that gets the question text and answer value <br>
*and saves as a question array with size 2.
*/
function saveTrueFalseQuestion() {
	var temp = questionNumber;
	if (editingFlag == true) {
		questionNumber = questionEdited;
	}
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
	
	cancelTrueFalse();
	if (editingFlag == false) {
		questionNumber=temp+1;
		$('<button type="button" id="question('+(questionNumber-1)+')" onclick="showQuestion('+(questionNumber-1)+')" >'+(questionNumber)+'</button>').insertBefore("#bottomMenu");
	}
	else {
		questionNumber=temp;
	}
	editingFlag = false;
}

function saveMCQuestion() {
	var temp = questionNumber;
	if (editingFlag == true) {
		questionNumber = questionEdited;
	}
	var question_text = $("#question_text").val();
	var answer = $("input[name=answersOfSingle]:checked");
	answer = answer.val();
	console.log(answer);
	var question = new Array(3);
	var qFeedback = new Array(answerNumber-1);
	for (var i = 0; i<answerNumber-1; i++) {
		qFeedback[i] = $("#feedback"+(i+1)).val();
	}
	question[0] = 2;
	question[1] = question_text;
	question[2] = answer;
	question[3] = new Array(answerNumber-1);
	for (var i=0;i<answerNumber-1;i++) {
		question[3][i] = $("#a"+(i+1)+"a").val();
	}
	questions[questionNumber] = question;
	feedbacks[questionNumber] = qFeedback;

	cancelTrueFalse();
	if (editingFlag == false) {
		questionNumber = temp+1;
		$('<button type="button" id="question('+(questionNumber-1)+')" onclick="showQuestion('+(questionNumber-1)+')" >'+(questionNumber)+'</button>').insertBefore("#bottomMenu");
	}
	else {
		questionNumber=temp;
	}
	editingFlag = false;
}

function showQuestion(number) {
	answerNumber = 1;
	triggerNumber=0;
	editingFlag = true;
	questionEdited = number;
	if (questions[number][0] == 1) {
		cancelTrueFalse();
		createTrueFalseQuestion();
		$("#question_text").val(questions[number][1]);
		var $radio = $("input:radio[name=trueFalse]");
		$radio.filter('[value='+questions[number][2]+']').prop("checked",true);
		$("#feedback1").val(feedbacks[number][0]);
		$("#feedback2").val(feedbacks[number][1]);
	}
	else if (questions[number][0] == 2){
		cancelTrueFalse();
		createMultipleChoiseQuestion();
		$("#question_text").val(questions[number][1]);
		var $radio = $("input:radio[name=singleOrMultiple]");
		$radio.filter("[value=single]").prop("checked" , true);
		$("#typeOfQuestion input").trigger("change");
		var array = questions[number][3];
		$("#a1a").val(array[0]);
		for (var i=0;i<(questions[number][3].length)-1;i++) {
			$("#addMoreBtn").trigger("click");
			$("#a"+(i+2)+"a").val(array[i+1]);
		}
		for (var i=0;i<(feedbacks[number].length);i++) {
			$("#feedback"+(i+1)).val(feedbacks[number][i]);
		}
		var $answerito = $("input:radio[name=answersOfSingle]");
		$answerito.filter("[value="+questions[number][2]+"]").prop("checked" , true);

	}
}

function saveToFile() {
	var temp = $("#theText").val();
	var theText = $("#theText").val().split("\n");
	console.log(theText);
	for (var i=0;i<theText.length;i++) {
		if (theText[i].length < 2) {
			theText.splice(i,1);
		}
	}
	$("#theText").val("<p>"+theText.join("</p><p>")+"</p>");
	theText = $("#theText").val();
	//theText = theText.replace(/\n\r?/g, '<br />');
	var data = { 
        "text": theText,
        "feedbacks": JSON.stringify(feedbacks),
        "questions": JSON.stringify(questions),
        "title" : $("#theTitle").val(),
        "numOfQuestions": questionNumber,
        "fileName": $("#fileName").val(),
    };
    $.post("http://localhost:8080/TextWithQuestionsPostHandler", data);
    $("#theText").val(temp);
}