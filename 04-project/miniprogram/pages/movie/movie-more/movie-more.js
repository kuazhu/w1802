var { getMovieListData } = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var type = options.type;
    var baseUrl = app.GLOBAL_DATA.baseUrl;
    var requestUrl = '';
    var title = '';
    switch (type){
      case 'inTheaters':
        requestUrl = baseUrl + 'v2/movie/in_theaters';
        title = '正在热映';
        break;
      case 'comingSoon':
        requestUrl = baseUrl + 'v2/movie/coming_soon';
        title = '即将上映';
        break;
      case 'top250':
        requestUrl = baseUrl + 'v2/movie/top250';
        title = '豆瓣Top250';
        break;                
    }
    
    this.data.requestUrl = requestUrl;

    wx.setNavigationBarTitle({
      title: title,
    })
    getMovieListData(requestUrl,function(data){
      _this.setData({
        movies:data
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 刷新
   */
  onPullDownRefresh: function () {
    var _this = this;
    getMovieListData(this.data.requestUrl, function (data) {
      _this.setData({
        movies: data
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   * 获取更多
   */
  onReachBottom: function () {

  },
})