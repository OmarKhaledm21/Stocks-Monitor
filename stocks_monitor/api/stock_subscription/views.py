from api.stock_data.models import StockData
from api.stock_data.views import get_stock_data, get_stock_live_data, get_symbol_list

from .models import UserStocks
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.


def get_user_stocks(request):
    token = request.GET['token']
    UserModel = get_user_model()
    user = UserModel.objects.get(token=token)

    user_stocks = list(UserStocks.objects.filter(
        user_id=user.id))
    stocks_list = []
    for stock in user_stocks:
        stock_obj = {
            'symbol': stock.stock.symbol,
            'id': stock.stock.id
        }
        stocks_list.append(stock_obj)

    return stocks_list


def filter_symbol_list(user_symbols, symbols):
    user_symbols_ids = []
    for symbol in user_symbols:
        user_symbols_ids.append(symbol['id'])

    filtered_list = []
    for symbol in symbols:
        if symbol['id'] not in user_symbols_ids:
            filtered_list.append(symbol)

    return filtered_list


class ManageUserStock(APIView):
    def get(self, request):
        user_stocks_profiles_list = []
        stocks = get_user_stocks(request)
        if len(stocks) == 0:
            return Response({'stock_profiles': []})

        for stock in stocks:
            user_stocks_profiles_list.append(get_stock_data(stock['symbol']))

        return Response({'stock_profiles': user_stocks_profiles_list})

    def post(self, request):
        symbol = request.GET['symbol'].upper()
        stock = StockData.objects.get(symbol=symbol)
        stock_id = stock.id
        token = request.GET['token']
        UserModel = get_user_model()
        user = UserModel.objects.get(token=token)
        if UserStocks.objects.filter(user_id=user.id, stock_id=stock_id).exists():
            return Response({'code': '0'})
        UserStocks.objects.create(user_id=user.id, stock_id=stock_id)
        return Response({'code': '1', 'message': 'stock added!'})
        # return redirect(reverse('add-stock')+f"?token={token}")

    def delete(self, request):
        token = request.GET['token']
        symbol = request.GET['symbol']

        UserModel = get_user_model()
        user = UserModel.objects.get(token=token)

        stock = StockData.objects.get(symbol=symbol)

        UserStocks.objects.filter(user_id=user.id, stock_id=stock.id).delete()

        return Response({'code': '1', 'message': 'Stock removed'})
