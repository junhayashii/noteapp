from django.db import models

class Note(models.Model):
    title = models.TextField(unique=True)
    body = models.TextField(null=True, blank=True)
    update = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.title:
            base_title = "Untitled"
            unique_title = base_title
            index = 1

            while Note.objects.filter(title=unique_title).exists():
                unique_title = f"{base_title}{index}"
                index += 1

            self.title = unique_title

        super().save(*args, **kwargs)

    def __str__(self):
        return self.body[0:50]