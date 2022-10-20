import { useEffect, useState } from "react";
import styles from './Home.module.css'
import { get_news } from "./helper/newsapicall";
import ListItem from "../UI/ListItem";
import Base from "../../Base";

const Home = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let mounted = true;
        get_news().then(items => {
            if (mounted) {
                setNews(items.news);
                setLoading(false);
            }
        });
        return () => mounted = false;
    }, []);


    const news_array = news.map((item) => {
        return (
            <ListItem
                key={item.id} item={item} />
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
            <div className="container-fluid">
                {news_array}
            </div>
        </Base>
    );
}

export default Home;
