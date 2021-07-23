from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from datetime import datetime, date
import os
import azure.cognitiveservices.speech as speechsdk

import exams, patient
import auxiliares
from db_create import init_db, create_connection, create_exam_patient

if not os.path.exists('database.db'):
    init_db()

app = Flask(__name__)
CORS(app)


@app.route("/createExam", methods=['POST', 'GET'])
def createExam():
    if request.method == 'POST':
        return exams.createExam()
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route("/list_exams")
def list_exams():
    return exams.list_exams()


@app.route("/test/<id>", methods=['GET'])
def exam_details(id):
    return exams.exam_details(id)


@app.route("/test_remove/<id>", methods=['GET', 'POST'])
def exam_remove(id):
    return exams.exam_remove(id)


@app.route("/createPatient", methods=['POST', 'GET'])
def createPatient():
    if request.method == 'POST':
        return patient.createPatient()
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route("/list_patients", methods=['GET'])
def list_patients():
    return patient.list_patients(app)


@app.route("/patient/<id>", methods=['GET'])
def patient_details(id):
    return patient.patient_details(id)


@app.route("/patient_remove/<id>", methods=['GET', 'POST'])
def patient_remove(id):
    return patient.patient_remove(id)


@app.route("/patientCSV/<id>", methods=['GET'])
def patientToCSV(id):
    return patient.patientToCSV(id)


'''
Esta função cria um novo examPatient na base de dados

A tabela examPatient é a tabela de ligação entre a tabela Patient e a tabela Exam dado que, entre estas
há uma ligação de muitos para muitos

@return uma string conforme foi ou não bem sucedida
'''


@app.route("/evaluation", methods=['POST', 'GET'])
def evaluation():
    if request.method == 'POST':

        text = request.json.get('text')
        answer = auxiliares.removing_special_characters(text)
        idExam = request.json.get('idExam')

        try:
            conn = create_connection('database.db')
            cur = conn.cursor()

            # procurar exame na BD
            cur.execute('SELECT solution FROM Exam WHERE idExam = ?', [idExam, ])
            exam = cur.fetchone()
            solution = list(exam)
            solution_parsed = solution[0].split(",")
            
            for i in range (len(solution_parsed)):
                solution_parsed[i] = solution_parsed[i].lstrip()
                solution_parsed[i] = solution_parsed[i].rstrip()
                #app.logger.info(elem)

            #app.logger.info(solution_parsed)
            app.logger.info(answer)

            if len(answer) == 0:
                ommited = len(solution_parsed)
                wrongs = len(solution_parsed)
                repeated = len(solution_parsed)
                exchange = len(solution_parsed)
                other = len(solution_parsed)
                longSubSeq = "ERRO"
            
            else:
                (ommited, wrongs, repeated, exchange, other, longSubSeq) = auxiliares.algoritmo(solution_parsed, answer)

            conn.close()

            return jsonify({'wrongs': wrongs, 'ommited': ommited, 'repeated': repeated, 'exchange': repeated, 'other': other, 'longSubSeq': longSubSeq})
        except:
            return 'Ocorreu um erro ao criar!'

    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/examPatient", methods=['POST', 'GET'])
def examPatient():
    if request.method == 'POST':
        app.logger.info("Entrou")
        idExam = request.json.get('idExam')
        idPatient = request.json.get('idPatient')
        answer = request.json.get('answer')
        ommited = request.json.get('idomited')
        wrongs = request.json.get('soma')
        duration = request.json.get('end')
        todays_date = date.today()

        new_elem = [(idExam, idPatient, todays_date, duration, wrongs, ommited, answer, )]

        try:
            conn = create_connection('database.db')
            suc = create_exam_patient(conn, new_elem)
            conn.close()
            return 'Informação de exame inserida!'
            
        except:
            return 'Ocorreu um erro ao criar!'

    else:
        return send_from_directory(app.static_folder, 'index.html')
