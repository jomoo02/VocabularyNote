from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

from db_model.mysql import word_db
from api import data_api
from api import word_api

app = Flask(__name__, static_folder='../backend-flask/dist/',
            static_url_path='/')
CORS(app)


@app.route('/')
def hello():
    return app.send_static_file('index.html')

# word 검색 -> {mean:[...], check=0 or 1 or -1}


@app.route('/search', methods=['POST'])
def wordsearch():
    req = request.get_json()
    word = req['word']
    print("getword : ", word)
    findword = word_db.find(word)
    # db에 존재 할 때
    if findword != None:
        findword_dic = data_api.db_to_dic(findword['mean'])
        print("line 27 : find searchWord", word)
        return findword_dic
    # db에 존재하지 않을 때
    else:
        print("line 30: search return", word)
        return word_api.wordSearch(word)

# db word_list의 모든 데이터 전송


@app.route('/get', methods=['GET'])
def get_words():
    words = word_db.get()
    final_word_list = []
    for i in range(len(words)):
        means_dic = data_api.db_to_list(words[i][1])
        words_dic = {'word': words[i][0], 'mean': means_dic}
        final_word_list.append(words_dic)

    final_word_dic = {'item': final_word_list}
    print("line 184: data get pass")
    return final_word_dic

# word_list에 'word' insert


@app.route('/insert/<word>', methods=['GET'])
def insert_word(word):
    word_db.word_list_insert(word)
    print(word, "insert success")
    return word+"insert success"

# word_list에 'word' delete


@app.route('/delete', methods=['GET'])
def delete_word():
    word = request.args.get('word')
    word_db.word_list_delete(word)
    print(word, "delete success")
    return word+"delete success"


if __name__ == '__main__':  # 모듈이 아니라, 해당 코드 직접 실행시만 실행
    app.run(host="0.0.0.0", port="8081")
