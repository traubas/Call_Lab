var number=1;
var tempnumber=1;
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
	$("#clozeData").append('<select id='+x+'></select>');
	for (i=0;i<tempnumber;i++) {
		console.log($('#c'+(i+1)).val());
		if (i==0)
			$("#"+x).append('<option></option>');
		else
			$("#"+x).append('<option>'+$('#c'+(i)).val()+'</option>');
	}
	correct_answer = $("#corrAns").val();
	cancel();
}
