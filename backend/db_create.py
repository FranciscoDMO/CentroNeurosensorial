import sqlite3
from sqlite3 import Error


def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn


def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def init_db():
    database = r"database.db"

    sql_create_exams_table = """ CREATE TABLE IF NOT EXISTS Exam (
                                        idExam integer PRIMARY KEY AUTOINCREMENT,
                                        nameExam text NOT NULL,
                                        nameImage text NOT NULL,
                                        solution text NOT NULL,
                                        dificulty integer NOT NULL,
                                        observations text NOT NULL
                            );"""

    sql_create_patients_table = """CREATE TABLE IF NOT EXISTS Patient (
                                        idPatient integer PRIMARY KEY AUTOINCREMENT,
                                        namePatient text NOT NULL,
                                        dateOfBirth Date NOT NULL,
                                        gender char(1) NOT NULL,
                                        observations text NOT NULL
                                );"""

    sql_create_examPatients_table = """CREATE TABLE IF NOT EXISTS ExamPatient (
                                        id integer PRIMARY KEY AUTOINCREMENT,
                                        idExam integer NOT NULL,
                                        idPatient integer NOT NULL,
                                        dateRealization DATE NOT NULL,
                                        duration TIME NOT NULL,
                                        wrongs integer NOT NULL,
                                        ommited integer NOT NULL,
                                        solutionPatient integer NOT NULL,
                                        FOREIGN KEY (idExam) REFERENCES Exam (idExam),
                                        FOREIGN KEY (idPatient) REFERENCES Patient (idPatient)
                                    );"""

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create projects table
        create_table(conn, sql_create_exams_table)

        # create tasks table
        create_table(conn, sql_create_patients_table)

        create_table(conn, sql_create_examPatients_table)
    else:
        print("Error! cannot create the database connection.")


def create_exam(conn, exam):
    sql = "INSERT INTO Exam(nameExam,nameImage, solution, dificulty,observations) VALUES(?,?,?,?,?)"
    cur = conn.cursor()
    cur.execute(sql, exam[0])
    conn.commit()
    return cur.lastrowid


def create_patient(conn, patient):
    sql = "INSERT INTO Patient(namePatient, dateOfBirth, gender, observations) VALUES(?,?,?,?)"
    cur = conn.cursor()
    cur.execute(sql, patient[0])
    conn.commit()
    return cur.lastrowid


def create_exam_patient(conn, patient):
    sql = "INSERT INTO ExamPatient(idExam, idPatient, dateRealization, duration, wrongs, ommited, solutionPatient) VALUES(?,?,?,?,?,?,?)"
    cur = conn.cursor()
    cur.execute(sql, patient[0])
    conn.commit()
    return cur.lastrowid
