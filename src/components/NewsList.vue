<template>
    <div class="container p-5">
        <h1 class="flex-container-center h4 text-gray-900 mb-4">All News</h1>

        <table class="table table-hover news-form">
            <tr>
                <th>Subject</th>
                <th>Content</th>
                <th>Actions</th>
            </tr>
            <tr v-for="item in newsObjList" :key="item.news._id">
                <td>
                    <div style="overflow: hidden;text-overflow:ellipsis; width:10vw;">
                        {{ item.news.subject }}
                    </div>
                </td>
                <td>
                    <div style="overflow: hidden;text-overflow:ellipsis; width:30vw;">
                        {{ item.news.content }}
                    </div>
                </td>
                <td class="action-group">
                    <router-link :to="{name: 'Edit', params: { newsId: item.news._id, userId: item.news.userId }}" class="btn btn-primary">Edit</router-link>
                    &nbsp;
                    <button class="btn btn-danger"  v-on:click="deleteNews(item.news._id, item.news.userId)">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    var {SERVER_BASE_URL} = require('../env.js');

    export default {

        mounted: function(){
            // console.log("mounted");
            // if (sessionStorage.getItem("userId").length < 1) {
            //     this.$router.push({name: 'Login'});
            // }
        },
        
        data(){
            return{
                newsObjList: []
            }
        },

        created: function()
        {
            this.fetchNews();
        },

        methods: {
            fetchNews()
            {
                let uri = SERVER_BASE_URL + '/news';
                this.axios.get(uri)
                .then((response) => {
                    this.newsObjList = response.data;
                })
                .catch(() => {

                });
            },
            deleteNews(newsId, userId)
            {
                if (userId != sessionStorage.getItem("userId")) {
                    return;
                }

                let uri = SERVER_BASE_URL + '/news/delete/'+newsId;
                this.newsObjList.splice(newsId, 1);
                this.axios.get(uri);
            }
        }
    }
</script>
