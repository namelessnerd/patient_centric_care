def status_message(original_func):
	def wrapped(*args, **kwargs):
		if args[0] is 5:
			func = original_func(*args, **kwargs)
			if func:
				print "Status OK"
				return wrapped
		print "Forbidden"
	return wrapped
	return status_message


@status_message
def add(request):
	print "saved user"
	return True

@status_message
def auth(request):
	user = (request % 2)
	if user is 1:
		print "login user"
		print "authenticated user"
		return True

request = 4
add(request)
auth(request)