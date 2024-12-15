
# proxy views for storage service


from django.http import HttpResponse

from minio_storage.storage import MinioMediaStorage


@api_view(['GET'])
def minio_media_proxy(request, path):
    """
    API endpoint to proxy media from Minio storage.
    """
    storage = MinioMediaStorage()
    try:
        file = storage.open(path)
        response = HttpResponse(file.read())
        response["Content-Type"] = file.content_type
        return response
    except Exception as e:
        return HttpResponse(f"Error fetching file: {str(e)}", status=500)