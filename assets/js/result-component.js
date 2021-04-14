Vue.component('result-component', {
    props: {
        boxes: {
            required: true,
            type: Array,
        },
        jams: {
            required: true,
            type: true,
        }
    },

    data() {
        return {
            jamsArray: [],
            boxesArray: [],
            result: [],
        }
    },

    methods: {
    },
    
    created() {
        this.jamsArray = [...this.jams];
        this.boxesArray = [...this.boxes];

        this.boxesArray.sort((a, b) => {
            return a.value - b.value;
        })

        this.jamsArray.sort((a, b) => {
            return b.value - a.value;
        }).map((jam, index) => {
            let value = parseInt(jam.value);

            do {
                const filteredBoxes = this.boxesArray.filter(box => parseInt(box.value) >= value);
                let removed;

                if (filteredBoxes.length) {
                    removed = this.boxesArray.splice(this.boxesArray.indexOf(filteredBoxes[0]), 1)[0];
                    
                } else {
                    removed = this.boxesArray.pop();
                }

                value -= parseInt(removed.value);
                this.result.push({
                    box: removed,
                    jam: jam,
                    value: value > 0 ? parseInt(removed.value) : parseInt(removed.value) + parseInt(value),
                });

            } while(value > 0);

            console.log(this.boxesArray, this.result);
        });
        
    },

    template: ` <div>
                    <div class="p-4 shadow bg-white rounded-lg">
                        <h1 class="text-4xl font-semibold">Result</h1>

                        <div class="flex space-x-4 my-4">
                            <div v-for="(item, index) in result" :key="index">
                                <div class="rounded border px-4 h-48 bg-gray-400 relative flex flex-col justify-center items-center">
                                    <div class="rounded bg-green-400 absolute w-full left-0 bottom-0" :style="{height: (item.value*100/item.box.value)+'%'}"></div>
                                    <p class="z-10 text-white">{{item.value}} / <span class="font-bold">{{item.box.value}}</span></p>
                                    <p class="z-10 text-white font-semibold">{{(item.value*100/item.box.value).toFixed(2)}}%</p>
                                </div>
                                <p class="text-gray-800"><span class="font-bold">Box:</span> {{item.box.id}}</p>
                                <p class="text-gray-800"><span class="font-bold">Jam:</span> {{item.jam.name}}</p>
                            </div>
                            <div v-for="(box, boxIndex) in boxesArray" :key="boxIndex">
                                <div class="rounded border px-4 h-48 bg-gray-400 relative flex flex-col justify-center items-center">
                                    <div class="rounded bg-green-400 absolute w-full left-0 bottom-0" :style="{height: '0%'}"></div>
                                    <p class="z-10 text-white">{{0}} / <span class="font-bold">{{box.value}}</span></p>
                                    <p class="z-10 text-white font-semibold">{{0}}%</p>
                                </div>
                                <p class="text-gray-800"><span class="font-bold">Box:</span> {{box.id}}</p>
                                <p class="text-gray-800"><span class="font-bold">Jam:</span></p>
                            </div>
                            
                        </div>
                    </div>
                </div>`,
})