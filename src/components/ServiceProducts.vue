<template>
    <div class="services-section">
        <div v-if="isCountriesLoaded" class="country-dropdown">
            <label class="mr-2">Choose a Country </label>
            <v-select class="select-box" label="name" :options="countries" v-model="selectedCountry"
                @input="onSelectedCountry"></v-select>
        </div>
        <!-- <div class="no-country"> Please select counttry</div> -->
        <div v-if="products?.length" class="products-list">
            <CountryProduct :productsList="products"></CountryProduct>
            <div class="mt-3">
                <b-pagination :align="center" v-model="currentPage" :total-rows="totalProducts" :per-page="perPage"
                    first-number last-number @input="onPageChange($event)"></b-pagination>
            </div>

        </div>
        <Loader v-if="!isCountriesLoaded || loading" />
    </div>
</template>
<script>
import Loader from './Loader.vue'
import CountryProduct from './CountryProduct.vue'


export default {
    inheritAttrs: false,
    inject: ['userName', 'password'],
    components: {
        Loader,
        CountryProduct
    },
    props: ['benefitsList', 'countriesList', 'isCountriesLoaded', 'selectedService'],
    data() {
        return {
            benefits: this.benefitsList,
            countries: this.countriesList,
            selectedCountry: null,
            products: [],
            totalProducts: 0,
            perPage: 24,
            currentPage: 1,
            loading: false
        }
    },
    methods: {
        onSelectedCountry(country) {
            this.currentPage = 1;
            this.getCountryProducts(country.iso_code)
        },

        async getCountryProducts(countryIso) {
            this.loading = true;
            let url = `/products?service_id=${this.selectedService.id}&country_iso_code=${countryIso}&page=${this.currentPage}&per_page=${this.perPage}`;
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + window.btoa(this.userName + ":" + this.password));
            this.products = [];
            try {
                const res = await fetch(url, { method: 'GET', headers: headers })
                if (res.status === 200) {
                    this.products = await res.json();
                    this.totalProducts = +res.headers.get('x-total')
                } else {
                    this.products = []
                }

                this.loading = false
            } catch (e) {
                this.loading = false
                this.products = [];
                // this.$bvToast.toast(``, {
                //     title: `Toaster ${toaster}`,
                //     toaster: 'b-toaster-bottom-left',
                //     solid: true,
                //     appendToast: true
                // })
            }
        },
        onPageChange(currentPage) {
            if (this.selectedCountry) {
                this.currentPage = currentPage
                this.getCountryProducts(this.selectedCountry.iso_code)
            }

        }
    },
    computed: {
        countryNames() {
            return this.countries.map((country) => country.name)
        }

    },
    watch: {
        selectedService: {
            handler(val, oldVal) {
                if (this.selectedCountry) {
                    this.getCountryProducts(this.selectedCountry.iso_code)
                }
            },
            deep: true
        },
        countriesList: {
            handler(val, oldVal) {
                this.countries = val;
                // if (this.countries?.length) {
                //     this.selectedCountry = this.countries[0];
                //     this.onSelectedCountry(this.selectedCountry)

                // }
            },
            deep: true
        },
        benefitsList: {
            handler(val, oldVal) {
                this.benefits = val
            },
            deep: true
        }
    }

}
</script>
<style>
.services-section {
    height: 100%;
    width: 100%;
}

.no-country {
    display: flex;
    place-items: center;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 70%;
    font-size: 18px;
    color: grey;
}


.products-list {
    height: 90%;
    width: 100%;
}

.select-box {
    width: 30%
}

.country-dropdown {
    display: flex;
    flex-direction: row;
    place-items: center;
    justify-content: flex-end;
}

.page-item.active .page-link {
    background-color: hsla(160, 100%, 37%, 1) !important;
    border-color: hsla(160, 100%, 37%, 1) !important;
    color: #fff !important;
}

.page-link:hover,
.page-link {
    color: hsla(160, 100%, 37%, 1) !important;
}

.pagination {
    justify-content: center;
}
</style>