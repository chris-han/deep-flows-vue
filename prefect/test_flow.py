# test_flow.py
from prefect import task, flow
from yahoo_fin.stock_info import get_data
from datetime import datetime, timedelta
import pandas as pd
from functools import lru_cache

from yahoo_fin.stock_info import get_data
import pandas as pd
import numpy as np
from functools import lru_cache
from datetime import datetime

@lru_cache(maxsize=128)  # You can set the maxsize to the desired cache size
def get_data_with_cache(ticker, start_date, end_date, index_as_date=True, interval="1d"):
    # Ensure that the start_date and end_date are strings to be used in cache key
    if isinstance(start_date, datetime):
        start_date = start_date.strftime('%Y-%m-%d')
    if isinstance(end_date, datetime):
        end_date = end_date.strftime('%Y-%m-%d')

    # Here, we call the original get_data function
    return get_data(ticker, start_date=start_date, end_date=end_date, index_as_date=index_as_date, interval=interval)

@task
def get_latest_stock_quote(ticker):
# Example usage
    ticker='OKLO'
    data = get_data_with_cache(ticker, '10/01/2024', '11/30/2024')

    # Download Data
    # data = get_data('NVDA', start_date='10/01/2024', end_date='11/29/2024',index_as_date = True, interval="1d")
    df = pd.DataFrame(data)
    df.index = pd.to_datetime(df.index)
    df.index.name = 'datetime'
    # Rename the columns to match CustomPandasData expectations
    # df.columns = ['close', 'close_no_use', 'high', 'low', 'open', 'volume']

    # Clean and prepare data
    df.dropna(inplace=True)  # Remove rows with NaN values

    # Calculate daily log returns
    df['log_return'] = np.log(df['close'] / df['close'].shift(1))
    df.dropna(inplace=True)  # Remove NaN values after log return calculation
    return df

@task
def print_quote(df):    
        # print(quote)
    ticker = df['ticker']
    quote = df['close'].iloc[-1]  # Get the latest closing price
    # how to output print statement to appear in prefect log    
    print(f"Latest Closing Price for {ticker} as of {df['close'].index[-1].strftime('%Y-%m-%d')}: {quote}")


@flow(name="stock-flow")  # Define the flow name
def stock_flow(ticker = 'OKLO'):
    # Example usage
    ticker = ticker
    df = get_latest_stock_quote(ticker)
    print_quote(df)



if __name__ == "__main__":
    stock_flow('OKLO')  