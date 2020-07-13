// miniprogram/pages/main/main.js
var bmap = require('../../libs/bmap-wx.min.js'); 
var wxMarkerData = []; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    City:'',
    wea:{}
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.loadInfo();
    }, 1000)
  },
  loadInfo:function () {
    var that = this; 
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({ 
        ak: 'rtaQpjz68AuXLCLu6ystkjZXF5D1ypkX' 
    });
    var fail = function(data) { 
      console.log(data) 
  }; 
  var success = function(data) { 
      // console.log(data.originalData.result.addressComponent.city) 
      var City = data.originalData.result.addressComponent.city;
      City = City.replace("市","")
      that.setData({City:City})
      setTimeout(() => {
        that.aa(City);
      }, 1000)
  } 
  // 发起geocoding检索请求 
  BMap.regeocoding({ 
    fail: fail, 
    success: success, 
}); 
  },
  aa:function (City) {
    var that = this
    wx.request({
      url: 'https://yiketianqi.com/api?version=v9&appid=26784719&appsecret=cQpTPBY2&city='+City,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        res.data.data.pop()
        res.data.data.pop()
        // console.log(res.data)
        that.setData({
          wea:res.data
        })
      }
    })
  },
})