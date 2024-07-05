import google.generativeai as genai
from med import extracted_text
genai.configure(api_key="API_KEY")

model = genai.GenerativeModel(model_name="gemini-1.5-flash")
response = model.generate_content("analyse the text and separate normal results from abnormal results in two different tables and also give suggestions on how to bring the abnormal results to normal range in simple words for a layman understanding"+ extracted_text)
ai_response = response.text
file_path = 'ai_response.txt'
with open(file_path, 'w') as file:
    file.write(ai_response)
