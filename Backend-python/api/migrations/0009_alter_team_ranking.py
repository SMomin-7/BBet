# Generated by Django 5.1.3 on 2024-11-27 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_team'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='ranking',
            field=models.IntegerField(default=0),
        ),
    ]
