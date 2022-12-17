from django.db import models

from account.models import User


class ProjectApplication(models.Model):
    WORK_TYPES = [
        ('PREP', 'Подготовительные'),
        ('GEOD', 'Геодезические'),
        ('ZEM', 'Земляные'),
        ('UST', 'Устройство скважин'),
        ('SWAI', 'Свайные работы. Крепление грунтов'),
        ('ZBI', 'Устройство бетонных и железнобетонных монолитных конструкций'),
        ('MON', 'Монтаж сборных бетонных и железнобетонных конструкций'),
        ('BOM', 'Буровзрывные работы при строительстве')
    ]

    APP_STATUS = [
        ('DRAFT', 'Проект заявки'),
        ('SELECTION_PROCESS', 'Осуществляется набор'),
        ('PERFORMER_APPOINTED', 'Исполнитель назначен'),
        ('FINISHED', 'Завершенные')
    ]

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="apps", unique=False)

    title = models.CharField("Название проекта", max_length=255)
    description = models.TextField("Описание проекта")

    work_type = models.CharField('Вид работ', choices=WORK_TYPES, max_length=255)
    deadline_from = models.DateField('Дата начала работ')
    deadline_to = models.DateField('Дата окончания работ')
    budget_from = models.IntegerField('Старт бюджета')
    budget_to = models.IntegerField('Лимит бюджета')
    tasks = models.JSONField('Список задач', default=list)

    status = models.CharField('Статус заявки', choices=APP_STATUS, max_length=255)

    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)

    objects = models.Manager()


    
    