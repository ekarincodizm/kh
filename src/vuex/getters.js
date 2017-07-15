const billchange = state=>JSON.stringify(state.bill)
const sups = state=>state.suppliers.suppliers
const menuitems = state => state.menus.items

export default {
	billchange,
	sups,
	menuitems,
	// mx : state=>state.menus.menus
} 
