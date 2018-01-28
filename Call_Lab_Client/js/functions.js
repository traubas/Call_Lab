var number=1;
var tempnumber=1;
var Feedbacks = new Array(50);
var CorrectAnswers = new Array(50);
var answered_grade=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
var number_try=    new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)	
var title = "";
var checkingAll = false;
var notAllCorrect = false;
var selectedString="";
function addtl() {
	$("#workingArea").append('<textarea type="text" id="textInput"></textarea><br><button type="button" onclick=addTextToPreview()>add</button>');
	$("#addLineBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$('<button type="button" id="cancel" class="cancel btn btn-danger Call_Button" onclick="cancel()">Cancel <i class="glyphicon glyphicon-remove-circle"></button>').insertAfter("#addEditTitle");
	$(".cancel").css('visibility', 'visible');
}
function addTextToPreview() {
	$("#clozeData").append('<span>'+ $("#textInput").val()+' </span>');
	$("#addLineBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$("#addEditTitle").prop('disabled', false);
	$(".cancel").css('visibility', 'hidden');
	$("#workingArea").empty();
	
}
function cancel() {
	$("#workingArea").empty();
	$("#addLineBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$("#addEditTitle").prop('disabled', false);
	$(".cancel").css('visibility', 'hidden');
	$(".cancel").remove();
	if (tempnumber>1)
		tempnumber=1;

}

function addEditTitle() {
	$("#workingArea").append('<input type=text id="tempTitle"><button type="button" id="finishTitle" onclick="finishTitle()">Change Title</button>')
	$("#addLineBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$('<button type="button" id="cancel" class="cancel btn btn-danger Call_Button" onclick="cancel()">Cancel <i class="glyphicon glyphicon-remove-circle"></button>').insertAfter("#addEditTitle");
	$(".cancel").css('visibility', 'visible');
}

function finishTitle() {
	title = $("#tempTitle").val();
	$("#theTitle").empty();
	$("#theTitle").append(title);
	$("#workingArea").empty();
	$("#addLineBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$("#addEditTitle").prop('disabled', false);
	$(".cancel").remove();

}
function addch() {
	$("#addLineBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	if ($("#cancel").length == 0)
		$('<button type="button" id="cancel" class="cancel btn btn-danger Call_Button" onclick="cancel()">Cancel <i class="glyphicon glyphicon-remove-circle"></button>').insertAfter("#addEditTitle");
	$("#workingArea").append('choice '+tempnumber+'<input type="text" id="c'+tempnumber+'">');
	$("#workingArea").append('feedback <input type="text" id="f'+tempnumber+'"><BR>');
	tempnumber++;
	$(".cancel").css('visibility', 'visible');
	/*will enter if only once*/
	if ($("#addMoreChoises").length ==0) {
		$("#workingArea").append('<div id="correctAnswerNumber">Correct answer number <input type="text" id="corrAns"><BR></div>');
		$("#workingArea").append('<button type="button" id="addMoreChoises" onclick="addChoices()">add More Choice</button>');
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

function addChoices() {
	
	selectedString = document.getSelection()+'';
	var s = selectedString.split(/[^a-zA-Z]\s/);
	s.shift();
	var s2 = s[s.length-1];
	s2 = s2.substring(0,(s2.length)-1);
	s[s.length-1]=s2;
	for (var i = 0; i < s.length;i++) {
		s[i] = s[i].trim();
	}
	var word;
	for (i=0;i<s.length;i++) {
		addch();
		word = s[i];	
		if (i<s.length) {
			word = word.substring(1);
			$("#c"+(tempnumber-1)).val(word);
		}
		console.log(word);
	}

}
function addOptionsToPreview() {
	var feedback = new Array(tempnumber);
	for (i=0;i<tempnumber-1;i++) {
	var id = "f"+(i+1);
		feedback[i] = $("#"+id).val();
	}
	var x="s"+number;
	var string="";
	$("#tempdiv").append('<select id='+x+'></select> ');
	string+='<select id='+x+'></select> ';
	for (i=0;i<tempnumber;i++) {
		if (i==0) {
			$("#"+x).append('<option></option>');
			string+='<option></option>';
		}
		else {
			$("#"+x).append('<option>'+$('#c'+(i)).val()+'</option>');
			string+='<option>'+$('#c'+(i)).val()+'</option>';
		}
	}
	var realtemp = $("#tempdiv").html();
	$("#tempdiv").empty();
	var temp2 = $("#clozeData").html();
	var temp = realtemp+'<button type="button" id="check'+number+'" class="check" onclick=checkOneAnswer('+number+') ><i class="glyphicon glyphicon-search"></i></button> ';
	temp2 = temp2.replace(selectedString,temp);
	$("#clozeData").empty();
	$("#clozeData").append(temp2);
	correct_answer = $("#corrAns").val();
	CorrectAnswers[number-1]=correct_answer;
	Feedbacks[number-1]=feedback;
	cancel();
	number++;
}
/*needs to be part of the output script*/
function checkOneAnswer(qnumber) {
	number_try[qnumber-1]=number_try[qnumber-1]+1;
	var answer = $("#s"+qnumber).prop('selectedIndex');
	if (answer==null)
		return;
	if (answer==0) {
		if (!checkingAll)
			showFeedback("You must choose an answer",300,300,400,200,0);
		notAllCorrect = true;
	}
	else if (answer==CorrectAnswers[qnumber-1]){
		if (!checkingAll)
			showFeedback(Feedbacks[qnumber-1][answer-1],300,300,400,200,1);
		var answer = $("#s"+qnumber+ " option:selected").text();
		$('<span class="correct">'+answer+" "+'</span>').insertAfter("#check"+qnumber);
		$("#check"+qnumber).remove();
		$("#s"+qnumber).remove();
		if (number_try[qnumber-1]>Feedbacks[qnumber-1]) {
			number_try[qnumber-1]=1/(Feedback[qnumber-1]-1);
		}
		answered_grade[qnumber-1]=(Feedbacks[qnumber-1].length-number_try[qnumber-1])/(Feedbacks[qnumber-1].length-1);
	}
	else {
		if (!checkingAll) 
			showFeedback(Feedbacks[qnumber-1][answer-1],300,300,400,200,0);
		notAllCorrect = true;
	}

}

function grade(msg,flag) {
	var gr_per_question=100/(number-1);
	var grade=0;
	for (i=0;i<number;i++) {
		grade=grade+gr_per_question*answered_grade[i];
	}
	showFeedback(msg+"<BR>"+"Your grade is: "+Math.round(grade)+"%",300,300,300,300,flag);
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

function sendData() {
	var html = $("#clozeData").html();
	var data = { 
        "html": html,
        "feedbacks": JSON.stringify(Feedbacks),
        "correctanswers": JSON.stringify(CorrectAnswers),
        "title" : $("#theTitle").text(),
        "numOfQuestions": number,
        "fileName": $("#fileName").val()
    };
    console.log($("#theTitle").text());
    js = JSON.stringify(CorrectAnswers);
	$.post("http://0.0.0.0:4444/echoPost", data);
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

function checkAll() {

	checkingAll = true;
	for (i=0;i<number-1;i++) {

		checkOneAnswer(i+1);
	}
	checkingAll=false;
	if (notAllCorrect) {
		var msg = "Some of your answers are not correct. Try again.";
		grade(msg,0);
	}
	else {
		var msg = "Good job. You finished this exercise!";
		grade(msg,1);
	}
	
	notAllCorrect = false;
}