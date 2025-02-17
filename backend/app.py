from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    file_path = 'uploaded_file.xlsx'
    file.save(file_path)

    # Load Excel file and extract details
    data = pd.read_excel(file_path)
    data.columns = data.columns.str.strip()

    if 'Name' not in data.columns or 'Roll no' not in data.columns or 'Department' not in data.columns:
        return jsonify({'error': 'Missing required columns (Name, Roll no, Department)'}), 400

    # Extract details (you can customize this logic as needed)
    certificates_data = data.to_dict(orient='records')

    # Send extracted data to frontend
    return jsonify({'certificates_data': certificates_data}), 200

if __name__ == "__main__":
    app.run(debug=True)
