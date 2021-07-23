from flask import Flask, jsonify, send_from_directory, render_template, url_for, request, redirect
from db_create import create_connection, create_patient


def createPatient():
    patient_name = request.json.get('namePatient')
    dateOfBirth = request.json.get('dateOfBirth')
    gender = request.json.get('gender')
    observations = request.json.get('observations')

    new_patient = [(patient_name, dateOfBirth, gender, observations)]
    try:
        conn = create_connection('database.db')
        suc = create_patient(conn, new_patient)
        return 'Paciente Criado!'
    except:
        return 'Ocorreu um ero ao adicionar um novo Paciente'


'''
Esta função lista os pacientes criados até ao momento

@return retorna em formato json os pacientes, se correu bem, se não correr bem, retorna um json mas só que o
value é uma string
'''


def list_patients(app):
    try:
        patients = []
        conn = create_connection('database.db')
        cur = conn.cursor()
        cur.execute('SELECT * FROM Patient')
        for row in cur:
            patients.append({'idPatient': row[0], 'namePatient': row[1], 'dateOfBirth': row[2], \
                             'gender': row[3], 'observations': row[4]})
        conn.close()

        return jsonify({'patients': patients})
    except Exception as err:
        return jsonify({'patients': 'Ocorreu um erro ao listar todos os pacientes'})


'''
Esta função lista um dado paciente pelo seu id, sendo que este id é passado como url

@return retorna em formato json o paciente, se correu bem, se não correr bem, retorna um json mas só que o
value é uma string
'''


def patient_details(id):
    try:
        conn = create_connection('database.db')
        cur = conn.cursor()
        cur.execute('SELECT * FROM Patient where idPatient=?', (id,))
        patient_info = cur.fetchone()
        patient = {"name": patient_info[1], "dateOfBirth": patient_info[2], "gender": patient_info[3],
                   "observations": patient_info[4]}

        cur.execute(
            'SELECT ep.id, ep.dateRealization, ep.duration, ep.wrongs, ep.ommited, ep.solutionPatient, e.nameExam FROM examPatient AS ep INNER JOIN Exam AS e on ep.idExam = e.idExam WHERE idPatient=? ORDER BY dateRealization DESC LIMIT 3',
            (id,))
        exams_info = cur.fetchall()

        if len(exams_info) == 0:
            conn.close()
            return jsonify({'patient': patient, 'exams': []})

        else:
            exams = []

            for line in exams_info:
                exams.append({"id": line[0],"dateRealization": line[1], "duration": line[2], "wrongs": line[3],
                              "ommited": line[4], "solutionPatient": line[5], "nameExam": line[6]})
            conn.close()
            return jsonify({'patient': patient, 'exams': exams})

    except:
        return jsonify({'patient': 'Ocorreu um erro ao ver os detalhes do paciente', 'exams': {}})


'''
Esta função elimina um dado paciente pelo seu id, sendo que este id é passado como url

@return retorna em formato json uma string que diz se foi ou não bem removido
'''


def patient_remove(id):
    try:
        conn = create_connection('database.db')
        cur = conn.cursor()
        cur.execute('DELETE FROM Patient WHERE idPatient=?', (id,))
        conn.commit()
        conn.close()
        return jsonify({'done': 'O paciente foi removido com sucesso'})
    except:
        return jsonify({'done': "Ocorreu algum erro ao remover o paciente"})


'''
Função que guarda toda a informação de um paciente em csv
'''


def patientToCSV(id):
    try:
        conn = create_connection('database.db')
        cur = conn.cursor()
        rows = []
        cur.execute(
            'SELECT p.namePatient, ep.idExam, ep.dateRealization, ep.duration, ep.ommited, ep.wrongs, ep.solutionPatient FROM ExamPatient as ep INNER JOIN PATIENT as p ON ep.idPatient = p.idPatient WHERE ep.idPatient = ?',
            (id,))
        rows = cur.fetchall()
        conn.close()
        name = rows[0][0]
        elem = ["nome","idExam","data","duração","omitidas","erradas","resposta"]
        rows.insert(0,elem)

        return jsonify({'done': 'O ficheiro CSV foi criado com sucesso', 'data': rows, 'name': name})
    except:
        return jsonify({'done': "Ocorreu algum erro ao guardar a informação de um paciente em ficheiro CSV"})
