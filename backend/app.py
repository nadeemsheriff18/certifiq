import os
from flask import Flask, request
from flask_cors import CORS
import pandas as pd
from PIL import Image, ImageDraw, ImageFont

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def generate_certificates():
    if 'file' not in request.files:
        return {'error': 'No file part'}, 400

    file = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'uploaded_excel.xlsx')
    file.save(file_path)

    data = pd.read_excel(file_path)
    data.columns = data.columns.str.strip()

    if 'Name' not in data.columns or 'Roll no' not in data.columns or 'Department' not in data.columns:
        return {'error': 'Missing required columns (Name, Roll no, Department)'}, 400

    for _, row in data.iterrows():
        name = row['Name']
        roll_number = row['Roll no']
        department = row['Department']
        year = row.get('Year', 'N/A')  # Handle 'Year' as optional

        # Certificate dimensions and background color
        img = Image.new('RGB', (3508, 2480), color='white')
        draw = ImageDraw.Draw(img)

        # Fonts (change path if necessary)
        try:
            font_title = ImageFont.truetype("arialbd.ttf", 120)
            font_subtitle = ImageFont.truetype("arial.ttf", 80)
            font_details = ImageFont.truetype("arial.ttf", 60)
            font_message = ImageFont.truetype("arial.ttf", 48)
            font_info = ImageFont.truetype("arialbd.ttf", 60)
        except IOError:
            font_title = font_subtitle = font_details = font_message = font_info = ImageFont.load_default()

        # Top and bottom bars
        draw.rectangle([0, 0, 3508, 200], fill="#0047ab")
        draw.rectangle([0, 2300, 3508, 2480], fill="#ff5400")

        # Certificate title and subtitle
        draw.text((1754, 250), "CERTIFICATE", font=font_title, fill="white", anchor="mm")
        draw.text((1754, 500), "OF APPRECIATION", font=font_subtitle, fill="black", anchor="mm")

        # Recipient and message
        draw.text((1754, 850), "This certificate is proudly presented to", font=font_details, fill="black", anchor="mm")
        draw.text((1754, 1000), name, font=font_subtitle, fill="black", anchor="mm")
        
        message_text = (
            "In recognition of your dedication and valued contribution to our event.\n"
            "We deeply appreciate your commitment and efforts."
        )
        draw.multiline_text((1754, 1150), message_text, font=font_message, fill="black", anchor="mm", align="center")

        # Divider line under the name
        draw.line((700, 1070, 2800, 1070), fill="black", width=3)

        # Additional details: Roll Number, Department, Year
        draw.text((1000, 1350), f"Roll Number: {roll_number}", font=font_info, fill="black")
        draw.text((1000, 1450), f"Department: {department}", font=font_info, fill="black")
        draw.text((1000, 1550), f"Year: {year}", font=font_info, fill="black")

        # Signatures section
        draw.text((600, 2000), "Signature 1", font=font_details, fill="black")
        draw.text((2400, 2000), "Signature 2", font=font_details, fill="black")
        draw.line((600, 2050, 1400, 2050), fill="black", width=3)  # Line under Signature 1
        draw.line((2400, 2050, 3200, 2050), fill="black", width=3)  # Line under Signature 2

        # Save the certificate
        output_filename = os.path.join(app.config['UPLOAD_FOLDER'], f"certificate_{roll_number}.png")
        img.save(output_filename)

    return {'message': 'Certificates generated successfully'}, 200

if __name__ == '__main__':
    app.run(debug=True)
