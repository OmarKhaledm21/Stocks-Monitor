import React, { useState, useEffect } from 'react';
import { get_stocks, remove_stock } from './helper/userstocksapicalls';
import Base from "../../Base";
import StockListItem from './StockListItem';


const UserStocks = (props) => {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteItem, setDeleteItem] = useState('')
    useEffect(() => {
        let mounted = true;
        let token = localStorage.getItem('token');
        get_stocks(token).then(items => {
            if (mounted) {
                setStocks(items.stock_profiles);
                setLoading(false);
            }
        });
        if (deleteItem !== '') {
            remove_stock(token, deleteItem)
            setDeleteItem('')
        }
        return () => mounted = false;
    }, [deleteItem]);

    const removeItemHandler = (symbol) => {
        const new_stocks = stocks.filter((stock) => {
            return stock.symbol !== symbol;
        })
        setStocks(new_stocks);
        setDeleteItem(symbol);
    }

    const stocks_array = stocks.map((stock) => {
        console.log(stock)
        for (var key in stock) {
            if (stock[key] === null || stock[key] === '') {
                stock[key] = "NOT AVAILABLE";
            }
        }
        return (
            <StockListItem
                onRemoveItem={removeItemHandler}
                key={stock.symbol} stock={stock} />
        );
    })

    return (
        <Base>
            {loading &&
                <div className='row m-5 justify-content-center'>
                    <div className="spinner-grow text-primary m-2" role="status">
                    </div>
                    <div className="spinner-grow text-secondary m-2" role="status">
                    </div>
                    <div className="spinner-grow text-success m-2" role="status">
                    </div>
                    <div className="spinner-grow text-danger m-2" role="status">
                    </div>
                    <div className="spinner-grow text-warning m-2" role="status">
                    </div>
                    <div className="spinner-grow text-info m-2" role="status">
                    </div>
                    <div className="spinner-grow text-dark m-2" role="status">
                    </div>

                </div>
            }
            <div className="container">
                <div className="row d-flex">
                    {stocks_array}
                </div>
            </div>
        </Base>
    );
}

export default UserStocks;