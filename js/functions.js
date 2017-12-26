var number=1;
var tempnumber=1;
function addtl() {
	$("#workingArea").append('<input type="text" id="textInput"><button type="button" onclick=addToPreview()>add</button>');
}
function addToPreview() {
	$("#clozeData").append('<span>'+ $("#textInput").val()+'<span>');
	$("#workingArea").empty();
}
function addch() {
	$("#workingArea").append('choice '+tempnumber+'<input type="text" id="c'+tempnumber+'">');
	$("#workingArea").append('feedback <input type="text" id="f'+tempnumber+'"><BR>');
	tempnumber++;
	if ($("#addChoises").length ==0) {
		$("#workingArea").append('<button type="button" id="addChoises">add Choice</button>');
	}
	else {
		$("#addChoises").remove();
		$("#workingArea").append('<button type="button" id="addChoises">add Choice</button>');
	}
}
