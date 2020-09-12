
import Axios from 'axios'
import { colors, settings } from './index'
export default apis = {
	getUsersInfo(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('instagram/api/posts?instagramAccountId='+id+'&page=1&size=20')
	},
	getUsersInf(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
			return Axios.get('api/get_product_by_vendor_data?vendor_id='+id+'&page_index=1&page_size=10')
	},
	getUsersInfoTow() {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('instagram/api/posts?page=1&size=200')
	},
	getUsers() {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('instagram/api/users?keyword=&page=1&size=24&customerId=&getpost=1')
	},
	getBranch() {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('api/get_brand')
	},
	
	
	getProductDetail(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
		return Axios.get('api/get_product_detail?product_id='+id)
	},
	getProductInformation(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
		return Axios.get('api/important_information_product?id='+id)
	},
	getPolicy() {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
		return Axios.get('return_exchange_policy?json=true')
	},
	getProduct(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
		return Axios.get('instagram/api/posts/'+id)
	},
	getReward(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
		return Axios.get('api/reward?uid='+id)
	},
	getPointer(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('api/get-reward-history?uid='+id)
	},
	getCreditHistory(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('api/get-credit-history?uid='+id+'&page=1&size=20')
	},
	getCreditSumary(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('api/credit-summary?uid='+id)
	},
	getListProductOrder(products) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('api/get_product_detail?product_id='+products+'?include_visible=1')
	},
	
	getOrderInfo(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('api/get-order-detail?id='+id)
	},
	getOrderReturn(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('api/get-list-return-order?uid='+id)
	},
	getCredit(id) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('api/credit?uid='+id)
	},
	checkMail(email) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                
                'Content-Type': 'text/html',
            }
		return Axios.post('api/check-emails', { email: email })
	},
	getSearch(search) {
		Axios.defaults.baseURL = settings.ServiceAddress
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
		return Axios.get('instagram/api/users?keyword='+search+'&page=1&size=10&customerId=102')
	},
	getBlock() {
		Axios.defaults.baseURL = 'https://www.seoulmall.kr/'
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': 'Bearer 4pqulvtl89fuakmqmpljnet4je8czer7'
            }
		return Axios.get('rest/V1/cmsBlock/search?searchCriteria[filterGroups][0][filters][0][field]=identifier&searchCriteria[filterGroups][0][filters][0][value]=faq_ko&searchCriteria[filterGroups][0][filters][0][conditionType]=equal')
	},
	
	getOrder(id) {
		Axios.defaults.baseURL = 'https://www.seoulmall.kr/'
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': 'Bearer 4pqulvtl89fuakmqmpljnet4je8czer7'
            }
			
		return Axios.get('rest/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=customer_id&searchCriteria[filter_groups][0][filters][0][value]='+id+'&searchCriteria[sortOrders][][field]=created_at&searchCriteria[sortOrders][][direction]=DESC&searchCriteria[pageSize]=10')
	},
	
	customer(customer, id) {
		Axios.defaults.baseURL = 'https://www.seoulmall.kr/'
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': 'Bearer 4pqulvtl89fuakmqmpljnet4je8czer7'
            }
			console.log({customer: customer})
		return Axios.put('rest/V1/customers/'+id,{customer: customer})
	},
	
	
	
	login(username, password) {
		Axios.defaults.baseURL = 'https://www.seoulmall.kr/'
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 4pqulvtl89fuakmqmpljnet4je8czer7'
            }
		return Axios.post('rest/V1/customers/login/default', { username: username, password: password })
    },
	
	
	forgot(email) {
		Axios.defaults.baseURL = 'https://www.seoulmall.kr/'
		Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 4pqulvtl89fuakmqmpljnet4je8czer7'
            }
		return Axios.put('rest//V1/customers/password', { email: email, template: 'email_reminder', websiteId: 1 })
    },
	
	
	
	
	
	
	
	
    
}
