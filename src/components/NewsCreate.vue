<template>
  <div class="container p-5">
        <h1 class="flex-container-center h4 text-gray-900 mb-4">Add News</h1>
        <form class="news-form" v-on:submit.prevent="addNews">
            <div class="form-group">
                <label>Subject :</label>
                <input type="text" class="form-control" id="subject" v-model="news_item.subject" />
            </div>
            <div class="form-group">
                <label>Content :</label>
                <input type="text" class="form-control" id="content" v-model="news_item.content" />
            </div>
            <div class="form-group flex-container-center">
                <input type="submit" class="btn btn-primary" value="Add" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-success" v-on:click="goBack()">Back</button>
            </div>
        </form>
    </div>
</template>

<script>
    var {SERVER_BASE_URL} = require('../env.js');

    export default {
        mounted: function(){
            // console.log("mounted");
            if (sessionStorage.getItem("userId").length < 1) {
                this.$router.push({name: 'Login'});
            }
        },
        data() {
            return {
                news_item: {
                    subject: '',
                    content: '',
                    userId: ''
                }
            }
        },
        methods: {
            addNews() {
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
                this.news_item.userId = sessionStorage.getItem("userId");
                if (this.news_item.userId.length < 1)
                {
                    return;
                }

                let uri = SERVER_BASE_URL + '/news/add';
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