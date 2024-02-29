from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text, Boolean, ForeignKey, Time, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, declarative_base
import sqlalchemy
import datetime

Base = sqlalchemy.orm.declarative_base()

class Doctor(Base):
    __tablename__ = 'doctors'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    specialization = Column(String(255))
    biography = Column(Text)
    education = Column(Text)
    years_of_experience = Column(Integer)
    profile_photo_id = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    availabilities = relationship("DoctorAvailability", back_populates="doctor")
    patients = relationship("DoctorPatient", back_populates="doctor")

    def __init__(self, name, specialization, biography, education, years_of_experience, profile_photo_id, created_at=None, updated_at=None):
        self.name = name
        self.specialization = specialization
        self.biography = biography
        self.education = education
        self.years_of_experience = years_of_experience
        self.profile_photo_id = profile_photo_id
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<Doctor(id={self.id}, name='{self.name}', specialization='{self.specialization}')>"

class Patient(Base):
    __tablename__ = 'patients'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    gender = Column(String(50))
    dob = Column(DateTime)
    pre_existing_conditions = Column(Text)
    blood_type = Column(String(2))
    weight = Column(Float)
    height = Column(Float)
    profile_photo_id = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    doctors = relationship("DoctorPatient", back_populates="patient")

    def __init__(self, name, gender, dob, pre_existing_conditions, blood_type, weight, height, profile_photo_id, created_at=None, updated_at=None):
        self.name = name
        self.gender = gender
        self.dob = dob
        self.pre_existing_conditions = pre_existing_conditions
        self.blood_type = blood_type
        self.weight = weight
        self.height = height
        self.profile_photo_id = profile_photo_id
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<Patient(id={self.id}, name='{self.name}')>"

class DoctorAvailability(Base):
    __tablename__ = 'doctor_availability'
    id = Column(Integer, primary_key=True, autoincrement=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    day_of_week = Column(String(10))
    start_time = Column(Time)
    end_time = Column(Time)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationship
    doctor = relationship("Doctor", back_populates="availabilities")

    def __init__(self, doctor_id, day_of_week, start_time, end_time, created_at=None, updated_at=None):
        self.doctor_id = doctor_id
        self.day_of_week = day_of_week
        self.start_time = start_time
        self.end_time = end_time
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<DoctorAvailability(id={self.id}, doctor_id={self.doctor_id}, day_of_week='{self.day_of_week}')>"

class DoctorPatient(Base):
    __tablename__ = 'doctor_patient'
    id = Column(Integer, primary_key=True, autoincrement=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    patient_id = Column(Integer, ForeignKey('patients.id'))
    relationship_start_date = Column(DateTime)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    doctor = relationship("Doctor", back_populates="patients")
    patient = relationship("Patient", back_populates="doctors")

    def __init__(self, doctor_id, patient_id, relationship_start_date, created_at=None, updated_at=None):
        self.doctor_id = doctor_id
        self.patient_id = patient_id
        self.relationship_start_date = relationship_start_date
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<DoctorPatient(id={self.id}, doctor_id={self.doctor_id}, patient_id={self.patient_id})>"

class Appointments(Base):
    __tablename__ = 'appointments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    patient_id = Column(Integer, ForeignKey('patients.id'))
    doctor_patient_id = Column(Integer, ForeignKey('doctor_patient.id'))
    appointment_time = Column(DateTime)
    notes = Column(Text)
    appointment_type = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    doctor = relationship("Doctor")
    patient = relationship("Patient")
    doctor_patient_relation = relationship("DoctorPatient")

    def __init__(self, doctor_id, patient_id, doctor_patient_id, appointment_time, notes, appointment_type, created_at=None, updated_at=None):
        self.doctor_id = doctor_id
        self.patient_id = patient_id
        self.doctor_patient_id = doctor_patient_id
        self.appointment_time = appointment_time
        self.notes = notes
        self.appointment_type = appointment_type
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<Appointments(id={self.id}, doctor_id={self.doctor_id}, patient_id={self.patient_id})>"

class AudioRecords(Base):
    __tablename__ = 'audio_records'
    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey('patients.id'))
    file_path = Column(String(255))
    recording_date = Column(DateTime)
    recording_type = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationship
    patient = relationship("Patient")

    def __init__(self, patient_id, file_path, recording_date, recording_type, created_at=None, updated_at=None):
        self.patient_id = patient_id
        self.file_path = file_path
        self.recording_date = recording_date
        self.recording_type = recording_type
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<AudioRecords(id={self.id}, patient_id={self.patient_id}, recording_type='{self.recording_type}')>"

class CalendarEvents(Base):
    __tablename__ = 'calendar_events'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer)
    user_type = Column(String(50))
    date = Column(Date)
    is_available = Column(Boolean)
    reason_for_unavailability = Column(Text)
    event_type = Column(String(255))
    doctor_id = Column(Integer, ForeignKey('doctors.id'), nullable=True)
    patient_id = Column(Integer, ForeignKey('patients.id'), nullable=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    doctor = relationship("Doctor", foreign_keys=[doctor_id])
    patient = relationship("Patient", foreign_keys=[patient_id])

    def __init__(self, user_id, user_type, date, is_available, reason_for_unavailability, event_type, doctor_id=None, patient_id=None, created_at=None, updated_at=None):
        self.user_id = user_id
        self.user_type = user_type
        self.date = date
        self.is_available = is_available
        self.reason_for_unavailability = reason_for_unavailability
        self.event_type = event_type
        self.doctor_id = doctor_id
        self.patient_id = patient_id
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<CalendarEvents(id={self.id}, user_type='{self.user_type}', date='{self.date}')>"

class Holidays(Base):
    __tablename__ = 'holidays'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    date = Column(Date)
    description = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, name, date, description, created_at=None, updated_at=None):
        self.name = name
        self.date = date
        self.description = description
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<Holidays(id={self.id}, name='{self.name}', date='{self.date}')>"

class DoctorAvailabilityExceptions(Base):
    __tablename__ = 'doctor_availability_exceptions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    date = Column(Date)
    is_available = Column(Boolean)
    reason = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationship
    doctor = relationship("Doctor")

    def __init__(self, doctor_id, date, is_available, reason, created_at=None, updated_at=None):
        self.doctor_id = doctor_id
        self.date = date
        self.is_available = is_available
        self.reason = reason
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<DoctorAvailabilityExceptions(id={self.id}, doctor_id={self.doctor_id}, date='{self.date}', is_available={self.is_available})>"

class AudioVisualizations(Base):
    __tablename__ = 'audio_visualizations'
    id = Column(Integer, primary_key=True)
    audio_id = Column(Integer, ForeignKey('audio_records.id'))
    file_path = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationship
    audio_record = relationship("AudioRecords")

    def __init__(self, audio_id, file_path, created_at=None, updated_at=None):
        self.audio_id = audio_id
        self.file_path = file_path
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.UTC)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.UTC)

    def __repr__(self):
        return f"<AudioVisualizations(id={self.id}, audio_id={self.audio_id})>"

# setup database connection
engine = create_engine('mysql://root:safiyabhanpuri@localhost:3306/Stethopy')
Base.metadata.create_all(engine)

# example usage

# create a session
Session = sessionmaker(bind=engine)
session = Session()

# clear tables just for example sake
session.query(Doctor).delete()
session.commit()

# create a doctor
new_doctor = Doctor(
    name='John Doe',
    specialization='Cardiology',
    biography='Cardiologist with 10 years of experience.',
    education='UIUC',
    years_of_experience=10,
    profile_photo_id='path/to/photo'
)

# add to session
session.add(new_doctor)
# commit is just like git, "pushing" these changes to mysql
# can commit multiple changes at once
session.commit()

# example of retrieving
cardiologists = session.query(Doctor).filter_by(specialization='Cardiology').all()
for doctor in cardiologists:
    print(doctor.name)
    # note that created_at should match ur machine's current datetime
    print(doctor.created_at)

# example of updating
# get first doctor w/ cardio specialization
doctor_to_update = session.query(Doctor).filter_by(specialization='Cardiology').first()
# print before updating
print(doctor_to_update.biography)
# update the bio
doctor_to_update.biography = 'updated bio'
# commit changes
session.commit()
# print after updating
print(doctor_to_update.biography)


# example of deleting
doctor_to_delete = session.query(Doctor).filter_by(specialization='Cardiology').first()
session.delete(doctor_to_delete)
session.commit()
# get cardiologists after commit
cardiologists = session.query(Doctor).filter_by(specialization = 'Cardiology').all()
if len(cardiologists) == 0 :
    print("empty")

# always end with closing session
session.close()

