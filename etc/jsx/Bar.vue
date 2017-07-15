<script>
    export default{
        name: 'Counter',
        props: ['count'],
        data(){
            return{
                c : this.count
            }
        },
        methods: {
            inc(){
            	console.log('click')
                this.c++
            },
            dec(){
            	console.log('click')
                this.c--
            }
        },
        render(h){
            return(
                <div>
                    <h2>Count: {this.c}</h2>
                    <button class="btn btn-primary" on-click={this.dec}>-</button>
                    <button class="btn btn-primary" on-click={this.inc}>+</button>
                </div>
            )
        }
    }
</script>
