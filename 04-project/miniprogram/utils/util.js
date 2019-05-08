function getMovieListData(url,success){
  wx.request({
    url: url,
    success: function (res) {
      success(formatMovieListData(res.data.subjects))
    }
  })
}

function formatMovieListData(data){
  return data.map(function (item) {
    return {
      coverImg: item.images.large,
      title: item.title,
      stars: coverStarsToArray(item.rating.stars),
      score: item.rating.average
    }
  })
}

function coverStarsToArray(stars){
  //"35"->3颗星 [1,1,1,0,0]
  var num = stars.toString().substring(0,1);
  var arr = [];
  for(var i = 1;i<=5;i++){
    if(i<=num){
      arr.push(1)
    }else{
      arr.push(0)
    }
  }
  return arr;

}

module.exports = {
  getMovieListData: getMovieListData
}