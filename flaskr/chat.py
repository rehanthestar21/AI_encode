from flask import (
    Blueprint, render_template, request, session, jsonify, Response
)
from werkzeug.utils import secure_filename
import boto3
import uuid

import json
import os

from . import llm_agent



bp = Blueprint('chat', __name__, url_prefix='/chat')

import json
with open('flaskr/static/loan_process.json') as json_file:
    loan_process = json.load(json_file)

agent = llm_agent.LLMAgent(loan_process)

@bp.route('/', methods=('POST', 'GET'))
def chat():
    filename = None
    url = None
    # Handle POST requests
    if request.method == 'POST':

        # Handle JSON data
        json_data = request.form.get('json_data')
        if json_data:
            data = json.loads(json_data)
            prompt = data.get('prompt', '')

        if prompt == "":
            return "Stop sending me empty strings!"
        
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                filename, url = get_file(file)
                print("FILENAME IS: " + filename)
                print("URL IS: " + url)


        print("Prompt: " + prompt)
        def stream():
            return agent.run(prompt)
                    
        return Response(stream(), content_type='text/plain; charset=utf-8')
    


    return render_template('chat/chat.html')



def get_file(file):
    original_filename = secure_filename(file.filename)
    file_extension = os.path.splitext(original_filename)[1]

    unique_filename = str(uuid.uuid4()) + file_extension
    
    file_path = os.path.join('tmp', unique_filename)
    file.save(file_path)

    # Upload to S3 with public read access
    s3 = boto3.client('s3', region_name='eu-west-2',
        aws_access_key_id='AKIA6GBMCMNW2BDA4VNB',
        aws_secret_access_key='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'
    )
    bucket_name = 'gyanai'
    s3.upload_file(file_path, bucket_name, unique_filename, ExtraArgs={'ACL': 'public-read'}
    )
    
    print("FILE UPLOAD STARTING: " + unique_filename)
    

    file_url = f"http://{bucket_name}.s3.amazonaws.com/{unique_filename}"      

    print("FILE UPLOADED: " + file_url)

    return original_filename, file_url         

