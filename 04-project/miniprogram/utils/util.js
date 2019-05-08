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
      stars: item.rating.stars,
      score: item.rating.average
    }
  })
}

module.exports = {
  getMovieListData: getMovieListData
}