from django.db import models

# Create your models here.

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
'''
class Demographic(object):
    def __init__(self, gender, age, employment, career_type,):
        self.gender= gender
        self.age= age
        self.employment= employment
        self.career_type= career_type

class PersonalInfo(object):
    def __init__(self, first_name, last_name,):
        self.first_name= first_name
        self.last_name= last_name

class Consumer(object):
    def __init__(self,personal_info= None, demographic= None, ):

class Metric (object):
  related_classes={}
  def __init__(self):
     print 'Metric base class created'

  @staticmethod
  def add_related_class(class, relationship):
    # adds the related class edge
    related_classes[relationship]= class

  # add a related instance to this metric along with the list of attributes we are interested. This would allow
  # us automatically get related values. for example, if we model weight as a continous object, then related attribute        #would be latest_weight or average_weight and we can return the appropriate value. The methods to return these
   # can handle weekly, monthly, daily or any other analytics we want
  def add_related_instance(self, relationship, instance,attributes):
    #look up the type of the class to check the correct instance is being added
    if type(instance)==Metric.related_classes[relationship]
       self.related_instance[relationship]= (instance, attributes)
	 '''


