from .imports import *

Base = sqlalchemy.orm.declarative_base()

# # setup database connection
# engine = create_engine(config.SQLALCHEMY_DATABASE_URI)
# Base.metadata.create_all(engine)

# # example usage

# # create a session
# Session = sessionmaker(bind=engine)
# session = Session()

# # clear tables just for example sake
# session.query(Doctor).delete()
# session.commit()

# # create a doctor
# new_doctor = Doctor(
#     name='John Doe',
#     specialization='Cardiology',
#     biography='Cardiologist with 10 years of experience.',
#     education='UIUC',
#     years_of_experience=10,
#     profile_photo_id='path/to/photo'
# )

# # add to session
# session.add(new_doctor)
# # commit is just like git, "pushing" these changes to mysql
# # can commit multiple changes at once
# session.commit()

# # example of retrieving
# cardiologists = session.query(Doctor).filter_by(specialization='Cardiology').all()
# for doctor in cardiologists:
#     print(doctor.name)
#     # note that created_at should match ur machine's current datetime
#     print(doctor.created_at)

# # example of updating
# # get first doctor w/ cardio specialization
# doctor_to_update = session.query(Doctor).filter_by(specialization='Cardiology').first()
# # print before updating
# print(doctor_to_update.biography)
# # update the bio
# doctor_to_update.biography = 'updated bio'
# # commit changes
# session.commit()
# # print after updating
# print(doctor_to_update.biography)


# # example of deleting
# doctor_to_delete = session.query(Doctor).filter_by(specialization='Cardiology').first()
# session.delete(doctor_to_delete)
# session.commit()
# # get cardiologists after commit
# cardiologists = session.query(Doctor).filter_by(specialization = 'Cardiology').all()
# if len(cardiologists) == 0 :
#     print("empty")

# # always end with closing session
# session.close()


# audio, patient, doctor profile

# do the post and fetching functions

# add session number for recordings and visualizations

# recordings and visualizations should have positions column

# return the date for the recordings and visualizations

# do smaller functions for fetching i.e. break up visualization and recordings as different functions 

# past listening session

# get recording corresponding to one session

# ideally mult sessions per day so can choose by datetime

# access a specific sesson, when they have access to that, get recording for each part of the heart for each part of the session

# have access to all recordings and visualzations

# new listening session

# click begin listening, create a session so maybe then have a session table?

# create a recording for each measurement, these five recordings should all be a part of one session 

# worry about redoing recordings later, not necessary for demo

# click finish listening will finish session, take you to session summary, go through all recordings they just made, display all info for that specific session's instance

# Sessions:

# POST /api/sessions to create a new session.
# GET /api/sessions/{sessionId} to get a specific session and its associated recordings/visualizations.
# GET /api/sessions/user/{userId} to get all sessions for a specific user.
# DELETE /api/sessions/{sessionId} to delete a session.

# Recordings:

# POST /api/recordings to create a new recording.
# GET /api/recordings/{sessionId} to get all recordings for a session.
# PUT /api/recordings/{recordingId} to update a recording.
# DELETE /api/recordings/{recordingId} to delete a recording.

# Visualizations:

# POST /api/visualizations to create a visualization for a recording.
# GET /api/visualizations/{sessionId} to get all visualizations for a session

# Session shows all recordings and visualizations
# Need patient, sessions, recordings, visualizations, 