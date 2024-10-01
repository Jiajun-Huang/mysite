from typing import Iterable

from blogs.models import Blog
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
COMMENT_TYPES = ((0, "Blog"), (1, "Page"), (2, "Unknown"))


class Comment(models.Model):
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)
    blog = models.ForeignKey(
        Blog, on_delete=models.CASCADE, null=True, blank=True
    )  # belongs to which blog can be null if it is a page comment
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reply = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="reply_to"
    )  # reply comment to another comment (root or comments under root)
    root = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="root_comment",
    )  # root comment
    type = models.IntegerField(
        choices=COMMENT_TYPES, default=2
    )  # 0 for blog, 1 for page, 2 for unknown

    def __str__(self):
        return self.content
