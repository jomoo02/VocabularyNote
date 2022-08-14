from db_model import mysqlConn
MYSQL_CONN = mysqlConn.MYSQL_CONN


def conn_mysqldb():
    if not MYSQL_CONN.open:
        MYSQL_CONN.ping(reconnect=True)
    return MYSQL_CONN


class word_db():
    @staticmethod
    def get():
        mysql_db = conn_mysqldb()
        db_cursor = mysql_db.cursor()
        sql = "SELECT * FROM word_list"
        db_cursor.execute(sql)
        word_list = db_cursor.fetchall()
        if not word_list:
            return None
        return word_list

    @staticmethod
    def find(word):
        mysql_db = conn_mysqldb()
        db_cursor = mysql_db.cursor()
        sql = "SELECT * FROM search_word_list WHERE WORD = '" + str(word) + "'"

        db_cursor.execute(sql)
        searchWord = db_cursor.fetchone()
        if not searchWord:
            return None
        findWord = {'word': searchWord[1], 'mean': searchWord[2]}
        return findWord

    @staticmethod
    def search_word_list_insert(word, mean):
        searchWord = word_db.find(word)
        if searchWord == None:
            mysql_db = conn_mysqldb()
            db_cursor = mysql_db.cursor()
            sql = "INSERT INTO search_word_list (WORD, MEAN) VALUES ('%s','%s')" % (
                str(word), str(mean))
            db_cursor.execute(sql)
            mysql_db.commit()
            return word_db.find(word)
        else:
            return searchWord

    @staticmethod
    def word_list_insert(word):
        searchWord = word_db.find(word)
        mysql_db = conn_mysqldb()
        db_cursor = mysql_db.cursor()
        sql = "INSERT INTO word_list (WORD, MEAN) VALUES ('%s','%s')" % (
            str(searchWord['word']), str(searchWord['mean']))
        db_cursor.execute(sql)
        mysql_db.commit()

    @staticmethod
    def word_list_delete(word):
        mysql_db = conn_mysqldb()
        db_cursor = mysql_db.cursor()
        sql = "DELETE FROM word_list WHERE WORD = %s"
        deleted = db_cursor.execute(sql, word)
        mysql_db.commit()
        return deleted
