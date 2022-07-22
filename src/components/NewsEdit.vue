<template>
  <div class="container p-5">
        <h1 class="flex-container-center h4 text-gray-900 mb-4">Edit News</h1>
        <form class="news-form" v-on:submit.prevent="updateNews">
            <div class="form-group">
                <label>Subject :</label>
                <input type="text" class="form-control" id="subject" v-model="news_item.subject"/>
            </div>
            <div class="form-group">
                <label>Content :</label>
                <input type="text" class="form-control" id="content" v-model="news_item.content" />
            </div>
            <div class="form-group flex-container-center">
                <input type="submit" class="btn btn-primary" value="Update" :disabled="disabled" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-success" v-on:click="goBack()">Back</button>
            </div>
        </form>
    </div>
</template>
<script>
    var {SERVER_BASE_URL} = require('../env.js');

    export default{
        mounted: function(){
            this.disabled = false;
            if (sessionStorage.getItem("userId").length < 1 ||
                sessionStorage.getItem("userId") != this.$route.params.userId) 
            {
                this.disabled = true;
            }
            this.getNews();
        },
        data(){
            return{
                news_item:{
                    subject: '',
                    content: '',
                    userId: ''
                },
                disabled: false
            }
        },
        methods: {
            getNews()
            {
                let uri = SERVER_BASE_URL + '/news/edit/' + this.$route.params.newsId;
                this.axios.get(uri).then((response) => {
                    this.news_item = response.data;
                });
            },
            updateNews()
            {
                if (this.news_item.subject.length < 1)
                {
					window.document.getElementById("subject").focus();
                    return;
                }
                if (this.news_item.content.length < 1)
                {
					window.document.getElementById("content").focus();
                    return;
                }
                if (this.news_item.userId != sessionStorage.getItem("userId"))
                {
                    return;
                }

                let uri = SERVER_BASE_URL + '/news/update/' + this.$route.params.newsId;
                this.axios.post(uri, this.news_item)
                .then(() => {
                    this.$router.push({name: 'List'});
                })
                .catch(() => {

                });
            },
            goBack() {
                window.history.back();
            }
        }
    }
</script>
