var app = new Vue({
    el: "#player",
    data: {
        query: "",
        musicList: [],
        musicSrc: '',
        musicFm: '',
        hotPl: [],
        isPlay: false,
        isShow: false,
        mvUrl: ''
    },
    methods: {
        searchMusic: function () {
            var that = this;
            //获取搜索歌曲列表
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function (musicNm) {
                    that.musicList = musicNm.data.result.songs;
                    console.log(musicNm.data.result.songs);
                }), function (err) { };
        },
        palyMusic: function (musicId) {
            var that = this;
            //获取歌曲播放链接
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (response) {
                    that.musicSrc = response.data.data[0].url;
                }), function (err) { };
            //获取歌曲封面
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function (response) {
                    // console.log(response.data.songs[0].al.picUrl);
                    that.musicFm = response.data.songs[0].al.picUrl;
                }), function (err) { };
            //获取歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function (response) {
                    //   console.log(response.data.hotComments);
                    that.hotPl = response.data.hotComments;
                }), function (err) { };
        },

        play: function () {
            var bz = document.querySelector('.play_bar');
            //   bz.style.transform='rotate(8deg)' ;
            // console.log('play');
            this.isPlay = true;
        },
        pause: function () {
            this.isPlay = false;
            // var bz=document.querySelector('.play_bar');
            // bz.style.transform='rotate(-18deg)' ;
        },
        playMv: function (mvd) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvd)
                .then(function (response) {
                    // console.log(response.data.data.url);
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                }), function (err) { };
        },
        //隱藏
        hide:function(){
            this.isShow=false;
        }
    },
})
