new Vue({
    el: '#app',
    data() {
        return {
            boxes: [],
            jams: [],
            currentComponent: 'box',
        }
    },

    methods: {
        next(nextComponent) {
            this.currentComponent = nextComponent;
        }
    },
})