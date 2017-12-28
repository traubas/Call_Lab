var number=1;
var tempnumber=1;
var Feedbacks = new Array(50);
var CorrectAnswers = new Array(50);
function addtl() {
	$("#workingArea").append('<input type="text" id="textInput"><button type="button" onclick=addTextToPreview()>add</button>');
	$("#addLineBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$(".cancel").css('visibility', 'visible');
}
function addTextToPreview() {
	$("#clozeData").append('<span>'+ $("#textInput").val()+' <span>');
	$("#addLineBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$(".cancel").css('visibility', 'hidden');
	$("#workingArea").empty();
	
}
function cancel() {
	$("#workingArea").empty();
	$("#addLineBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$(".cancel").css('visibility', 'hidden');
	if (tempnumber>1)
		tempnumber=1;

}
function addch() {
	$("#addLineBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#workingArea").append('choice '+tempnumber+'<input type="text" id="c'+tempnumber+'">');
	$("#workingArea").append('feedback <input type="text" id="f'+tempnumber+'"><BR>');
	tempnumber++;
	$(".cancel").css('visibility', 'visible');
	/*will enter if only once*/
	if ($("#addMoreChoises").length ==0) {
		$("#workingArea").append('<div id="correctAnswerNumber">Correct answer number <input type="text" id="corrAns"><BR></div>');
		$("#workingArea").append('<button type="button" id="addMoreChoises" onclick="addch()">add More Choice</button>');
		$("#workingArea").append('<button type="button" id="aotp" onclick="addOptionsToPreview()">submit</button>');
	}
	else {
		$("#aotp").remove();
		$("#addMoreChoises").remove();
		$("#correctAnswerNumber").remove();
		$("#workingArea").append('<div id="correctAnswerNumber">Correct answer number<input type="text" id="corrAns"><BR></div>');
		$("#workingArea").append('<button type="button" id="addMoreChoises" onclick="addch()">add More Choice</button>');
		$("#workingArea").append('<button type="button" id="aotp" onclick="addOptionsToPreview()">submit</button>');

	}
}
function addOptionsToPreview() {
	var feedback = new Array(tempnumber);
	for (i=0;i<tempnumber-1;i++) {
	var id = "f"+(i+1);
		feedback[i] = $("#"+id).val();
	}
	var x="s"+number;
	$("#clozeData").append('<select id='+x+'></select> ');
	for (i=0;i<tempnumber;i++) {
		console.log($('#c'+(i+1)).val());
		if (i==0)
			$("#"+x).append('<option></option>');
		else
			$("#"+x).append('<option>'+$('#c'+(i)).val()+'</option>');
	}
	$("#clozeData").append('<button type="button" id="check'+number+'" onclick=checkOneAnswer('+number+') >check</button>');
	correct_answer = $("#corrAns").val();
	CorrectAnswers[number-1]=correct_answer;
	Feedbacks[number-1]=feedback;
	console.log(Feedbacks);
	console.log(CorrectAnswers);
	cancel();
	number++;
}

function checkOneAnswer(qnumber) {
	var answer = $("#s"+qnumber).prop('selectedIndex');
	if (answer==0) {
		console.log("You must choose an answer");
	}
	else if (answer == CorrectAnswers[qnumber-1]) {
		console.log(Feedbacks[qnumber-1][answer-1]);
	}
	else 
		console.log("WRONG");

}
