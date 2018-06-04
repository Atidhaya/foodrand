<template>
  <f7-view>
  <f7-page>
    CREATE GROUP
  </f7-page>
  </f7-view>
</template>
<script>
  import F7Page from "framework7-vue/src/components/page";
  import F7Row from "framework7-vue/src/components/row";
  import F7Toolbar from "framework7-vue/src/components/toolbar";
  import F7ListItem from "framework7-vue/src/components/list-item";
  import F7SwipeoutActions from "framework7-vue/src/components/swipeout-actions";
  import F7SwipeoutButton from "framework7-vue/src/components/swipeout-button";
  import F7List from "framework7-vue/src/components/list";
  import F7Navbar from "framework7-vue/src/components/navbar";
  import F7Col from "framework7-vue/src/components/col";
  import F7NavTitle from "framework7-vue/src/components/nav-title";
  import F7Block from "framework7-vue/src/components/block";
  import F7Searchbar from "framework7-vue/src/components/searchbar";
  import F7Link from "framework7-vue/src/components/link";
  import F7Icon from "framework7-vue/src/components/icon";
  import F7View from "framework7-vue/src/components/view";



  export default {components: {
      F7View,
      F7Icon,
      F7Link,
      F7Searchbar,
      F7Block,
      F7NavTitle,
      F7Col,
      F7Navbar,
      F7List,
      F7SwipeoutButton,
      F7SwipeoutActions,
      F7ListItem,
      F7Toolbar,
      F7Row,
      F7Page
    },
    data () {
      return {
        items: [{name: 'group 1',
          info: 'Food and stuff'},
          {name: 'group 2',
            info: 'Games'},
          {name: 'group 3',
            info: 'whatever'}],
        vlData: {},
      }
    },
    methods: {
      deleteGroup(){
        console.log('DELETE')
      },
      searchList (query, items) {
        var found = [];
        for (var i = 0; i < items.length; i += 1) {
          if (items[i].title.toLowerCase().indexOf(query) >= 0 || query.trim() === '') found.push(i);
        }
        return found; // return array with mathced indexes
      },
      renderExternal(vl, vlData) {
        this.vlData = vlData;
      },
    }
  }
</script>
