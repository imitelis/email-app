from utils.database import db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    course_id = db.Column(db.ForeignKey("course.id"))
    
    course = db.relationship("Course", back_populates="students")