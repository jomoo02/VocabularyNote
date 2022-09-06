import pymysql

MYSQL_CONN = pymysql.connect(
    host='192.168.35.62',
    port=3306,
    user='jomoo',
    passwd='0612',
    db='vocabulary_note',
    charset='utf8'
)
