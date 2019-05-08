// pages/movie/movie.js
var { getMovieListData } = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    var _this = this;
    /*
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters?start=0&count=3',
      success:function(res){
        var data = res.data.subjects.map(function(item){
          return {
            coverImg:item.images.large,
            title:item.title,
            stars:item.rating.stars,
            score:item.rating.average
          }
        })
        _this.setData({
          inTheatersData:data
        })
      }
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon?start=0&count=3',
      success: function (res) {
        var data = res.data.subjects.map(function (item) {
          return {
            coverImg: item.images.large,
            title: item.title,
            stars: item.rating.stars,
            score: item.rating.average
          }
        })
        _this.setData({
          comingSoonData: data
        })
      }
    })
    */
    var baseUrl = app.GLOBAL_DATA.baseUrl;
    var inTheatersUrl =  baseUrl + 'v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = baseUrl + 'v2/movie/coming_soon?start=0&count=3';
    var top250Url = baseUrl + 'v2/movie/top250?start=0&count=3'; 
    getMovieListData(inTheatersUrl,function(data){
      _this.setData({
        inTheatersData: data,
        inTheatersTag:'正在热映',
        inTheatersType:'inTheaters'
      })      
    });
    getMovieListData(comingSoonUrl, function (data) {
      _this.setData({
        comingSoonData: data,
        comingSoonTag:'即将上映',
        comingSoonType:'comingSoon'
      })
    })
    getMovieListData(top250Url, function (data) {
      _this.setData({
        top250Data: data,
        top250Tag:'豆瓣Top250',
        top250Type:'top250'
      })
    })             
  },
  tapMore:function(ev){
    var type = ev.currentTarget.dataset.type;
    wx.navigateTo({
      url: './movie-more/movie-more?type='+type,
    })
  }
})