class Vitals(object):
  def __init__(self, **kwargs):
    for arg in kwargs:
      setattr(self, arg, kwargs[arg])

  def update_vital(self, vital, value):
    setattr(self, vital, value)
