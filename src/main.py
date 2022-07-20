from typing import Union

from sklearn import naive_bayes

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from pathlib import Path
from pydantic import BaseModel
import uvicorn
import joblib

import pickle

BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH/"templates"))

class SearchItem(BaseModel):
    symptoms: list
    model: int

app = FastAPI()

app.mount("/static", StaticFiles(directory=str(BASE_PATH/"static")), name="static")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# decision_tree, random_forest, logistic_regression, knn, naive_bayes 
MODEL_PATH = BASE_PATH.parent
models = [ joblib.load(str(MODEL_PATH/"models/DecisionTree")),
            joblib.load(str(MODEL_PATH/"models/RandomForest")),
            joblib.load(str(MODEL_PATH/"models/LogisticRegression")),
            joblib.load(str(MODEL_PATH/"models/KNN")),
            joblib.load(str(MODEL_PATH/"models/NaiveBayes"))]


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return TEMPLATES.TemplateResponse("ModelResult.html", {"request": request})


@app.get("/predict")
async def predictionForm(request: Request):
    return TEMPLATES.TemplateResponse("PredictionForm.html", {"request": request})



@app.post("/predict")
async def predict(request: Request):#, search:SearchItem):
    # symptoms = search.symptoms
    symptoms = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0]
    # model_idx = search.model if search.model<len(models) else 0
    model_idx=2
    predicted_disease = models[model_idx].predict([symptoms])[0]

    return {"predicted_disease": predicted_disease}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
