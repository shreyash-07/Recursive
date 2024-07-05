# import pymongo
# import gridfs

# # MongoDB Atlas connection
# client = pymongo.MongoClient('mongodb+srv://Recursive123:recursive123@recursive1.za2hlzu.mongodb.net/?retryWrites=true&w=majority&appName=Recursive1')  # Replace with your connection string
# db = client['test']  # Replace with your database name
# fs = gridfs.GridFS(db)
# print(fs)

# # Function to download a PDF from GridFS
# def download_pdf_from_gridfs(file_id, output_path):
#     grid_out = fs.get(file_id)
#     with open(output_path, 'wb') as file:
#         file.write(grid_out.read())

# # Example usage
# file_id = '66863121b5505f85a2a54f62'  # Replace with the ObjectId of the file you want to download
# output_path = 'output.pdf'  # Replace with the desired output path

# download_pdf_from_gridfs(file_id, output_path)
# print(f'PDF downloaded to {output_path}')

from pymongo import MongoClient
import gridfs
import base64

def get_database():
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://Recursive123:recursive123@recursive1.za2hlzu.mongodb.net/?retryWrites=true&w=majority&appName=Recursive1"
   
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['test']
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
   # Get the database
   dbname = get_database()
   collection=dbname["pdfdetails"]
   items=collection.find()
   for i in  items:
      file_id=i["_id"]
#    fs=gridfs.GridFS(dbname)
#    for file in fs.find():
#       print(file._id)
#    file_data=fs.get(file_id)
   #print(file_data)
document=collection.find_one({"_id":file_id})
pdf_data=document["pdf"]
file=document.get("1720070433569-medical report.pdf","report.pdf")
with open(file,"wb") as f:
   f.write(pdf_data)
