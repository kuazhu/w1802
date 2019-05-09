var { getMovieListData } = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:'',
    totalCount:0,
    totalData:[],
    isEnd:false
  },
  handleMovieListData:function(data){
    wx.hideNavigationBarLoading();
    if(data.length == 0){
      wx.showToast({
        title: '底库都拉出来啦',
      })
      this.data.isEnd = true
      return;
    }
    this.data.totalCount = this.data.totalCount + data.length;
    this.data.totalData = this.data.totalData.concat(data);
    this.setData({
      movies: this.data.totalData
    })
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
    /*
    getMovieListData(requestUrl,function(data){
      _this.data.totalCount = data.length;
      _this.setData({
        movies:data
      })
    })
    */
    getMovieListData(requestUrl, this.handleMovieListData);   
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 刷新
   */
  onPullDownRefresh: function () {
    var _this = this;
    wx.showNavigationBarLoading();
    getMovieListData(this.data.requestUrl, function (data) {
      wx.hideNavigationBarLoading();
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
    if (this.data.isEnd) {
      wx.showToast({
        title: '底库都拉出来啦',
      })
      return;
    }    
    var nextUrl = this.data.requestUrl +'?start='+this.data.totalCount+'&count=20';
    wx.showNavigationBarLoading();
    getMovieListData(nextUrl, this.handleMovieListData);    
  },
})