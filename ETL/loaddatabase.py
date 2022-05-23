import mysql.connector

# connect with database using MySQL Python connector
database = mysql.connector.connect(host = '127.0.0.1', user = 'root', passwd = 'password', database = 'stats_database')

# get a cursor to handle database
mycursor = database.cursor()

# execute loading SQL commands
mycursor.execute("LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Measurements.csv' INTO TABLE MEASUREMENTS FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';")
mycursor.execute("LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Years.csv' INTO TABLE YEARS FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' ;")

# commit changes to the database
database.commit()

# close connection with the database
database.close()
