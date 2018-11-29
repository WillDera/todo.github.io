document.addEventListener(
  "DOMContentLoaded",
  function() {
    var app = new Vue({
      el: "#app",
      data: {
        isNavOpen: false,
        isSidebarOpen: false,
        sidebarContentToShow: null,
        currentListIndex: 0,
        currentTodoIndex: 0,
        todoLists: [],
        tempNewTodo: [
          {
            name: null,
            isCompleted: false
          }
        ],
        tempNewList: [
          {
            title: null,
            keyword: null
          }
        ],
        todoLists: [
          {
            title: "✈️ Trip to Japan",
            keyword: "japan",
            items: [
              { name: "Eat ramen", isCompleted: true },
              { name: "Visit mt Fuji", isCompleted: false },
              { name: "Learn japanese", isCompleted: false }
            ]
          },
          {
            title: "🏂 Ski trip to the Alps",
            keyword: "Alps",
            items: [
              { name: "Find a chalet", isCompleted: true },
              { name: "Learn how to ski", isCompleted: false }
            ]
          },
          {
            title: "🍉 Groceries",
            keyword: "Food",
            items: [
              { name: "Apples", isCompleted: false },
              { name: "Banana", isCompleted: true },
              { name: "Tomatoes", isCompleted: false },
              { name: "Bread", isCompleted: true }
            ]
          }
        ],
      },
      created: function() {
    this.todoLists = JSON.parse(
      localStorage.getItem("todoLocalStorage") || "[]"
    );
  },
      watch: {
        todoLists: {
          handler() {
            this.updateTodoLocalStorage();
          },
          deep: true
        }
      },
      methods: {
        openSidebar: function(contentToShow) {
          this.isSidebarOpen = true;
          this.isNavOpen = false;
          this.sidebarContentToShow = contentToShow;
        },
        addNewTodo: function() {
          var todoName= this.tempNewTodo.name;
          var todoCompleted = this.tempNewTodo.isCompleted;
          if (todoName == null) {
            todoName = "🕵️‍ unnamed todo";
          }
          this.todoLists[this.currentListIndex].items.push({
            name: todoName,
            isCompleted: todoCompleted
          });
          this.isSidebarOpen = false;
          this.tempNewTodo.name = null;
          this.tempNewTodo.isCompleted = false;
        },
        addNewList: function() {
          var listTitle = this.tempNewList.title;
          var listKeyword = this.tempNewList.keyword;
          if (listTitle == null) {
            listTitle = "🕵️‍ List with no name";
          };
          if (listKeyword == null) {
            listKeyword = "earth";
          };
          this.todoLists.push({
            title: listTitle,
            keyword: listKeyword,
            items: []
          });
          this.currentListIndex = this.todoLists.length - 1;
          this.isSidebarOpen = false;
          this.tempNewList.title = null;
          this.tempNewList.keyword = null;
        },
        totalTodosCompleted: function(i){
          var total = 0;
          for (var j = 0; j < this.todoLists[i].items.length; j++) {
            if(this.todoLists[i].items[j].isCompleted){
              total++;
            }
          }
          return total;
        },
        deleteList: function() {
          this.todoLists.splice(this.currentListIndex, 1);
          this.currentListIndex = 0;
          this.isSidebarOpen = false;
        },
        deleteTodo: function() {
          this.todoLists[this.currentListIndex].items.splice(this.currentTodoIndex, 1);
          this.isSidebarOpen = false;
          this.currentTodoIndex = 0;
        },
        updateTodoLocalStorage: function () {
          localStorage.setItem('todoLocalStorage', JSON.stringify(this.todoLists));
        }
      }
    });
  },
  false
);
