import styles from './ListItem.module.css';

const ListItem = (props) => {
    const { item } = props;

    const dateTime = new Date(item.datetime * 1000)
    const dateString = `Date: ${dateTime.getDate()}/
        ${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`

    return (
        <a href={item.url} target="_blank" className={styles.blank_a}>
            <li className={`row m-4 ${styles.news_item}`}>
                <div className={`col ${styles.fill} img`} style={{ backgroundImage: `url(${item.image})` }}>
                </div>
                <div className={`col-10`}>
                    <div className={`${styles.headline} row`}>
                        {item.headline}
                    </div>
                    <div className={`${styles.info} row`}>
                        {dateString}<br />
                        Category: {item.category}<br />
                        Source: {item.source}<br />
                    </div>
                </div>
            </li >
        </a >
    );
}

export default ListItem;