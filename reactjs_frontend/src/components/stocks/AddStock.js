import { useEffect, useState } from "react";
import Base from "../../Base";
import { add_stock } from "./helper/userstocksapicalls";

const AddStock = (props) => {
    const [symbol, setSymbol] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const symbolFieldHandler = (event) => {
        let val = event.target.value
        setSymbol(val);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        add_stock(localStorage.getItem('token'), symbol).then(response => {
            if (response.code === '0') {
                setError('Symbol already exists in your list!');
            } else {
                setSuccess(`${symbol} Stock added!`)
                setError('')
                setSymbol('')
            }
        });
    }
    const isSuccess = success !== '';
    const hasError = error !== '';
    return (
        <Base>
            <div className="row m-5">
                {hasError &&
                    <div className="alert text-center col-4 alert-danger"> {error}</div>
                }
                {isSuccess &&
                    <div className="alert text-center col-4 alert-success"> {success}</div>
                }
                <form onSubmit={onSubmitHandler}>
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="inputPassword6" className="col-form-label">Stock Symbol</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="textinp" className="form-control"
                                onChange={symbolFieldHandler} />
                        </div>
                        <div class="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Must be 8-20 characters long.
                            </span>
                        </div>
                        <div className="col-auto">
                            <button type="submit" class="btn btn-danger ">Add Stock</button>
                        </div>
                    </div>
                </form>

            </div>


        </Base >
    );
}

export default AddStock;