var sentenceNumber = 0;
var blankNumber = 0;
var sentenceEdited = 0;
function createSentence() {
	$("#sentencesArea").append('<div id="sent'+(sentenceNumber+1)+'">'+(sentenceNumber+1)+'. <input type="text" class="mySentence" placeholder="Enter your sentence here" id="sentence'+(sentenceNumber+1)+'">'+
		'<button type=button id="confirm'+(sentenceNumber+1)+'" onclick="confirmSentence('+(sentenceNumber+1)+')">confirm</button></div');
	sentenceNumber++;
}

function confirmSentence(number) {
	var sText = $("#sentence"+number).val();
	$("#sent"+number).remove();
	$("#confirm"+number).remove();
	$("#sentencesArea").append('<div id="sent'+number+'" >'+number+'. <span id="sentence'+number+'">' +sText+'</span><button type=button class="editSentence" onclick="editSentence('+number+')">edit</button>'+
		'<button type=button class="addBlank" onclick="addBlank('+(blankNumber+1)+','+number+')">add blank</button><br></div>'
		);
}
function editSentence(number) {
	var sText = $("#sentence"+number).text();
	$("#sent"+number).remove();
	$("#sentencesArea").append('<div id="sent'+number+'">'+number+'. <input type="text" class="mySentence" id="sentence'+number+'" value="'+sText+'">'+
		'<button type=button id="confirm'+number+'"onclick="confirmSentence('+number+')">confirm</button></div');
}

function addBlank(number,se) {
	var text = getSelText();
	if (text == undefined || text == null || text.length == 0) {
		alert("no text chosen");
	}
	if (sentenceEdited == 0) {
		$("#theSentences").append("Adding blank to sentence "+se);
		$("#theSentences").append('<br><button class="cancel" onclick="cancel()">Cancel</button>');	
	}
	else {
		alert("Already editing.")
	}
	sentenceEdited = se;
}

function cancel() {
	sentenceEdited = 0;
	$("#theSentences").empty();
}

function getSelText()
{
    var txt = '';
     if (window.getSelection)
    {
        txt = window.getSelection();
             }
    else if (document.getSelection)
    {
        txt = document.getSelection();
            }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
            }
    else return;
return txt.toString();
}
