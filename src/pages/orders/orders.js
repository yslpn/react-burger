import FeedItem from "../../components/feed-item/feed-item"
import styles from './orders.module.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ProfileNav } from 'components/profile-nav';

const orders = [
    {
        _id: '613df8693608f0001eb92c42',
        ingredients: [
            '60d3b41abdacab0026a733c6',
            '60d3b41abdacab0026a733cf',
            '60d3b41abdacab0026a733ce',
            '60d3b41abdacab0026a733cf',
            '60d3b41abdacab0026a733c6'
        ],
        status: 'done',
        name: 'Краторный антарианский традиционный-галактический бургер',
        createdAt: '2021-09-12T12:54:01.182Z',
        updatedAt: '2021-09-12T12:54:01.262Z',
        number: 2628
    },
    {
        _id: '613df7b93608f0001eb92c41',
        ingredients: [
            '60d3b41abdacab0026a733c6',
            '60d3b41abdacab0026a733cf',
            '60d3b41abdacab0026a733c9',
            '60d3b41abdacab0026a733ce',
            '60d3b41abdacab0026a733c8',
            '60d3b41abdacab0026a733c6'
        ],
        status: 'done',
        name: 'Краторный бессмертный люминесцентный антарианский традиционный-галактический бургер',
        createdAt: '2021-09-12T12:51:05.866Z',
        updatedAt: '2021-09-12T12:51:05.943Z',
        number: 2627
    },
    {
        _id: '613df2ae3608f0001eb92c3e',
        ingredients: [
            '60d3b41abdacab0026a733c6',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cc'
        ],
        status: 'done',
        name: 'Краторный space spicy бургер',
        createdAt: '2021-09-12T12:29:34.973Z',
        updatedAt: '2021-09-12T12:29:35.090Z',
        number: 2626
    },
    {
        _id: '613dd3493608f0001eb92c34',
        ingredients: [
            '60d3b41abdacab0026a733cb',
            '60d3b41abdacab0026a733c6',
            '60d3b41abdacab0026a733c6'
        ],
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2021-09-12T10:15:37.609Z',
        updatedAt: '2021-09-12T10:15:37.677Z',
        number: 2625
    },
    {
        _id: '613cf8a63608f0001eb92be9',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cf'
        ],
        status: 'done',
        name: 'Антарианский space флюоресцентный бургер',
        createdAt: '2021-09-11T18:42:46.192Z',
        updatedAt: '2021-09-11T18:42:46.241Z',
        number: 2624
    },
    {
        _id: '613cf5e23608f0001eb92be3',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cf'
        ],
        status: 'done',
        name: 'Spicy антарианский space флюоресцентный бургер',
        createdAt: '2021-09-11T18:30:58.410Z',
        updatedAt: '2021-09-11T18:30:58.538Z',
        number: 2623
    },
    {
        _id: '613cf3dc3608f0001eb92bdf',
        ingredients: [
            '60d3b41abdacab0026a733c6',
            '60d3b41abdacab0026a733c9',
            '60d3b41abdacab0026a733ce',
            '60d3b41abdacab0026a733c8',
            '60d3b41abdacab0026a733cf',
            '60d3b41abdacab0026a733cb',
            '60d3b41abdacab0026a733c6'
        ],
        status: 'done',
        name: 'Краторный бессмертный люминесцентный антарианский традиционный-галактический био-марсианский бургер',
        createdAt: '2021-09-11T18:22:20.974Z',
        updatedAt: '2021-09-11T18:22:21.038Z',
        number: 2622
    },
    {
        _id: '613cf3a33608f0001eb92bde',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Spicy флюоресцентный бургер',
        createdAt: '2021-09-11T18:21:23.175Z',
        updatedAt: '2021-09-11T18:21:23.235Z',
        number: 2621
    },
    {
        _id: '613ce9d43608f0001eb92bd4',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-11T17:39:32.931Z',
        updatedAt: '2021-09-11T17:39:33.031Z',
        number: 2620
    },
    {
        _id: '613ce9023608f0001eb92bd3',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-11T17:36:02.787Z',
        updatedAt: '2021-09-11T17:36:02.850Z',
        number: 2619
    },
    {
        _id: '613ce8d33608f0001eb92bd2',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-11T17:35:15.627Z',
        updatedAt: '2021-09-11T17:35:15.736Z',
        number: 2618
    },
    {
        _id: '613ce7743608f0001eb92bd1',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-11T17:29:24.985Z',
        updatedAt: '2021-09-11T17:29:25.069Z',
        number: 2617
    },
    {
        _id: '613ce6453608f0001eb92bd0',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-11T17:24:21.839Z',
        updatedAt: '2021-09-11T17:24:21.926Z',
        number: 2616
    },
    {
        _id: '613ce5de3608f0001eb92bcf',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-11T17:22:38.841Z',
        updatedAt: '2021-09-11T17:22:38.909Z',
        number: 2615
    },
    {
        _id: '613ce2af3608f0001eb92bcd',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-11T17:09:03.973Z',
        updatedAt: '2021-09-11T17:09:04.039Z',
        number: 2614
    },
    {
        _id: '613ce2263608f0001eb92bcc',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-11T17:06:46.722Z',
        updatedAt: '2021-09-11T17:06:46.833Z',
        number: 2613
    },
    {
        _id: '613ce14a3608f0001eb92bca',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-11T17:03:06.676Z',
        updatedAt: '2021-09-11T17:03:06.760Z',
        number: 2612
    },
    {
        _id: '613ce0733608f0001eb92bc9',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cc'
        ],
        status: 'done',
        name: 'Spicy флюоресцентный бургер',
        createdAt: '2021-09-11T16:59:31.069Z',
        updatedAt: '2021-09-11T16:59:31.111Z',
        number: 2611
    },
    {
        _id: '613cdeb63608f0001eb92bc4',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-11T16:52:06.056Z',
        updatedAt: '2021-09-11T16:52:06.136Z',
        number: 2610
    },
    {
        _id: '613cdb923608f0001eb92bc3',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-11T16:38:42.267Z',
        updatedAt: '2021-09-11T16:38:42.355Z',
        number: 2609
    },
    {
        _id: '613cdb873608f0001eb92bc2',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-11T16:38:31.941Z',
        updatedAt: '2021-09-11T16:38:32.016Z',
        number: 2608
    },
    {
        _id: '613cdb843608f0001eb92bc1',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-11T16:38:28.093Z',
        updatedAt: '2021-09-11T16:38:28.238Z',
        number: 2607
    },
    {
        _id: '613cb70b3608f0001eb92baf',
        ingredients: [
            '60d3b41abdacab0026a733c6',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733c6'
        ],
        status: 'done',
        name: 'Краторный spicy бургер',
        createdAt: '2021-09-11T14:02:51.054Z',
        updatedAt: '2021-09-11T14:02:51.117Z',
        number: 2606
    },
    {
        _id: '613ba9293608f0001eb92b6f',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-10T18:51:21.501Z',
        updatedAt: '2021-09-10T18:51:21.617Z',
        number: 2605
    },
    {
        _id: '613b998d3608f0001eb92b68',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cf'
        ],
        status: 'done',
        name: 'Антарианский space флюоресцентный бургер',
        createdAt: '2021-09-10T17:44:45.373Z',
        updatedAt: '2021-09-10T17:44:45.456Z',
        number: 2604
    },
    {
        _id: '613b99693608f0001eb92b67',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-10T17:44:09.681Z',
        updatedAt: '2021-09-10T17:44:09.743Z',
        number: 2603
    },
    {
        _id: '613b99013608f0001eb92b65',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-10T17:42:25.811Z',
        updatedAt: '2021-09-10T17:42:25.916Z',
        number: 2602
    },
    {
        _id: '613b756e3608f0001eb92b4d',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-10T15:10:38.186Z',
        updatedAt: '2021-09-10T15:10:38.316Z',
        number: 2601
    },
    {
        _id: '613b71783608f0001eb92b4b',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733ce',
            '60d3b41abdacab0026a733ca',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733c9',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Бессмертный метеоритный традиционный-галактический space флюоресцентный бургер',
        createdAt: '2021-09-10T14:53:44.303Z',
        updatedAt: '2021-09-10T14:53:44.429Z',
        number: 2600
    },
    {
        _id: '6139faae47707f001b152fdf',
        ingredients: [
            '60d3b41abdacab0026a733cf',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733ce',
            '60d3b41abdacab0026a733cf',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Spicy традиционный-галактический флюоресцентный антарианский бургер',
        createdAt: '2021-09-09T12:14:38.979Z',
        updatedAt: '2021-09-09T12:14:39.095Z',
        number: 2599
    },
    {
        _id: '6138b6ad47707f001b152f9b',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cf',
            '60d3b41abdacab0026a733d1'
        ],
        status: 'done',
        name: 'Антарианский space флюоресцентный фалленианский бургер',
        createdAt: '2021-09-08T13:12:13.521Z',
        updatedAt: '2021-09-08T13:12:13.563Z',
        number: 2598
    },
    {
        _id: '6138b69547707f001b152f9a',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T13:11:49.064Z',
        updatedAt: '2021-09-08T13:11:49.161Z',
        number: 2597
    },
    {
        _id: '6138b51347707f001b152f96',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-08T13:05:23.021Z',
        updatedAt: '2021-09-08T13:05:23.084Z',
        number: 2596
    },
    {
        _id: '6138b4fd47707f001b152f94',
        ingredients: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T13:05:01.317Z',
        updatedAt: '2021-09-08T13:05:01.376Z',
        number: 2595
    },
    {
        _id: '6138b4e747707f001b152f93',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cf'
        ],
        status: 'done',
        name: 'Антарианский space флюоресцентный бургер',
        createdAt: '2021-09-08T13:04:39.724Z',
        updatedAt: '2021-09-08T13:04:39.767Z',
        number: 2594
    },
    {
        _id: '6138b46d47707f001b152f91',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733d3',
            '60d3b41abdacab0026a733d2',
            '60d3b41abdacab0026a733d2',
            '60d3b41abdacab0026a733d1',
            '60d3b41abdacab0026a733d0'
        ],
        status: 'done',
        name: 'Spicy фалленианский экзо-плантаго флюоресцентный альфа-сахаридный минеральный space бургер',
        createdAt: '2021-09-08T13:02:37.553Z',
        updatedAt: '2021-09-08T13:02:37.618Z',
        number: 2593
    },
    {
        _id: '6138aeef47707f001b152f8c',
        ingredients: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:39:11.223Z',
        updatedAt: '2021-09-08T12:39:11.319Z',
        number: 2592
    },
    {
        _id: '6138aee747707f001b152f8b',
        ingredients: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:39:03.317Z',
        updatedAt: '2021-09-08T12:39:03.438Z',
        number: 2591
    },
    {
        _id: '6138ae9747707f001b152f88',
        ingredients: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:37:43.225Z',
        updatedAt: '2021-09-08T12:37:43.303Z',
        number: 2590
    },
    {
        _id: '6138ae9247707f001b152f87',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:37:38.474Z',
        updatedAt: '2021-09-08T12:37:38.581Z',
        number: 2589
    },
    {
        _id: '6138ae7447707f001b152f86',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-08T12:37:08.698Z',
        updatedAt: '2021-09-08T12:37:08.741Z',
        number: 2588
    },
    {
        _id: '6138ae5e47707f001b152f85',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:36:46.702Z',
        updatedAt: '2021-09-08T12:36:46.755Z',
        number: 2587
    },
    {
        _id: '6138ae4647707f001b152f84',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:36:22.124Z',
        updatedAt: '2021-09-08T12:36:22.238Z',
        number: 2586
    },
    {
        _id: '6138ad9f47707f001b152f83',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2021-09-08T12:33:35.363Z',
        updatedAt: '2021-09-08T12:33:35.562Z',
        number: 2585
    },
    {
        _id: '6138ad8647707f001b152f82',
        ingredients: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:33:10.265Z',
        updatedAt: '2021-09-08T12:33:10.365Z',
        number: 2584
    },
    {
        _id: '6138ad7147707f001b152f81',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:32:49.363Z',
        updatedAt: '2021-09-08T12:32:49.484Z',
        number: 2583
    },
    {
        _id: '6138ad2047707f001b152f80',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2021-09-08T12:31:28.641Z',
        updatedAt: '2021-09-08T12:31:28.768Z',
        number: 2582
    },
    {
        _id: '6138ad0747707f001b152f7f',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cf',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cf'
        ],
        status: 'done',
        name: 'Антарианский space флюоресцентный бургер',
        createdAt: '2021-09-08T12:31:03.473Z',
        updatedAt: '2021-09-08T12:31:03.579Z',
        number: 2581
    },
    {
        _id: '6138acf247707f001b152f7e',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733cc'
        ],
        status: 'done',
        name: 'Spicy space флюоресцентный бургер',
        createdAt: '2021-09-08T12:30:42.749Z',
        updatedAt: '2021-09-08T12:30:42.874Z',
        number: 2580
    },
    {
        _id: '6138aa3b47707f001b152f7c',
        ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733cf'
        ],
        status: 'done',
        name: 'Spicy антарианский space флюоресцентный бургер',
        createdAt: '2021-09-08T12:19:07.879Z',
        updatedAt: '2021-09-08T12:19:07.930Z',
        number: 2579
    }
]

const OrdersPage = () => {
    const { userLogged } = useSelector(store => ({
        userLogged: store.login.userLogged
    }));

    return (
        !userLogged ? <Redirect to={'/login'} /> :
            <section>
                <div className={styles.wrapper}>
                    <ProfileNav>
                        В этом разделе вы можете просмотреть свою историю заказов
                    </ProfileNav>
                    <ul className={`${styles.main__content_item} ${styles.main__feed_list}`}>
                        <>
                            {orders.map((item, index) => (
                                <li className={styles.list__item} key={index}>
                                    <FeedItem item={item} link='orders'/>
                                </li>
                            ))}
                        </>
                    </ul>
                </div>
            </section>
    );
}

export default OrdersPage;