function CreateSyllabus(){
	var bt = document.getElementById("bigTest").value;
	var second_table = document.getElementById("second-table");
	var headline = second_table.getElementsByClassName("headline")[0];
	var title_grade = second_table.getElementsByClassName("title-grade")[0];
	var table_body = second_table.getElementsByClassName("table-body")[0];
	
	while(table_body.lastChild && table_body.childElementCount != 2){
		table_body.removeChild(table_body.lastChild);
	}
	var assign  = headline.children[0].children[0];
	var per = headline.children[0].children[1];
	assign.innerHTML = document.getElementsByClassName("assignment")[0].value;
	per.innerHTML = "Percentage : "+ document.getElementsByClassName("percentage")[0].value+"%";
	title_grade .children[0].children[0].innerHTML = assign.innerHTML+"1";

	if (bt <=15){
		var number_miniTest = document.getElementsByClassName("smallTest")[0].value;
		for(var n = 1; n< number_miniTest; n++){
			var clone_title_grade = title_grade.cloneNode(true);
			clone_title_grade .children[0].children[0].innerHTML = assign.innerHTML +parseInt(n+1);
			var test_score = clone_title_grade.children[1].children[0];
			test_score.setAttribute("oninput","test_score(0)");
			table_body.appendChild(clone_title_grade);
		}
		for (var i = 1; i < bt ; i++){
			var clone_headline = headline.cloneNode(true);
			var assign  = clone_headline.children[0].children[0];
			var per = clone_headline.children[0].children[1];			
			assign.innerHTML = document.getElementsByClassName("assignment")[i].value;
			per.innerHTML = "Percentage : "+ document.getElementsByClassName("percentage")[i].value+"%";
			table_body.appendChild(clone_headline);
			var clone_title_grade = title_grade.cloneNode(true);
			clone_title_grade .children[0].children[0].innerHTML = assign.innerHTML + "1";
			var test_score = clone_title_grade.children[1].children[0];
			test_score.setAttribute("oninput","test_score("+i+")");
			table_body.appendChild(clone_title_grade);
			var number_miniTest = document.getElementsByClassName("smallTest")[i].value;
			
			for(var j = 1; j < number_miniTest; j++){
				var clone_title_grade = title_grade.cloneNode(true);
				clone_title_grade .children[0].children[0].innerHTML = assign.innerHTML +parseInt(j+1);
				var test_score = clone_title_grade.children[1].children[0];
				test_score.setAttribute("oninput","test_score("+i+")");
				table_body.appendChild(clone_title_grade);
			}
		}
		second_table.style.display = "block";
	}
}

function test_score(n){
	n = parseInt(n);
	var test_array = [];
	var second_table = document.getElementById("second-table");
	var title_grade = second_table.getElementsByClassName("headline")[n];
	var number_miniTest = document.getElementsByClassName("smallTest")[n].value;
	var list_miniTest = document.getElementsByClassName("list_miniTest")[n];

	for (var i = 0 ; i < number_miniTest; i++){
		var title_grade = title_grade.nextElementSibling;
		var score = title_grade.children[1].children[0];
		if (score.style.color == "red"){
			test_array.push("");
		}
		else
			test_array.push(score.value);
	}
	return test_array;
}

function CreateBigTest(){
	var original = document.getElementsByClassName("default")[0];
	var per = document.getElementsByClassName("percentage")[0];
	var bt = document.getElementById("bigTest").value;
	var con = document.getElementById("content");
	var percent_each_test = 100/bt;
	per.value = percent_each_test;
	
	while (con.lastChild && con.childElementCount!=1){
		con.removeChild(con.lastChild);
	}
	
	if (bt <= 15){
		for (var i = 1; i <bt ; i++){	
			// var original = document.getElementsByClassName("default")[0];
			var clone = original.cloneNode(true); 
			// clone.getElementsByTagName("p")[0].innerHTML = "Assignment "+(i+1);
			con.appendChild(clone);
			var per = document.getElementsByClassName("percentage")[i];
			var miniTest = document.getElementsByClassName("smallTest")[i];
			var n = i;
			miniTest.setAttribute("oninput","createTest("+n+")");
			// per.setAttribute("oninput","Grade_and_percentage("+n+")");
			per.setAttribute("value", percent_each_test);
		}
	}
}

function Grade_and_percentage(n){
	n = parseInt(n);
	var percentage = document.getElementsByClassName("percentage")[n].value;
	var grade_and_percentage = [];
	var array = test_score(n);
	var denominator = 0;
	var total = 0;

	for (var i = 0; i < array.length; i++){
		if (array[i] != "")
		{
			denominator +=1;
			total += parseFloat(array[i]);
		}
	}
	var final_grade = total/denominator;
	grade_and_percentage.push(final_grade);
	grade_and_percentage.push(percentage);
	// document.getElementsByClassName("current-grade")[n].innerHTML = final_grade;
	return grade_and_percentage;
}


function GPA_grade(){
	var bt = document.getElementById("bigTest").value;
	var percent_total = 0;
	var grade_percent =[];
	var gpa = 0;
	for (var i =0; i< bt ; i ++){
		var array = Grade_and_percentage(i);
		percent_total += parseInt(array[1]);
	}

	for (var i = 0 ; i <bt; i++){
		var grade_percent = Grade_and_percentage(i);
		gpa += grade_percent[0]*grade_percent[1]/percent_total;
	}	
	document.getElementById("final_grade").innerHTML = gpa;
}

function Estimate(){
	var bt = document.getElementById("bigTest").value;
	var goal = document.getElementById("goal").value;
	var current_test_score = 0
	var estimate_percentage = 0
	for (var i = 0; i < bt; i++){
		var per = document.getElementsByClassName("percentage")[i].value/100;
		var unknow = 0
		var test_array = test_score(i);
		var per_each_test = per/test_array.length;
		for (var n = 0; n < test_array.length; n++){
			if (test_array[n] ==""){
				unknow += 1;
			}
			else
				current_test_score += parseInt(test_array[n])*per_each_test;
		}
		estimate_percentage += unknow*per_each_test;
	}
	if (estimate_percentage != 0){
		var estimate_score = ((parseInt(goal)-current_test_score))/estimate_percentage;
		if (estimate_score > 100){
			document.getElementById("warning").innerHTML = "YOU WILL NEVER REACH YOUR GOAL LOL!";
			return;
		}
		estimate_score = estimate_score.toString();
	}
	else{
		document.getElementById("warning").innerHTML = "YOU DONT HAVE ANY TEST LEFT TO ESTIMATE";
		return;
	}
	for (var i = 0; i < bt ; i++ ){
		var title_grade = document.getElementsByClassName("headline")[i];
		var number_miniTest = document.getElementsByClassName("smallTest")[i].value;
		for (var n = 0 ; n < number_miniTest; n++){
			var title_grade = title_grade.nextElementSibling;
			var score = title_grade.children[1].children[0];
			if (score.value == "" || score.style.color == "red"){
				score.value = estimate_score;
				score.style.color = "red";
			}
		}
	}
}