from django.db import models

# Meeting category
class MeetingCategory(models.Model):
    name = models.CharField(max_length=50)
    # Timestamps
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Meeting(models.Model):
    meeting_category = models.ForeignKey(MeetingCategory, blank=True, null=True, on_delete=models.CASCADE)
    executive_entity = models.ForeignKey(Peppar, on_delete=models.CASCADE, null=True)    
    meetingsubjects = models.ManyToManyField(Plan, on_delete=models.CASCADE, null=True)
    meetingparticipants = models.ManyToManyField(Person, on_delete=models.CASCADE, null=True)
    # Time Data
    requested_meetdate = models.DateField(blank=True, null=True)
    meetingrequest_created = models.DateTimeField(blank=True, null=True)
    meetingrequest_sent = models.DateTimeField(blank=True, null=True)
    meeting_started = models.DateTimeField(blank=True, null=True)
    meeting_completed = models.DateTimeField(blank=True, null=True)
    report_completed = models.DateTimeField(blank=True, null=True)
    # Booleans
    is_current_meeting = models.BooleanField(default=False)
    # Timestamps
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
    
class MeetingSubject(models.Model):
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
