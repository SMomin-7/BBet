# Generated by Django 5.1.3 on 2024-11-25 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_bet'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='bet_id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
        ),
    ]
