
from library.DB.Mongo import MongoConnector

mc= MongoConnector(db='acnh')
class Consumer(object):


    def __init__(self, cid= None, f_n=None, l_n= None,
            age=None, gender= None, d_o_b= None,address= None):
        self.cid= cid
        self.first_name= f_n
        self.last_name= l_n
        self.age= age
        self.gender= gender
        self.date_of_birth= d_o_b
        self.address= vars(address)

    def create(self,):
        print vars(self)
        mc.insert(vars(self), 'test')

    @staticmethod
    def get(**kwargs):
        return [{k:v for k,v in res.iteritems() if k!='_id'} for res in
                mc.find({k:kwargs[k] for k in kwargs},
                                        collection='test')]


class Address(object):
    def __init__(self, city= None, state= None, zip_code= None,):
        self.city= city
        self.state= state
        self.zip_code= zip_code

