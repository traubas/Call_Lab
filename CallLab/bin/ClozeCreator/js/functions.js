var number = 1;
var tempnumber = 1;
var Feedbacks = new Array(50);
var CorrectAnswers = new Array(50);
var answered_grade = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var number_try = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var title = "";
var checkingAll = false;
var notAllCorrect = false;
var selectedString="";
var imageResult="";
var paragraph=1;
var current_button="";
var blankToEdit=-1;
/**
*Add a textarea field to the working area with a submit button.<br>
*Disables all other buttons except cancel and submit.
**/
function addtl() {
	$("#workingArea").append('<textarea type="text" id="textInput"></textarea><br><button type="button" onclick=addTextToPreview()>add</button>');
	$("#addParagraphBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$("#addImage").prop('disabled',true);
	$("#initSave").prop('disabled',true);
	$("#chooseBgColor").prop('disabled',true);
	$("#editExisting").prop('disabled',true);
	$('<button type="button" id="cancel" class="cancel btn btn-danger Call_Button" onclick="cancel()">Cancel <i class="glyphicon glyphicon-remove-circle"></button>').insertAfter("#editExisting");
}
/**
*Adds the paragraph from the textarea to a "cloze Data" div.<br>
*Replaces all blanks that are inside a pair of parentheses with buttons with the same text.<br>
*This is done so that it will be easy to choose the blanks and extract the words out of them.<br>
*inside the function variables:<br>
*<ul>
*	<li>text = the whole paragraph string</li>
*	<li>blanks = array of blanks which are strings enclosed with parentheses and starts with a number</li>
*</ul>
*we extract the blanks from the text by matching with a regex that matchs strings inside parentheses that starts with digit
**/
function addTextToPreview() {
	
	var text = $("#textInput").val();
	var blanks = text.match(/\([^()]+\)/g);

	if (blanks != null) {
		for (var i=0;i<blanks.length;i++) {
			var s = ""+blanks[i];
			if (!(s[1].match(/\d/)))
				continue;
			var id = 'p'+paragraph+'btn'+i;
			var vars = ""+s+","+id;
			var btn = '<button id="'+id+'" onclick="addChoices('+id+')" class="btn-warning" >'+s+'</button>';
			paragraph+=1;
			text = text.replace(s,btn);
		}
	}
	$("#clozeData").append('<p class="slide" contenteditable>'+ text +' </p>');
	$("#addParagraphBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$("#addEditTitle").prop('disabled', false);
	$("#addImage").prop('disabled',false);
	$("#initSave").prop('disabled',false);
	$("#editExisting").prop('disabled',false);
	$("#chooseBgColor").prop('disabled',false);
	$(".cancel").remove();
	$("#workingArea").empty();
	
}
/**
*Adds a button which on clicks open up the "Open Dialog"<br>
*and the user can choose an image to add to the cloze data.<br
*Disables all other buttons.
**/
function addImage() {
	$("#workingArea").append('<input type="file" onchange="readURL(this);" /><br><button type="button" id="addImageToCloze" onclick="addImageToCloze()">Add To Preview</button>');
	$("#addParagraphBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$("#addImage").prop('disabled',true);
	$("#addImageToCloze").prop('disabled',true);
	$("#initSave").prop('disabled',true);
	$("#chooseBgColor").prop('disabled',true);
	$("#editExisting").prop('disabled',true);
	$('<button type="button" id="cancel" class="cancel btn btn-danger Call_Button" onclick="cancel()">Cancel <i class="glyphicon glyphicon-remove-circle"></button>').insertAfter("#editExisting");

}
/**
*This function is called when user opens an image from file.<br>
*It uses FileReader class and creates a Base64 representation of the image.<br>
*The image doesn't have to be in the same folder as the html created now.<br>
*Note that the size of the image is increased by about 20%. <br>
*Since at most the user will use 1 or 2 images thats not so bad.
**/
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			imageResult = e.target.result;
		};
		reader.readAsDataURL(input.files[0]);
		$("#addImageToCloze").prop('disabled',false);
	}

}
/**
*This adds the image as Base64 to the clozeData and is shown on the preview.<br>
*Adds a border around the image and set basic height and width.<br>
*Note that iamge will be resizable later.
**/
function addImageToCloze() {
	$("#imagediv").append('<center><div id="theImage"><img id="clozeImage" class="slide" src="'+imageResult+'" width="100%" height="100%"></div></center>');
	$("#theImage").css("width","500px");
	$("#theImage").css("height","400px");
	$("#theImage").css("border","1px solid black");
	$("#workingArea").empty();
	$("#addParagraphBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$("#addEditTitle").prop('disabled', false);
	$("#addImage").prop('disabled',false);
	$("#initSave").prop('disabled',false);
	$("#chooseBgColor").prop('disabled',false);
	$("#editExisting").prop('disabled',false);
	$(".cancel").remove();
	$("#theImage").resizable();
}
/**
*This function is called whenever a cancel button is clicked.<br>
*It resets all buttons and remove unneccesary buttons on field.
**/
function cancel() {
	$("#workingArea").empty();
	$("#addParagraphBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$("#addEditTitle").prop('disabled', false);
	$("#addImage").prop('disabled',false);
	$("#initSave").prop('disabled',false);
	$("#chooseBgColor").prop('disabled',false);
	$("#editExisting").prop('disabled',false);
	$("#saveDiv").remove();
	$("#uploadfile").remove();
	$(".cancel").remove();
	if (tempnumber>1)
		tempnumber=1;

}
/**
*Function that adds an input text to the field and on click it changes the title of the cloze.
**/
function addEditTitle() {
	$("#workingArea").append('<input type=text id="tempTitle"><button type="button" id="finishTitle" onclick="finishTitle()">Change Title</button>')
	$("#addParagraphBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$("#addImage").prop('disabled',true);
	$("#initSave").prop('disabled',true);
	$("#chooseBgColor").prop('disabled',true);
	$("#editExisting").prop('disabled',true);
	$('<button type="button" id="cancel" class="cancel btn btn-danger Call_Button" onclick="cancel()">Cancel <i class="glyphicon glyphicon-remove-circle"></button>').insertAfter("#editExisting");
}
/**
* This function adds the title edited to the cloze data.
**/
function finishTitle() {
	title = $("#tempTitle").val();
	$("#theTitle").empty();
	$("#theTitle").append(title);
	$("#workingArea").empty();
	$("#addParagraphBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$("#addEditTitle").prop('disabled', false);
	$("#addImage").prop('disabled',false);
	$("#initSave").prop('disabled',false);
	$("#chooseBgColor").prop('disabled',false);
	$("#editExisting").prop('disabled',false);
	$(".cancel").remove();

}
/**
* This function adds "blank" text input and "blank" feedback input to the working area.
*@tempnumber - represents how many blank options will be. each option id will be c+"tempnumber" e.g. c1, c2...
**/
function addch() {
	$("#addParagraphBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$("#addImage").prop('disabled',true);
	$("#initSave").prop('disabled',true);
	$("#chooseBgColor").prop('disabled',true);
	$("#editExisting").prop('disabled',true);
	if ($("#cancel").length == 0)
		$('<button type="button" id="cancel" class="cancel btn btn-danger Call_Button" onclick="cancel()">Cancel <i class="glyphicon glyphicon-remove-circle"></button>').insertAfter("#editExisting");
	$("#workingArea").append('choice '+tempnumber+'<input type="text" id="c'+tempnumber+'">');
	$("#workingArea").append('feedback <input type="text" id="f'+tempnumber+'"><BR>');
	tempnumber++;
	$(".cancel").css('visibility', 'visible');
	/*will enter if only once*/
	if ($("#aotp").length ==0) {
		$("#workingArea").append('<div id="correctAnswerNumber">Correct answer number <input type="text" id="corrAns"><BR></div>');
		$("#workingArea").append('<button type="button" id="aotp" onclick="addOptionsToPreview()">submit</button>');
	}
	else {
		$("#aotp").remove();
		$("#correctAnswerNumber").remove();
		$("#workingArea").append('<div id="correctAnswerNumber">Correct answer number<input type="text" id="corrAns"><BR></div>');
		$("#workingArea").append('<button type="button" id="aotp" onclick="addOptionsToPreview()">submit</button>');

	}
	
}
function openSaveOptions() {
	$("#addParagraphBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$("#addImage").prop('disabled',true);
	$("#initSave").prop('disabled',true);
	$("#chooseBgColor").prop('disabled',true);
	$("#editExisting").prop('disabled',true);
	$('<div id="saveDiv"><h2 id="chooseName" class="savefile">Choose a file name</h2><BR><input type="text" id="fileName" /><BR><button type="button" id="sendData" class="btn btn-danger Call_Button" onclick="sendData()">send data</button></div>').insertAfter("#editExisting");
	$('<button type="button" id="cancel" class="cancel btn btn-danger Call_Button" onclick="cancel()">Cancel <i class="glyphicon glyphicon-remove-circle"></button>').insertAfter("#saveDiv");
}
function addChoices(btnId) {
	selectedString = $("#"+btnId.id).text();
	current_button=btnId.id;
	
	var s = selectedString.split(/[^a-zA-Z]\s/);
	s.shift();
	if (s.length==1) {
		var word = s[0];
		word = word.split(/\s[^a-zA-Z]/);
		s=word;
	}
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
			$("#c"+(tempnumber-1)).val(word);
		}
	}
	var top = $("body").offset().top;
    $("html, body").animate({ scrollTop: top }, 1000);

}
function addOptionsToPreview() {
	var feedback = new Array(tempnumber);
	for (i=0;i<tempnumber-1;i++) {
	var id = "f"+(i+1);
		feedback[i] = $("#"+id).val();
	}
	var x="s"+number;
	if (blankToEdit>-1) {
		x = "s"+blankToEdit;
	}
	var string="";
	correct_answer = $("#corrAns").val();
	console.log("#"+x+ "is the one");
	if ($("#"+x).length==0) { //blank does not exist yet
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
		var temp = realtemp+'<button type="button" id="check'+number+'" class="check" onclick=editBlank('+number+') ><i class="glyphicon glyphicon-search"></i></button> ';
		$(temp).insertAfter("#"+current_button);
		$("#"+current_button).remove();
		CorrectAnswers[number-1]=correct_answer;
		Feedbacks[number-1]=feedback;
		number++;
	} else { //editing exisiting blank
		var i = 0;
		console.log("#s"+blankToEdit +" option");
		$("#s"+blankToEdit +" option").each(function() {

			if (i>0) {
				 $(this).text($("#c"+i).val()).val($("#c"+i).val());
			}
			i++;
		});
		CorrectAnswers[blankToEdit-1]=correct_answer;
		Feedbacks[blankToEdit-1]=feedback;
		blankToEdit=-1;
	}
	cancel();
	
}
function editBlank(blankNumber) {
	var i=0;
	blankToEdit=blankNumber;
	$("#s"+blankNumber +" option").each(function() {
		if (!($(this).val().length == 0)) {
			addch();
			$("#c"+i).val($(this).val());
			$("#f"+i).val(Feedbacks[blankNumber-1][i-1]);
			$("#corrAns").val(CorrectAnswers[blankNumber-1]);
		}
		i++;

	});
}
/*needs to be part of the output script*/
function checkOneAnswer(qnumber) {
	
	var answer = $("#s"+qnumber).prop('selectedIndex');
	if (answer==null)
		return;
	if (answer==0) {
		if (!checkingAll)
			showFeedback("You must choose an answer",300,300,400,200,0);
		notAllCorrect = true;
	}
	else if (answer==CorrectAnswers[qnumber-1]){
		number_try[qnumber-1]=number_try[qnumber-1]+1;
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
		number_try[qnumber-1]=number_try[qnumber-1]+1;
		if (!checkingAll) 
			showFeedback(Feedbacks[qnumber-1][answer-1],300,300,400,200,0);
		notAllCorrect = true;
	}

}

function grade(msg,flag) {
	var gr_per_question=100/(number-1);
	var grade=0;
	for (var i=0;i<answered_grade.length;i++) {
		console.log(answered_grade[i]);
	}
	for (i=0;i<number;i++) {
		if (answered_grade[i]>0)
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
	$("#modal").css("display" , "block")
	fb = document.getElementById('feedback_content');
	feedback_content.innerHTML=
	"<br><center><table cellpadding=15><tr><td>"+feedback+"</tr></td></table></center><br>";
	if (flag==1) {
		$(".modal-content").css({'background-color': '#00ff1d'});
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
	number = $("select").length;
	for (i=0;i<50;i++) {
			$("#check"+i).attr("onclick","checkOneAnswer("+i+")");
		}
	var html = $("#clozeData").html();
	var data = { 
        "html": html,
        "feedbacks": JSON.stringify(Feedbacks),
        "correctanswers": JSON.stringify(CorrectAnswers),
        "title" : $("#theTitle").text(),
        "numOfQuestions": number,
        "fileName": $("#fileName").val(),
        "image": imageResult,
        "bgcolor": $("body").css("background-color")
    };
    console.log($("#theTitle").text());
    js = JSON.stringify(CorrectAnswers);
	$.post("http://localhost:8080/ClozeCreationPostHandler", data);
	for (i=0;i<50;i++) {
			$("#check"+i).attr("onclick","editBlank("+i+")");
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

function openColorSpectrum() {
	$("<div id='backgroundColor'><h2 class='savefile'>Background Color: </h2><br><input type='color' id='bgColor' value='#fac564' /><br><button type='button' onclick='changeBgColor()'>Apply</button><button type='button' onclick='closeColor()'>Close</button></div>").insertAfter("#editExisting");
	$("#chooseBgColor").prop('disabled',true);
	$("#addParagraphBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$("#addImage").prop('disabled',true);
	$("#initSave").prop('disabled',true);
	$("#editExisting").prop('disabled',true);

}
function changeBgColor() {
	var color = $("#bgColor").prop("value");
	$("body").css("background-color",color);
}
function closeColor() {
	$("#backgroundColor").remove();
	$("#chooseBgColor").prop('disabled',false);
	$("#addParagraphBtn").prop('disabled', false);
	$("#addChoice").prop('disabled', false);
	$("#addEditTitle").prop('disabled', false);
	$("#addImage").prop('disabled',false);
	$("#initSave").prop('disabled',false);
	$("#editExisting").prop('disabled',false);
}

function openExisting() {
	$("#chooseBgColor").prop('disabled',true);
	$("#addParagraphBtn").prop('disabled', true);
	$("#addChoice").prop('disabled', true);
	$("#addEditTitle").prop('disabled', true);
	$("#addImage").prop('disabled',true);
	$("#initSave").prop('disabled',true);
	$("#editExisting").prop('disabled',true);
	$('<div id="uploadfile"><input type="file" id="fileToUpload"><br><button type="button" id="upfile" onclick="uploadFile()">Add</button><div>').insertAfter("#editExisting");
	$('<button type="button" onclick="cancel()">Close</button>').insertAfter("#upfile");
}
/*
*Creates a FileReader object to read file from the input file field.
*Creates a callback function for the filereader object that is called when the object reads the file and finishes loading it.
*Searches the clozeData only that we want to edit and adds it to the preview clozeData div.
*/
function uploadFile() {
	var myFile = $('#fileToUpload').prop('files')[0];
	var fr = new FileReader();
	fr.onload = function(e) {
		var x = e.target.result;
		var y = $('<div />').append(x).find('#clozeData').html();
		$("#clozeData").append(y);


		//get Feedbacks
		var z = ""+x.match(/Feedbacks.*\]/);
		z = z.split(/\=\s/);
		var w = JSON.parse(z[1]);
		Feedbacks = w;


		//get corrAns
		var ca = ""+x.match(/CorrectAnswers.*\]/);
		ca = ca.split(/\=\s/);
		w = JSON.parse(ca[1]);
		CorrectAnswers = w;

		var h = $('<div />').append(x).find('#clozeTitle').text();
		console.log(h);
		$("#theTitle").append(h);
		
		$("#checkAllButton").remove(); //don't need those buttons. they are added in the template.
		$("#checkAllButton2").remove();
		for (i=0;i<50;i++) {
			$("#check"+i).attr("onclick","editBlank("+i+")");
		}
		cancel();
		
	}
	fr.readAsText(myFile);
}




