"""
Reads the data from http://www.census.gov/geo/www/gazetteer/places2k.html and finds the cities by state.

It produces a dictionary with the two letter state codes as keys. For each key there is
a list of dictionaries each with info on a city.
"""

def process(sline):
    d={'state': sline[0:2],\
       'city':sline[9:73].strip(),\
       }
    return d


print "Reading data..."
import urllib
import codecs
text_file=codecs.getreader('latin_1')( urllib.urlopen('http://www.census.gov/tiger/tms/gazetteer/places2k.txt'))
lines=text_file.readlines()

citiesByState = {}
for city_line in lines:
    if len(city_line) > 0 :
        thisCity = process(city_line)
        citiesByState.setdefault(thisCity['state'],[]).append(thisCity)
print "US census data has been read"

# Pickle it
import pickle
fp=open('us_cities.pickle','wb')
pickle.dump(citiesByState,fp)
fp.close()

