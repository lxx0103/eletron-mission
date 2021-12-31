<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="users"
            :loading="loading"
            :items-per-page="10" 
            fixed-header
            class="elevation-1 report-table"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>用户列表</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新增用户</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="editedItem.name" label="姓名"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select v-model="editedItem.status" :items="selectItems" label="状态"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="initialize"
                >
                    Reset
            </v-btn>
            </template>
        </v-data-table>
    </div>
</template>
<style lang="scss">
    .report-table {
        tr:hover {
            background-color: transparent !important;
        }
        td {
            border-left: 1px solid #eee;
        }
    }
</style>
<script>
  export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        selectItems: ['启用', '禁用'],
        headers: [
            {text: 'ID', align: 'start', sortable: false, value: 'id'},
            { text: '姓名', value: 'name' },
            { text: '状态', value: 'status', sortable: false},
            { text: '操作', value: 'actions', sortable: false},
        ],
        users: [
            {id : 1, name: "User1", status: "启用" },
            {id : 3, name: "User3", status: "启用" },
            {id : 2, name: "User2", status: "启用" },
            {id : 4, name: "User4", status: "启用" },
            {id : 7, name: "User7", status: "启用" },
            {id : 6, name: "User6", status: "启用" },
            {id : 5, name: "User5", status: "启用" },
            {id : 8, name: "User8", status: "启用" },
            {id : 9, name: "User9", status: "启用" },
            {id : 10, name: "User10", status: "启用" },
            {id : 11, name: "User11", status: "启用" },
        ],
        loading: true,
        editedIndex: -1,
        editedItem: {
            name: '',
            status: '',
        },
        defaultItem: {
            name: '',
            status: 0,
        },
    }),
    created () {
        this.loading = false
    },
    computed: {        
        formTitle () {
            return this.editedIndex === -1 ? '新增用户' : '修改用户'
        },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods: {
        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.users.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.users[this.editedIndex], this.editedItem)
            } else {
                this.users.push(this.editedItem)
            }
            this.close()
        },
    },
  }
</script>