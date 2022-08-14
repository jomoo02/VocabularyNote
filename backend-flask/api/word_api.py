import requests
from bs4 import BeautifulSoup
from api import data_api
from db_model.mysql import word_db

# daum 사전


def wordSearch(word):
    url = 'https://dic.daum.net/search.do?q={}'.format(word)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
    webpage = requests.get(url, headers=headers)

    soup = BeautifulSoup(webpage.text, 'html.parser')
    wordcheck = soup.select(
        '.cleanword_type.kuek_type > .search_cleanword > strong')
    if not wordcheck:
        print("not wordcheck -1")
        return {'check': -1}
    else:
        word_text = wordcheck[0].text[1:-1]
        if word != word_text:
            relate_words = soup.select('.card_relate > a')
            relate_dic = data_api.searchRelate(relate_words)
            print("relate word check 1")
            return relate_dic
        else:
            data = soup.select(
                '.cleanword_type.kuek_type > ul > li > .txt_search')
            mean_dic = data_api.search_to_dic(data)
            mean_text = data_api.search_to_db(data)
            print("meantext 0")
            word_db.search_word_list_insert(word, mean_text)
            return mean_dic
