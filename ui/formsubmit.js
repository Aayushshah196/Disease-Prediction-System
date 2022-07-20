
const data_form = document.querySelector('#sign-up');
// form.addEventListener('submit', handleData);



//this part dynamically populates symptoms from the list to create checkbox
const input_symptoms = ['fever','cold','cough','difficulty_breathing'];
const sym_group=document.querySelector('#symptom-checkboxes');

for (var i = 0; i < input_symptoms.length; i++) {

	// <input type="checkbox" name="langs" id="langs_perl" value="Perl"> <label for="langs_perl">Perl</label>


    var checkBoxdiv = document.createElement("div");
	checkBoxdiv.innerHTML=`<input type="checkbox" name="symptoms" id="${input_symptoms[i]}" value="${input_symptoms[i]}"> <label for="${input_symptoms[i]}">${input_symptoms[i]}</label>`;
	sym_group.appendChild(checkBoxdiv);
    
}



//this part handles the submitted symptoms from the list
const symptoms =[]
data_form.addEventListener('submit', (e)=>{
	e.preventDefault();
	
	var form_data = new FormData(data_form);
    console.log("form data: ");
	console.log(form_data.entries());
    for(var pair of form_data.entries()) 
    {
		symptoms.push(pair[1]);
    }
	// document.getElementById("checkbox").checked = false;
	console.log(symptoms);

	var checkboxes =document.getElementsByName("symptoms");
	for (var checkbox of checkboxes) {
        checkbox.checked = false;
    }
    return true;
	
});



// function handleData()
// {
//     var form_data = new FormData(document.querySelector("form"));
//     console.log("form data: ");
//     for(var pair of form_data.entries()) 
//     {
//         console.log(pair[0]+ ' : '+ pair[1]);
//     }
//     return true;
// }