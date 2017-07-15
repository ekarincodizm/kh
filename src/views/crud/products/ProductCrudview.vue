<template>
  <section>
    <div id="content">
            <div class="xcrud-container">
            <div class="xcrud-top-actions">
                    </div>
                    <div class="xcrud-view">
                        <table class="xcrud-details-table">
                            <thead>
                                <tr class="xcrud-th">
                                    <th style="text-align:right;" class="xcrud-column">Column:</th>
                                    <th style="text-align:left;padding-left:15px;">Value:<span style="float:right">View</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value,key) in item">
                                    <td>{{key}}</td>
                                    <td style="text-align:left;">{{value}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <footer style="float:left;padding-left:20px;">
                        <router-link to="/system/product/list"  class="xcrud-button xcrud-orange xcrud-action">Return</router-link>
                    </footer>
                </div>

                <br/>
                <br/>
                <br/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SimpleCrud',
  data () {
    return {
        cols :this.$store.state.productcols,
        item: this.$store.state.products[this.$route.params.id]
    };
  }
};
</script>

<style lang="css"  scoped></style>