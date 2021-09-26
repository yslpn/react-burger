import styles from './orders-table.module.css';
import { useSelector } from 'react-redux';
import { RootState } from 'index';
import { FC } from 'react';
import { TOrder } from "types";

const OrdersTable: FC = () => {
    const { feedOrders, total, totalToday } = useSelector((store: RootState) => ({
        feedOrders: store.ws.feedOrders,
        total: store.ws.total,
        totalToday: store.ws.totalToday,
    }));
    
    const doneItems: TOrder[]  = feedOrders.filter((item: TOrder): boolean => item.status === "done")
    const pendingItems: TOrder[] = feedOrders.filter((item: TOrder): boolean => item.status === "pending")

    return (
        <section className={styles.wrapper}>
            <div className={styles.status_block}>
                <div className={styles.column}>
                    <p className="text text_type_main-medium mb-6">
                        Готовы:
                    </p>
                    <ul className={styles.items} style={{ color: '#00CCCC' }}>
                        {doneItems.map((item, index) => {
                            if (index < 10) {
                                return <li className="text text_type_digits-default mb-2" key={item._id} >{item.number}</li>
                            }
                            return null;
                        }
                        )}
                    </ul>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-medium">
                        В работе:
                    </p>
                    <ul className={styles.items}>
                        {pendingItems.map((item, index) => {
                            if (index < 10) {
                                return <li className="text text_type_digits-default mb-2" key={item._id} >{item.number}</li>
                            }
                            return null;
                        }
                        )}
                    </ul>
                </div>
            </div>
            <div className={styles.total_block}>
                <p className="text text_type_main-medium">
                    Выполнено за все время:
                </p>
                <p className={`${styles.total} text text_type_digits-large`}>
                    {total}
                </p>
            </div>
            <div className={styles.total_block}>
                <p className='text text_type_main-medium'>
                    Выполнено за сегодня:
                </p>
                <p className={`${styles.total} text text_type_digits-large`}>
                    {totalToday}
                </p>
            </div>
        </section>
    )
};

export default OrdersTable;