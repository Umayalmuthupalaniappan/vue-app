<template>
  <div :style="{ height: '90vh' }">
    <div class="loader-container" v-if="!services?.length">
      <Loader />
    </div>
    <template v-else>
      <div class="app-container">
        <div class="servicesList">
          <ul class="p-0 m-0">
            <li class="serviceItem header">Services</li>
            <template v-for="service in services">
              <div @click="onSelectedService(service)" class="serviceItem"
                :class="{ selected: selectedService === service }">
                <a class="serviceLink"> {{ service.name }}</a>
              </div>
            </template>
          </ul>
        </div>
        <ServiceProducts :countriesList="countries" :benefitsList="benefits" :isCountriesLoaded="isCountriesLoaded"
          :selectedService="selectedService">
        </ServiceProducts>
      </div>
    </template>
  </div>
</template>
<script>
import _ from 'lodash';
import ServiceProducts from '../components/ServiceProducts.vue'
import CountryProduct from '../components/CountryProduct.vue'
import Loader from '../components/Loader.vue'

export default {
  inheritAttrs: false,

  inject: ['userName', 'password'],
  components: {
    ServiceProducts,
    CountryProduct,
    Loader,
  },
  data() {
    return {
      products: [],
      selectedCountry: null,
      productByCountries: [],
      services: [],
      selectedService: null,
      benefits: [],
      countries: [],
      isCountriesLoaded: false
    }
  },
  mounted() {
    //  this.getProducts();
  },
  created() {
    this.getServices();
    this.getBenefits();
    this.getAllCountries();
  },
  computed: {
    countryProducts() {
      return this.productByCountries.hasOwnProperty(this.selectedCountry) ? this.productByCountries[this.selectedCountry] : [];
    },
    countriesList() {
      return Object.keys(_.keyBy(this.products, 'operator.country.name'));
    }
  },
  methods: {
    async getProducts() {
      let url = '/products';
      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + window.btoa(this.userName + ":" + this.password));
      this.products = [];
      try {
        const res = await fetch(url, { method: 'GET', headers: headers })
        this.products = await res.json();
        if (this.products.length) {
          this.productByCountries = _.groupBy(this.products, 'operator.country.name');
          this.selectedCountry = Object.keys(this.productByCountries)[0]
        }
      } catch (e) {
        this.products = [];
      }
    },
    async getServices() {
      let url = '/services';
      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + window.btoa(this.userName + ":" + this.password));
      this.services = [];
      try {
        const res = await fetch(url, { method: 'GET', headers: headers })
        if (res.status === 200) {
          this.services = await res.json();
          if (this.services.length) {
            this.selectedService = this.services[0];
          }
        } else {
          this.services = [];
        }

      } catch (e) {
        this.services = [{ name: 'a' }, { name: 'a' }];
      }
    },
    async getBenefits() {
      let url = '/benefit-types';
      let headers = this.getAuthorizationHeader();
      this.benefits = [];
      try {
        if (res.status === 200) {
          const res = await fetch(url, { method: 'GET', headers: headers })
          this.benefits = await res.json();
        } else {
          this.benefits = [];
        }
      } catch (e) {
        this.benefits = [];
      }
    },
    async getCountries(pageNumber) {
      let url = `/countries?page=${pageNumber}`;
      let headers = this.getAuthorizationHeader();
      try {
        if (res.status === 200) {
          const res = await fetch(url, { method: 'GET', headers: headers })
          const countries = await res.json();
          this.countries = this.countries.concat(countries);
        }
      } catch (e) { }
    },
    async getAllCountries() {
      let url = `/countries?page=1`;
      let headers = this.getAuthorizationHeader();
      this.countries = [];
      this.isCountriesLoaded = false;
      try {
        if (res.status === 200) {
          const res = await fetch(url, { method: 'GET', headers: headers })
          const totalPages = res.headers.get('x-total-pages');
          console.log(totalPages)
          this.countries = await res.json();
          for (let i = 2; i <= totalPages; i++) {
            await this.getCountries(i);
            if (i === +totalPages) {
              this.isCountriesLoaded = true;
              this.countries = [...this.countries]
            }
          }
        } else {
          this.countries = [];
        }
      } catch (e) {
        this.countries = [];
      }
    },

    getAuthorizationHeader() {
      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + window.btoa(this.userName + ":" + this.password));
      return headers;
    },
    onItemClick(item) {
      this.selectedCountry = item;
    },

    onSelectedService(item) {
      this.selectedService = item;
    }
  }
}
</script>
<style>
#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
}

.app-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  place-items: center;
}

.loader-container {
  height: 100%;
  /* display: flex;
  place-items: center; */
}

.loader {
  margin: auto;
  border: 10px solid #EAF0F6;
  border-radius: 50%;
  border-top: 10px solid hsla(160, 100%, 37%, 1);
  width: 100px;
  height: 100px;
  animation: spinner 4s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.servicesList {
  min-width: 300px;
  width: 300px;
  background-color: hsla(160, 100%, 37%, 1) !important;
  height: 100%;
}

.header {
  font-size: 18px;
  font-weight: 600;
  padding: 10px 15px;
  text-transform: uppercase;
  color: hsla(0, 0%, 100%, .7)
}

.serviceItem {
  display: block;
  white-space: nowrap;
  width: 100%;
}

.serviceItem.selected {
  background-color: rgb(8, 142, 97) !important;
}

.serviceLink {
  color: #fff;
  align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  padding: 10px 15px;
  text-decoration: none;
  transition: all .3s ease;
}

a:hover {
  background-color: rgb(59, 171, 134) !important;
  color: #fff !important;
  text-decoration: none !important;
}
</style>
