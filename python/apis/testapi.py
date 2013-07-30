import requests
import simplejson
import csv
import random
from fakedata import names

with open('/work/code/patient_centric_care/health_datasets/ptrd/training_SyncPatient.csv') as csvfile:
    dialect= csv.Sniffer().sniff(csvfile.read(1024))
    csv_reader= csv.DictReader(csvfile, fieldnames=('cid','dmi', 'gender', 'd_o_b','state','pid',),delimiter=',')

    for row in csv_reader:
        row['f_n']= random.choice(names.f_f) if row['gender']=='F' else random.choice(names.m_f)
        row['l_n']= random.choice(names.l_n)
        del row['pid']
        row['address']= {'state':row['state']}
        del row['state']
        del row['dmi']
        data= simplejson.dumps(row)
        requests.post('http://ec2-75-101-230-124.compute-1.amazonaws.com/api/consumer/add', data= data, headers= {'content-type': 'application/json'})
