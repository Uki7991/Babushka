Vue.component('jam-component', {
    model: {
        prop: 'jams',
        event: 'change',
    },

    props: {
        jams: {
            required: true,
            type: Array,
        }
    },

    data() {
        return {
            name: '',
            value: '',
        }
    },

    methods: {
        addJam() {
            this.$emit('change', [...this.jams, {
                name: this.name,
                value: this.value,
            }])
            this.name = '';
            this.value = '';
        }
    },

    template: ` <div>
                    <div class="p-4 shadow bg-white rounded-lg">
                        <h1 class="text-4xl font-semibold">Jams</h1>
                        <div class="my-4 flex items-center space-x-3">
                            <input placeholder="Name" class="ring-1 rounded px-3 py-2" v-model="name">
                            <input placeholder="Value" class="ring-1 rounded px-3 py-2" v-model="value">
                            <button class="rounded px-3 py-2 bg-green-500 text-white shadow" @click="addJam">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current text-white"><path d="M19 11L13 11 13 5 11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13z"></path></svg>
                            </button>
                        </div>
                        <button class="bg-green-600 text-white rounded block py-3 w-full" :class="{'opacity-50': ! jams.length}" :disabled="! jams.length" @click="$emit('next', 'result')">Next</button>
                    </div>
                </div>`,
})