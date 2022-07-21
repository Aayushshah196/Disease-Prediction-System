from typing import Union
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
import uvicorn
import joblib

BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH/"templates"))

app = FastAPI()

app.mount("/static", StaticFiles(directory=str(BASE_PATH/"static")), name="static")


# decision_tree, random_forest, logistic_regression, knn, naive_bayes 
MODEL_PATH = BASE_PATH.parent
MODELS = [ joblib.load(str(MODEL_PATH/"model/DecisionTree")),
            joblib.load(str(MODEL_PATH/"model/RandomForest")),
            joblib.load(str(MODEL_PATH/"model/LogisticRegression")),
            joblib.load(str(MODEL_PATH/"model/KNN")),
            joblib.load(str(MODEL_PATH/"model/NaiveBayes"))]

SYMPTOMS = [' loss_of_balance', ' vomiting', ' fatigue', ' joint_pain', ' headache',
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

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return TEMPLATES.TemplateResponse("ModelResult.html", {})


@app.get("/predict")
async def predictionForm(request: Request):
    return TEMPLATES.TemplateResponse("PredictionForm.html", {})



@app.post("/predict")
async def predict(request: Request, model: int = Form(), symptoms: list = Form()):
    data = [0]*len(SYMPTOMS)
    for sym in symptoms:
        data[int(sym)] = 1
    predicted_disease = MODELS[model].predict([data])[0]

    return TEMPLATES.TemplateResponse("PredictionForm.html", {"symptoms":[SYMPTOMS[int(i)] for i in symptoms],"predicted_disease": predicted_disease})


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
