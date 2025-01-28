import psycopg2

try:
    connection = psycopg2.connect(
        dbname="basketball_league",
        user="postgres",
        password="your_password",
        host="localhost",
        port="5432"
    )
    cursor = connection.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()
    print(f"Connected to - {db_version}")
except Exception as error:
    print(f"Error connecting to PostgreSQL: {error}")
finally:
    if connection:
        cursor.close()
        connection.close()
