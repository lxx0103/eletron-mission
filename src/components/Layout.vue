<template>
  <v-app>
    <v-app-bar app clipped-left dark>
        <v-toolbar-title>任务分配</v-toolbar-title> <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer  v-model="drawer" clipped permanent app style="text-align: left;">
        <v-list>
            <div v-for="item in items" :key="item.title">
                <v-list-item router :to=item.to>
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item>
            </div>
        </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
export default {
    data() {
        return {
            drawer: true,
            items: [
                {
                    icon: 'mdi-home',
                    title: '主页',
                    to: '/home'
                },
                {
                    icon: 'mdi-account',
                    title: '人员管理',
                    to: '/user',
                },
                {
                    icon: 'mdi-view-list',
                    title: '任务列表',
                    to: '/mission',
                }
            ],
        };
    }
};
</script>