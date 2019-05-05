//index.js
//获取应用实例
const app = getApp()

Page({
  tapMotto:function(){
    // console.log('tapMotton...')
    /*
    wx.navigateTo({
      // url: '../article/article',
      url: '/pages/article/article',
    })
    */
    wx.redirectTo({
      url: '/pages/article/article',
    })
  },
  /*
  tapText:function(){
    console.log('tabText....')
  }
  */
})
