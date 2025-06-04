import os
import requests
import pandas as pd
import joblib
import hashlib
import io
from sklearn.linear_model import SGDRegressor
from sklearn.metrics import mean_absolute_error

OWNER = 'kevinloi142'
REPO = 'MassEvac'
FOLDER = 'output'
MODEL_PATH = 'model.pkl'
PROCESSED_FILES_PATH = 'processed_files.txt'

def list_csv_files():
    url = f'https://api.github.com/repos/{OWNER}/{REPO}/contents/{FOLDER}'
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"GitHub API Error: {response.status_code}")
    files = response.json()
    csv_files = [f for f in files if f['name'].endswith('.csv')]
    return csv_files

def load_processed_files():
    if not os.path.exists(PROCESSED_FILES_PATH):
        return set()
    with open(PROCESSED_FILES_PATH, 'r') as f:
        return set(line.strip() for line in f)

def save_processed_file(filename):
    with open(PROCESSED_FILES_PATH, 'a') as f:
        f.write(f"{filename}\n")

def download_csv(url):
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to download {url}")
        return None
    return pd.read_csv(io.StringIO(response.content.decode('utf-8')))

def load_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    return SGDRegressor()

def update_model(model, X, y):
    model.partial_fit(X, y)
    joblib.dump(model, MODEL_PATH)
    return model

def evaluate(model, X, y):
    preds = model.predict(X)
    mae = mean_absolute_error(y, preds)
    print(f'MAE: {mae:.2f}')
    print('First 5 predictions:', preds[:5])
    print('First 5 actual values:', y.iloc[:5].values)

def main():
    processed = load_processed_files()
    files = list_csv_files()
    new_files = [f for f in files if f['name'] not in processed]

    if not new_files:
        print("No new files to process.")
        return

    model = load_model()

    for file in sorted(new_files, key=lambda x: x['name']):
        print(f"Processing {file['name']}...")
        df = download_csv(file['download_url'])
        if df is None:
            continue

        try:
            model = update_model(model, X, y)
            evaluate(model, X, y)
            save_processed_file(file['name'])
        except Exception as e:
            print(f"Error processing {file['name']}: {e}")

if __name__ == "__main__":
    main()
