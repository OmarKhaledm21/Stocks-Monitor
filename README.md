# Stocks-Monitor
#### - This website was developed using Python Django, Django Rest Framework, PostgreSQL, ReactJS, CSS, Boostrap CSS 5.
#### - This website allows users to Add some Stocks to a list and them can visit that page and view those stocks information like current price, low, high etc.
#### - User can also see latest news on worlds economics which are fetch from finnHub API through backend and sent to frontend.
#### - User must signup and login to view his stocks, add stocks and edit his profile info like image, password etc.
#### - News page can viewed even if user is not logged in and user can click on any news to go to their url.
#### - User can remove a stock from his list or share it with a friend and user added stocks are being checked on a database containting 25K+ stock symbols fetched from finnHub API so as to validate stock name.

##### - User Stocks Page
- User stocks are retrived from backend database table that contains user-stock relations as two foriegn keys to user_id and stock_id in user and stockdata tables.
- Stock Prices and other live data are fetched from finnhub API once request is made.
<img src="https://github.com/OmarKhaledm21/Stocks-Monitor/blob/main/SS/User%20Stocks%20Page.png" />


##### - User Profile Page
- User data is fetched from database User Model and any data updates are accompanied with custom user TOKEN to authenticate user and update data then page is refreshed.
- Django User Model 'AbstractUser' is extended to support extra fields.
<img src="https://github.com/OmarKhaledm21/Stocks-Monitor/blob/main/SS/User%20Profile.png" />


##### - User Add Stock Page
- User adds a stock by its Symbol and symbol is checked in database to ensure this stock symbol is valid.
<img src="https://github.com/OmarKhaledm21/Stocks-Monitor/blob/main/SS/Add%20Stock.png" />

##### - Page Loading
- Loading buffer for news and user stocks page
<img src="https://github.com/OmarKhaledm21/Stocks-Monitor/blob/main/SS/Loading.png" />

##### - News Home Page
- New are fetched from API each time user refreshes the page.
<img src="https://github.com/OmarKhaledm21/Stocks-Monitor/blob/main/SS/User%20News.png" />


##### - User Signup Page
<img src="https://github.com/OmarKhaledm21/Stocks-Monitor/blob/main/SS/Signup.png" />


##### - Footer Page
<img src="https://github.com/OmarKhaledm21/Stocks-Monitor/blob/main/SS/Footer.png" />


##### - RestJS Frontend Project Structure
<img src="https://github.com/OmarKhaledm21/Stocks-Monitor/blob/main/SS/react%20structure.png" />

