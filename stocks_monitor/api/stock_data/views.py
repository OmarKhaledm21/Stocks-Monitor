from stocks_monitor.settings import API_KEY
import requests
from .models import StockData

# Create your views here.
# GET A PROFILE BY SYMBOL
# https://finnhub.io/api/v1/stock/profile2?symbol=AAPL


def refresh_stock_data():
    # GET ALL COMPANIES AND SYMBOLS
    # https://finnhub.io/api/v1/stock/symbol?exchange=US

    if not StockData.objects.exists():
        stock_data_reponse = requests.get(
            f"https://finnhub.io/api/v1/stock/symbol?exchange=US&token={API_KEY}")
        if stock_data_reponse.status_code == 200:
            stock_data = stock_data_reponse.json()
            bulk_list = []
            for stock in stock_data:
                bulk_list.append(StockData(
                    currency=stock['currency'], description=stock['description'], symbol=stock['symbol']))
            StockData.objects.bulk_create(bulk_list)
    return True


def get_symbol_list():
    return list(StockData.objects.all().values('symbol', 'id'))


# https://finnhub.io/api/v1/quote?symbol=AAPL&token=
def get_stock_data(symbol):
    data = StockData.objects.get(symbol=symbol)

    api_data = requests.get(
        f"https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={API_KEY}")

    json_data = api_data.json()

    live_data = requests.get(
        f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={API_KEY}")
    json_live_data = live_data.json()

    stock_obj = {

        'currency': data.currency,
        'description': data.description,
        'symbol': symbol,

        "country": json_data.get('country'),
        "currency": json_data.get('currency'),
        "exchange": json_data.get('exchange'),
        "finnhubIndustry": json_data.get('finnhubIndustry'),
        "ipo": json_data.get('ipo'),
        "logo": json_data.get('logo'),
        "marketCapitalization": json_data.get('marketCapitalization'),
        "name": json_data.get('name'),
        "phone": json_data.get('phone'),
        "shareOutstanding": json_data.get('shareOutstanding'),
        "ticker": json_data.get('ticker'),
        "weburl": json_data.get('weburl'),

        "current_price": json_live_data['c'],
        "high": json_live_data['h'],
        "low": json_live_data['l']

    }

    return stock_obj


def get_stock_live_data(symbol):
    live_data = requests.get(
        f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={API_KEY}")
    json_live_data = live_data.json()
    stock_obj = {
        "current_price": json_live_data['c'],
        "high": json_live_data['h'],
        "low": json_live_data['l']

    }
    return stock_obj
