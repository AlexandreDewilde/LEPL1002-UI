from flask import Flask
from flask import render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

conn = sqlite3.connect("database.db")
c = conn.cursor()

c.execute("CREATE TABLE IF NOT EXISTS records ([record_id] INTEGER PRIMARY KEY, [record_time] INTEGER, [speed] REAL)")

conn.commit()


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/add_record", methods=["POST"])
def add_record():
    data = request.json
    if "time" not in data or "speed" not in data:
        return jsonify({"status": 403})
    with sqlite3.connect("database.db") as conn: 
        c = conn.cursor()
        c.execute("INSERT INTO records(record_time, speed) VALUES (?, ?)", (data["time"], data["speed"]))
    return jsonify({"status": 200})

@app.route("/get_last_records")
def get_last_records():
    with sqlite3.connect("database.db") as conn: 
        c = conn.cursor()
        c.execute("SELECT record_time, speed FROM records ORDER BY record_time DESC")
        rows = c.fetchall()
    return jsonify({"status": 200, "records": rows})

if __name__ == "__main__":
    app.run(debug=True)