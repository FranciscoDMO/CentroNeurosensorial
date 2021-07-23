from flask import Flask, jsonify, send_from_directory, render_template, url_for, request, redirect
from db_create import create_connection, create_exam

'''
Esta função cria um novo exame na base de dados

@return uma string conforme foi ou não bem sucedida
'''


def createExam():
    exam_name = request.json.get('nameExam')
    image_name = request.json.get('nameImage')
    solution = request.json.get('solution')
    dificulty = request.json.get('dificulty')
    observations = request.json.get('observations')

    new_exam = [(exam_name, image_name, solution,
                 dificulty, observations)]
    try:
        conn = create_connection('database.db')
        suc = create_exam(conn, new_exam)
        conn.close()
        return 'Exame Criado!'
    except:
        return 'Ocorreu algum erro ao adicionar o exame'


'''
Esta função lista os exames criados até ao momento

@return retorna em formato json os exames, se correu bem, se não correr bem, retorna um json mas só que o
value é uma string
'''


def list_exams():
    try:
        exams = []
        conn = create_connection('database.db')
        cur = conn.cursor()
        cur.execute('SELECT idExam, nameExam, nameImage, observations FROM Exam')
        for row in cur:
            exams.append({'idExam': row[0], 'nameExam': row[1], 'nameImage': row[2], 'observations': row[3]})
        conn.close()
        return jsonify({'exams': exams})
    except:
        return jsonify({'exams': 'Ocorreu algum erro ao listar os exames'})


'''
Esta função lista um dado exame pelo seu id, sendo que este id é passado como url

@return retorna em formato json o exame, se correu bem, se não correr bem, retorna um json mas só que o
value é uma string
'''


def exam_details(id):
    try:
        conn = create_connection('database.db')
        cur = conn.cursor()
        cur.execute('SELECT nameExam,nameImage, solution, observations, dificulty FROM Exam WHERE idExam=?', (id,))

        row = cur.fetchone()

        # print(row)
        conn.close()
        return jsonify(
            {'nameExam': row[0], 'nameImage': row[1], 'observations': row[3], 'solution': row[2], 'dificulty': row[4]})
    except:
        return jsonify({'nameExam': "Ocorreu algum erro ao listar um exame por um id"})


'''
Esta função elimina um dado exame pelo seu id, sendo que este id é passado como url

@return retorna em formato json uma string que diz se foi ou não bem removido
'''


def exam_remove(id):
    try:
        conn = create_connection('database.db')
        cur = conn.cursor()
        cur.execute('DELETE FROM Exam WHERE idExam=?', (id,))
        conn.commit()
        conn.close()
        return jsonify({'done': 'O exame foi removido com sucesso'})
    except:
        return jsonify({'done': "Ocorreu algum erro ao remover o exame"})
