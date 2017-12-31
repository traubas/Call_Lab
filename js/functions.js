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
	cancel();
	number++;
}
/*needs to be part of the output script*/
function checkOneAnswer(qnumber) {
	var answer = $("#s"+qnumber).prop('selectedIndex');
	if (answer==0) {
		showFeedback("You must choose an answer",300,300,400,200,0);
	}
	else if (answer==CorrectAnswers[qnumber-1]){
		showFeedback(Feedbacks[qnumber-1][answer-1],300,300,400,200,1);
		var answer = $("#s"+qnumber+ " option:selected").text();
		$('<span class="correct">'+answer+'</span>').insertAfter("#check"+qnumber);
		$("#check"+qnumber).remove();
		$("#s"+qnumber).remove();
	}
	else {
		showFeedback(Feedbacks[qnumber-1][answer-1],300,300,400,200,0);
	}

}

function deleteLastAddition() {
	var s = $("#clozeData").children().last().prop("tagName");
	if (s == "BUTTON") {
		$("#clozeData").children().last().remove();
		$("#clozeData").children().last().remove();
		number--;
	}
	else
		$("#clozeData").children().last().remove();
}
/*needs to be part of the output script*/
function showFeedback(feedback,position1,position2,size1,size2,flag)
{
	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	fb = document.getElementById('feedback_content');
	feedback_content.innerHTML=
	"<br><center><table cellpadding=15><tr><td>"+feedback+"</tr></td></table></center><br>";
	if (flag==1) {
		$(".modal-content").css({'background-color': 'green'});
	}
	else
		$(".modal-content").css({'background-color': 'yellow'});
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}
