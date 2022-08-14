from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
from db_model.mysql import word_db

# naver 사전


def wordsearch_naver(word):
    wordclass = ["명사", "형용사", "부사", "동사", "대명사", "수사", "관형사", "감탄사", "조사"]
    findword = word_db.find(word)

    if findword != None:
       # print(findword)
        findword_list = dataTransform_to_get(findword['mean'])
        #print("findword_list : ", findword_list)
        meanlist = []
        meandic = {}
        finalwordclass = findword_list[0]
        for i in range(1, len(findword_list)):
            #print(i, meandic, findword_list[i])
            if findword_list[i] in wordclass:
                meandic[finalwordclass] = meanlist
                meanlist = []
                finalwordclass = findword_list[i]
            else:
                meanlist.append(findword_list[i])
        meandic[finalwordclass] = meanlist
        print("line_ 50 meandic : ", meandic)
        return meandic
    else:
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        options.add_argument('disable-gpu')
        options.add_argument('lang=ko_KR')
        options.add_argument(
            "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36")
        options.add_argument('--blink-settings=imagesEnabled=false')

        # driver = webdriver.Chrome(
        #     ChromeDriverManager().install(), chrome_options=options)
        service = Service('C:\driver\chromedriver')

        driver = webdriver.Chrome(
            service=service, options=options)
        driver.implicitly_wait(10)

        url = 'https://en.dict.naver.com/#/search?query={}'.format(word)

        driver.get(url)
        try:
            mean_list = []
            #data = driver.find_elements(By.CLASS_NAME, 'mean')
            rowdata = driver.find_elements(By.CLASS_NAME, 'row ')
            data = rowdata[0].find_elements(By.CLASS_NAME, 'mean')
            for k in data:
                mean_list.append(k.text.split('\n'))
            get_list = {}

            for k in mean_list:
                tmp = k[0].split()
                if tmp and tmp[0] in wordclass:
                    if tmp[0] in get_list.keys():
                        get_list[tmp[0]].append(
                            ' '.join(map(str, tmp[1:])))
                    else:
                        get_list[tmp[0]] = [' '.join(tmp[1:])]

            keys = list(get_list.keys())
            for i in range(len(keys)):
                key = keys[i]
                for j in range(len(get_list[key])):
                    get_list[key][j] = '- '+get_list[key][j]

        except TimeoutException:
            print("시간초과")
        finally:
            driver.quit()
        # print(mean_list)
        print("line_108 get_list : ", get_list)

        # db insert
        db_mean = dataTransform_to_text(get_list)
        word_db.search_word_list_insert(word, db_mean)
        return get_list


def dataTransform_to_text(listdic):
    searchWord_means = ''
    keys = list(listdic.keys())

    for kL in range(len(keys)):
        k = keys[kL]
        mean_list = listdic[k]
        if kL == 0:
            tmp = k+'@'
        else:
            tmp = '#'+k+'@'
        meanLength = len(mean_list)
        for m in range(meanLength):
            mean = mean_list[m]
            if m != meanLength-1:
                tmp += mean+'@'
            else:
                tmp += mean

        searchWord_means += tmp
    return searchWord_means


def dataTransform_to_dic(searchWord_means):
    toDict = {}
    wordclass_list = searchWord_means.split('#')
    # print(wordclass_list)
    for i in range(len(wordclass_list)):
        tmp = wordclass_list[i].split('@')
        # print(tmp)
        toDict[tmp[0]] = tmp[1:]
    return toDict


def dataTransform_to_get(searchWord_means):
    itList = []
    wordclass_list = searchWord_means.split('#')
    for i in range(len(wordclass_list)):
        tmp = wordclass_list[i].split('@')
        itList += tmp

    return itList
