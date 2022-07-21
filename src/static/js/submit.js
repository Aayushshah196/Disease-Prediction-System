
//this part dynamically populates symptoms from the list to create checkbox
const input_symptoms = [' loss_of_balance', ' vomiting', ' fatigue', ' joint_pain', ' headache',
' diarrhoea', 'itching', ' muscle_weakness', ' passage_of_gases',
' weakness_of_one_body_side', ' mild_fever', ' blackheads',
' patches_in_throat', ' blurred_and_distorted_vision', ' nausea',
' swollen_blood_vessels', ' fluid_overload', ' coma', ' belly_pain',
' breathlessness', ' back_pain', ' pain_in_anal_region', ' skin_rash',
' family_history', ' sweating', ' dark_urine', ' nodal_skin_eruptions',
' sunken_eyes', ' red_spots_over_body', ' lack_of_concentration',
' shivering', ' stiff_neck', ' high_fever', ' swelled_lymph_nodes',
' stomach_pain', ' hip_joint_pain', ' silver_like_dusting',
' receiving_unsterile_injections', ' abnormal_menstruation', ' blister',
' burning_micturition']

const sym_group=document.querySelector('#symptom-checkboxes');

for (var i = 0; i < input_symptoms.length; i++) {
    var checkBoxdiv = document.createElement("div");
	checkBoxdiv.className="form-group";
	checkBoxdiv.innerHTML=`<input type="checkbox" name="symptoms" id="${input_symptoms[i]}" value="${i}"> <label for="${input_symptoms[i]}">${input_symptoms[i]}</label>`;
	sym_group.appendChild(checkBoxdiv);   
}