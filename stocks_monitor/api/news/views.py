import requests
from django.http import JsonResponse
from stocks_monitor.settings import API_KEY
# Create your views here.


def fetch_news(request):
    news_req = requests.get(
        f"https://finnhub.io/api/v1/news?category=general&token={API_KEY}")
    if news_req.status_code == 200:
        news_json = news_req.json()
        return JsonResponse({'news': news_json})
    return JsonResponse({'error': 'could not get latest news.'})
