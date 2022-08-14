
# db mean text -> {mean:[], check:0}
def db_to_dic(searchWord_means):
    dic = {}
    meanList = searchWord_means.split('@')
    dic['mean'] = meanList
    dic['check'] = 0
    return dic


# db mean text -> list
def db_to_list(mean_text):
    mean_list = mean_text.split('@')
    return mean_list


# search info -> {mean:meanList, check:0}
def search_to_dic(data):
    dic = {}
    meanList = []
    for d in data:
        meanList.append(d.text)
    dic['mean'] = meanList
    dic['check'] = 0
    return dic


# search relate info -> {mean:relatewordList, check:1}
def searchRelate(data):
    dic = {}
    relatewordList = []
    for d in data:
        relatewordList.append(d.text)
    dic['mean'] = relatewordList
    dic['check'] = 1

    return dic


# search data -> text
def search_to_db(data):
    text = ''
    for i in range(len(data)):
        d = data[i]
        if i == len(data)-1:
            text += str(d.text)
        else:
            text += (str(d.text) + '@')
    return text
