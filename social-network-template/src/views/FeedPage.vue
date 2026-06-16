<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
    data() {
        return {
            isReady: false,
            feed: []
        }
    },

    mounted() {
        this.loadData()
    },

    methods: {
        async loadData() {
            this.isReady = false

            await this.loadFeed()

            this.isReady = true
        },

        async loadFeed() {
            let response = await axios.get('/feed')
            this.feed = response.data
        },

        getRelativeDate(date) {
            let day = dayjs(date)
            return day.fromNow()
        }
    }
}
</script>

<template>
    <div class="feed-page">
        <h3>Новости</h3>

        <div v-if="!isReady">
            Новости загружаются...
        </div>

        <div v-if="isReady">
            <div
                class="user-post card mb-3"
                v-for="(item, index) in feed"
                :key="item._id || index"
            >
                <div class="card-body">
                    <div class="feed-header">
                        <img :src="'/src/avatars/' + item.avatar" alt="">
                        <div>
                            <div class="feed-name">
                                {{ item.name }}
                            </div>
                            <div class="feed-time">
                                {{ getRelativeDate(item.createdAt) }}
                            </div>
                        </div>
                    </div>

                    <p class="card-text mt-3">
                        {{ item.content }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.feed-page img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
    border: 1px solid #6c757d;
}

.feed-header {
    display: flex;
    align-items: center;
    gap: 12px;
}

.feed-name {
    font-weight: bold;
}

.feed-time {
    color: #6c757d;
    font-size: 14px;
}
</style>
