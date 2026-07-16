# Aashiyana — House Price Prediction (Delhi NCR)

An end-to-end machine learning pipeline that predicts house prices in Delhi NCR, wrapped in a Flask web app with price prediction, EMI calculator, loan eligibility, and budget planning tools.

## Project Overview

This project:
- Loads and cleans a raw dataset of 39,000+ Delhi NCR property listings
- Engineers features (total rooms, bed/bath ratio, parking/lift/balcony flags)
- Trains and compares Linear Regression, Random Forest, and XGBoost regressors
- Selects the best model by test R² and saves it for inference
- Serves predictions through a Flask web app with a full front-end (search, filters, map view, calculators, auth)

## Dataset

- **Raw data:** 39,385 listings (`Delhi_v2.csv`)
- **After cleaning** (missing values, outlier removal): **7,435 listings** used for training/testing
  - Train: 5,948 rows
  - Test: 1,487 rows

## Model Performance (verified, actual run output)

| Model | Test RMSE | Test R² |
|---|---|---|
| **Random Forest (selected model)** | ₹242,368 | **0.9978** |
| XGBoost | ₹339,024 | 0.9957 |
| Linear Regression | ₹1,116,933 | 0.9531 |

Random Forest was selected and saved as `house_price_model.pkl`.

**Note on R²:** The R² here is very high because `Price_sqft` is included as an input feature, and since `price ≈ area × Price_sqft`, the model is partly reconstructing price from a feature closely tied to price itself. This is expected behavior for this feature set, not an error — worth knowing if asked about it.

## Project Structure

```
├── Delhi_v2.csv              # Raw dataset
├── data_preprocessing.py     # Cleaning + feature engineering
├── model_training.py         # Trains & compares models
├── predict.py                 # Prediction interface
├── utils.py                   # Shared helper functions
├── main.py                    # Runs the full pipeline end-to-end
├── house_price_model.pkl      # Saved best model
├── app.py                     # Flask web app
├── templates/, static/        # Web front-end
└── DEPLOYMENT.md               # Deployment guide
```

## Quick Start

```bash
pip install -r requirements.txt
python main.py          # run the ML pipeline
python app.py            # run the web app
```

## Web App Features

- Property search with filters and map view
- Price prediction form backed by the trained model
- EMI calculator, loan eligibility checker, budget planner
- User authentication (login/signup)

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Docker and Railway deployment steps.

## License

Provided as-is for educational and portfolio use.

---
**Built with Python, scikit-learn, and XGBoost**
