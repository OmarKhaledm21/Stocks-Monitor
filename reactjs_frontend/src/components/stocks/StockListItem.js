import styles from './StockListItem.module.css';

const StockListItem = (props) => {
    const { stock } = props;

    const onRemoveItem = (symbol) => {
        console.log(symbol)
        props.onRemoveItem(symbol);
    }
    return (
        <div className={`${styles.shadow} col-4 `}>
            <section className="mx-auto my-5" style={{ maxWidth: '23rem' }}>

                <div className="card">
                    <div className="card-body d-flex flex-row">
                        <img src={stock.logo} className="rounded-circle me-3" height="50px"
                            width="50px" />
                        <div>
                            <h5 className="card-title font-weight-bold mb-2">{stock.name}</h5>
                            <p className="card-text"><i className="far fa-clock pe-2"></i>{stock.ipo}</p>
                        </div>
                    </div>

                    <div className="card-body">
                        <p className={`card-text ${styles.ib}`} id="collapseContent">
                            Country: {stock.country}<br />
                            Industry: {stock.finnhubIndustry}<br />
                            Symbol: {stock.symbol}<br />
                            Exchange: {stock.exchange}<br />
                            Current Stock Price: {stock.current_price}$<br />
                            Low: {stock.low}$<br />
                            High: {stock.high}$<br />

                        </p>
                        <div className="d-flex justify-content-between">
                            <a className="btn btn-link link-danger p-md-1 my-1" data-mdb-toggle="collapse" href={stock.weburl}
                                role="button" aria-expanded="false" aria-controls="collapseContent">Company URL</a>
                            <div>
                                <i className="fa fa-share-alt text-muted p-md-1 my-1 me-2" data-mdb-toggle="tooltip"
                                    data-mdb-placement="top" title="Share this stock"></i>
                                <button style={{ all: 'unset' }} onClick={() => onRemoveItem(stock.symbol)}>
                                    <i className="fa fa-remove text-muted p-md-1 my-1 me-0" data-mdb-toggle="tooltip" data-mdb-placement="top"
                                        title="Remove" >
                                    </i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default StockListItem;