from django.contrib import admin

# Register your models here.
from .models import Speech, User, ViewRecord

admin.site.register(Speech)
admin.site.register(User)
admin.site.register(ViewRecord)
