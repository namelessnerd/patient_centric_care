from django.db import models

# Create your models here.
class Consumer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()

class Demographics(models.Model):
	consumer = models.OneToOneField(Consumer)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    age = models.IntegerField()
    race = models.CharField(max_length=30)
    career = models.CharField(max_length=30)
    DIVORCED = -1
    SINGLE = 0
    MARRIED = 1
    Status = (
        (DIVORCED, 'Divorced'),
        (SINGLE, 'Single'),
        (MARRIED, 'Married'),
    )
    marital_status = models.IntegerField(choices=Status, default=SINGLE)

class LifestylePlan(models.Model):
	consumer = models.OneToOneField(Consumer)
class ActivitySession(models.Model):
	lifestyle_plan = models.ForeignKey("LifestylePlan")
	LIGHT = -1
    MODERATE = 0
    VIGOROUS = 1
	Status = (
        (LIGHT, 'Light'),
        (MODERATE, 'Moderate'),
        (VIGOROUS, 'Vigorous),
    )
    activity_level = models.IntegerField(choices=Status, default=LIGHT)
	duration_in_min = models.IntegerField()
	
class SleepSession(models.Model):
	lifestyle = models.ForeignKey(Lifestyle)
    bedtime = models.DateTimeField()
	waketime = models.DateTimeField()
	min_asleep = models.IntegerField()
	
class Meal(models.Model):
	lifestyle = models.ForeignKey(Lifestyle)
	eating_time = models.DateTimeField()
	calories = models.IntegerField()
	fat = models.BooleanField()
	carbs = models.BooleanField()
	protein = models.BooleanField()
	vegetables = models.BooleanField()
	fruits = models.BooleanField()
	diet = models.ForeignKey("Meal")

class Medication(models.Model):
	name = models.CharField(max_length=30)
	dosage = models.IntegerField()
	time_to_take = models.DateTimeField()

class MoodCheckin(models.Model):
	STATES = [i for i in range(11)]
	state = models.IntegerField(choices=CHOICES)
	time = models.DateTimeField()
	
	
	
	
	
	
	