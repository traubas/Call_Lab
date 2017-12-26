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
	$("#workingArea").append('feedback <input type="text" id="feedback'+number+''+tempnumber+'"><BR>')
	tempnumber++;
}
