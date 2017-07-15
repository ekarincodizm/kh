<script>
export default {
  name: 'sideitem',
  props:{
    item: {
      type: Object,
      default: {}
    },
  },
  data () {
    return {
    };
  },
  methods: {
      chkchild(){
        console.log('this props.item=',this.item)
        if(typeof this.item != 'undefined' && typeof this.item.children != 'undefined' &&  this.item.children.length > 0 ) {
          return true;
        } else {
          return false;
        }
      },
      toggle(){
         if(screen.width < 767 || window.innerWidth < 767 ) {
           $('.sidebar-toggle').click()
         }
      },
  },
  render(h){
    if(this.chkchild()) {
      return  (<li class="treeview"   >
                    <a href="#">
                    <i class="fa fa-pie-chart"></i>
                    <span>{this.item.name}</span>
                    <span class="pull-right-container">
                      <i class="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                { this.item.children.map((child,index)=>(<ul class="treeview-menu" >
                  <li key={index} onClick={this.toggle}>
                    <router-link to= {child.to} >
                    <i class={child.icon} ></i>{child.name}
                      <span class="pull-right-container">
                        <small class="label pull-right bg-green">{child.badge}</small>
                      </span>
                    </router-link>
                  </li>
                </ul>))}
              </li>)
    } else {
      return  (<li onClick={this.toggle}>
                <router-link to={this.item.to}>
                <i class={this.item.icon}></i>{this.item.name}
                  <span class="pull-right-container">
                    <small class="label pull-right bg-green">{this.item.badge}</small>
                  </span>
                </router-link>
              </li>)
    } 
  }
};
</script>