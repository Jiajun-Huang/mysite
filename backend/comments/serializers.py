from rest_framework import serializers
from users.serializers import UserSerializer

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Comment
        fields = "__all__"

class CommentCreateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'blog', 'reply', 'type', 'root']
    
    def validate(self, attrs):
        if attrs['type'] == 0 and not attrs['blog']:
            raise serializers.ValidationError("Blog is required")
        # if one of reply or root is null, the other should be null
        if not attrs['reply'] and attrs['root']:
            raise serializers.ValidationError("Reply is required")
        if not attrs['root'] and attrs['reply']:
            raise serializers.ValidationError("Root is required")

        return attrs
    def to_internal_value(self, data):
        type_value = data.get('type')
        if type_value != 0:
            # Temporarily remove 'blog' field from data for validation
            self.fields.pop('blog')
        validated_data = super().to_internal_value(data)
        return validated_data
    
class CommentTypeSerializer(serializers.Serializer):
    class Meta:
        fields = ['type', 'blog']

    def validate(self, attrs):
        if attrs['type'] == 0 and not attrs['blog']:
            raise serializers.ValidationError("Blog is required")
        return attrs
    
    def to_internal_value(self, data):
        type_value = data.get('type')
        if type_value != 0:
            # Temporarily remove 'blog' field from data for validation
            self.fields.pop('blog')
        validated_data = super().to_internal_value(data)
        return validated_data
    
class CommentNestedSerializer(CommentSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"

    def get_replies(self, obj):
        replies = Comment.objects.filter(root=obj).order_by('created_at')
        return CommentSerializer(replies, many=True).data




class CommentGetSerializer(serializers.Serializer):
    root_comment = CommentSerializer()
    replies = CommentSerializer(many=True)
