# Generated by Django 4.2.7 on 2023-12-02 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_feedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='payments',
            name='address',
            field=models.TextField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='payments',
            name='city',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='payments',
            name='latitude',
            field=models.DecimalField(decimal_places=20, max_digits=30, null=True),
        ),
        migrations.AddField(
            model_name='payments',
            name='longitude',
            field=models.DecimalField(decimal_places=20, max_digits=30, null=True),
        ),
    ]
