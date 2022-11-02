<template>
    <div class="products-container mt-3">
    <template v-for="product in products">
        <b-card :title="product?.name" class="mb-3 mt-1 mr-2 ml-3" :subTitle="product?.validity ? 'Validity: '+product?.validity?.quantity + ' '+ product?.validity?.unit : ' Validity: NA'">
          <b-card-body>
            <p> Operator : <b>{{product?.operator?.name}}</b></p>
            <b-card-text>{{ product?.description }}</b-card-text>
          </b-card-body>
          <b-button @click="showSuccessMessage(product?.name)" class="pay-btn float-right" > Buy at {{product?.source?.amount ? Math.floor(product.source.amount) + ' AED' : '0 AED'}}</b-button>
         
      </b-card>
    </template>
    </div>
  </template>
  
  <script>
    export default {
        props: {
            productsList : String
        },
        data() {
            return {
            products: this.productsList
            }
        },
        watch: {
            productsList() {
                this.products = this.productsList
            }
        },
        methods: {
            showSuccessMessage(planName) {
                this.$bvModal.msgBoxOk(`Recharged with plan <b> ${planName} successfully`, {
                title: 'Hurray!!!!',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
                })
            }
        }
    }
  </script>

<style>
.pay-btn {
    color: #fff;
    background-color: hsla(160, 100%, 37%, 1) !important;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
;
}
.card-body {
    padding: 1rem !important;  
}

.card-body p {
        margin-bottom: 0.5rem !important;
}
.card {
    width: 350px;
    height:325px;
    overflow:auto;
    float: left;
    border-radius: 0.75rem !important;
    background-color: #f5f5f5 !important;
}

.card-text {
    color: #70707E !important;
}

.card-title {
    color: hsla(160, 100%, 37%, 1) !important;
}

.card-subtitle {
    margin-bottom: 0;
}

.products-container {
    height:95%;
    overflow: auto;
}

</style>