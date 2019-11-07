import mock from '@/fake-db/mock.js';

const data = {
  dispatchedOrders: [
    {
      orderNo: 879985,
      status: 'Moving',
      statusColor: 'success',
      operator: 'Cinar Knowles',
      operatorImg: require('@/assets/images/portrait/small/avatar-s-2.png'),
      usersLiked: [
        {
          name: 'Vennie Mostowy',
          img: require('@/assets/images/portrait/small/avatar-s-5.png')
        },
        {
          name: 'Elicia Rieske',
          img: require('@/assets/images/portrait/small/avatar-s-7.png')
        },
        {
          name: 'Julee Rossignol',
          img: require('@/assets/images/portrait/small/avatar-s-10.png')
        },
        {
          name: 'Darcey Nooner',
          img: require('@/assets/images/portrait/small/avatar-s-8.png')
        }
      ],
      location: 'Anniston, Alabama',
      distance: '130 km',
      distPercent: 80,
      startDate: '26/07/2018',
      estDelDate: '28/07/2018'
    },
    {
      orderNo: 156897,
      status: 'Pending',
      statusColor: 'warning',
      operator: 'Britany Ryder',
      operatorImg: require('@/assets/images/portrait/small/avatar-s-4.png'),
      usersLiked: [
        {
          name: 'Trina Lynes',
          img: require('@/assets/images/portrait/small/avatar-s-1.png')
        },
        {
          name: 'Lilian Nenez',
          img: require('@/assets/images/portrait/small/avatar-s-2.png')
        },
        {
          name: 'Alberto Glotzbach',
          img: require('@/assets/images/portrait/small/avatar-s-3.png')
        }
      ],
      location: 'Cordova, Alaska',
      distance: '234 km',
      distPercent: 60,
      startDate: '26/07/2018',
      estDelDate: '28/07/2018'
    },
    {
      orderNo: 568975,
      status: 'Moving',
      statusColor: 'success',
      operator: 'Kishan Ashton',
      operatorImg: require('@/assets/images/portrait/small/avatar-s-1.png'),
      usersLiked: [
        {
          name: 'Lai Lewandowski',
          img: require('@/assets/images/portrait/small/avatar-s-6.png')
        },
        {
          name: 'Elicia Rieske',
          img: require('@/assets/images/portrait/small/avatar-s-7.png')
        },
        {
          name: 'Darcey Nooner',
          img: require('@/assets/images/portrait/small/avatar-s-8.png')
        },
        {
          name: 'Julee Rossignol',
          img: require('@/assets/images/portrait/small/avatar-s-10.png')
        },
        {
          name: 'Jeffrey Gerondale',
          img: require('@/assets/images/portrait/small/avatar-s-9.png')
        }
      ],
      location: 'Florence, Alabama',
      distance: '168 km',
      distPercent: 70,
      startDate: '26/07/2018',
      estDelDate: '28/07/2018'
    },
    {
      orderNo: 245689,
      status: 'Canceled',
      statusColor: 'danger',
      operator: 'Anabella Elliott',
      operatorImg: require('@/assets/images/portrait/small/avatar-s-6.png'),
      usersLiked: [
        {
          name: 'Vennie Mostowy',
          img: require('@/assets/images/portrait/small/avatar-s-5.png')
        },
        {
          name: 'Elicia Rieske',
          img: require('@/assets/images/portrait/small/avatar-s-7.png')
        }
      ],
      location: 'Clifton, Arizona',
      distance: '125 km',
      distPercent: 95,
      startDate: '26/07/2018',
      estDelDate: '28/07/2018'
    }
  ]
};

mock.onGet('/api/table/dispatched-orders').reply(() => {
  return [200, data.dispatchedOrders];
});
