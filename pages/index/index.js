//index.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    console.log('index=====onLoad');
    // app.getSessionKeyByLogin();
  },
  data: {
    imgUrls: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515645717679&di=7ea250f0c198c22ccdc528a19102773d&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fhousejingzhou%2Fpics%2Fhv1%2F82%2F101%2F171%2F11145112.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515645694905&di=71c5a3c6a19bc6e9d10d28d092ffb281&imgtype=0&src=http%3A%2F%2Fwww.cnhubei.com%2Fxwzt%2F2017%2Fqwfszjelt%2Felyx%2F201705%2FW020170504445632794208.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //	滑动动画时长1s
    
    navItems:[
      {
        name:'部门管理',
        url:'deptList',
        imageUrl:'/image/iocn_home_02.png'
      },
      {
        name:'人力管理',
        url:'games',
        isSplot: true,
        imageUrl: '/image/iocn_home_01.png'
      },
      {
        name:'职位管理',
        url: 'out',
        imageUrl: '/image/iocn_home_03.png'
      },
      {
        name:'服务项目管理',
        url: 'bill',
        imageUrl: '/image/iocn_home_04.png'
      }
    ],

    venuesItems:[
        {
            id:"471",
            title:"喜多多 椰果王礼盒 200ml*10罐",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"30.00",
            money:"31.80"
        },
        {
            id:"470",
            title:"喜多多 牛奶花生 370g*12罐",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"32.00",
            money:"36.00"
        },
        {
            id:"469",
            title:"喜多多 桂圆莲子八宝粥 360g*12罐",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"32.00",
            money:"36.00"
        },
        {
            id:"468",
            title:"喜多多 冰糖雪梨椰果 280g*12罐",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"38.00",
            money:"42.00"
        },
        {
            id:"467",
            title:"喜多多 什锦椰果罐头 370g 整箱12瓶 果肉果粒",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"38.00",
            money:"42.00"
        },
        {
            id:"463",
            title:"好丽友派 巧克力清新抹茶味216g",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"10.00",
            money:"11.00"
        },
    ],
    choiceItems:[
       {
            id:"467",
            title:"喜多多 什锦椰果罐头 370g 整箱12瓶 果肉果粒",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"38.00",
            money:"42.00"
        },
        {
            id:"463",
            title:"好丽友派 巧克力清新抹茶味216g",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"10.00",
            money:"11.00"
        },
        {
            id:"471",
            title:"喜多多 椰果王礼盒 200ml*10罐",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"30.00",
            money:"31.80"
        },
        {
            id:"470",
            title:"喜多多 牛奶花生 370g*12罐",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"32.00",
            money:"36.00"
        },
        {
            id:"469",
            title:"喜多多 桂圆莲子八宝粥 360g*12罐",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"32.00",
            money:"36.00"
        },
        {
            id:"468",
            title:"喜多多 冰糖雪梨椰果 280g*12罐",
            imgurl:"http://pic35.photophoto.cn/20150625/0016028548222793_b.jpg",
            price:"38.00",
            money:"42.00"
        }  
    ]

  }
    
})
