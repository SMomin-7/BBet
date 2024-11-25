from django.db import models

class CustomUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    dob = models.DateField()
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    deposit = models.DecimalField(max_digits=10, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    ranking = models.IntegerField(default=0, null=True, blank=True)
    admin_id = models.IntegerField(null=True, blank=True)
    client_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.email

