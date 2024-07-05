import PyPDF2

def extract_text_from_pdf(pdf_file):
  reader = PyPDF2.PdfReader(pdf_file)
  text = ""
  for page in reader.pages:
    text += page.extract_text()
  return text

# Example usage
with open("C:\\Users\\jatin\\Downloads\\medical report.pdf", 'rb') as f:  # Replace with the path to your PDF file
  extracted_text = extract_text_from_pdf(f)
