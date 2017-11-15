var domBuilderModule = (function () {
    var addBtn, clearBtn, textField, todoList;
    var data;

    function init() {
        initControls();
        initListeners();
        initData();
        initTodoList();
    }

    function initControls() {
        addBtn = document.getElementById(addId);
        clearBtn = document.getElementById(clearId);
        textField = document.getElementById(textId);
        todoList = document.getElementById(listId);
    }

    function initListeners() {
        addBtn.addEventListener(eventTypeClick, addTodoItemListener);
        clearBtn.addEventListener(eventTypeClick, clearTextListener);
        todoList.addEventListener(eventTypeClick, removeTodoItemListener);
    }

    function initData() {
        data = JSON.parse(localStorage.getItem(dataLSKey));
        if (data === null) {
            data = [];
        }
    }

    function initTodoList() {
        data.forEach(function (t, number) {
            createTodoItem(t, number);
        });
    }

    function clearTextListener() {
        textField.value = emptyString;
    }

    function addTodoItemListener() {
        var value = textField.value;
        if (value.trim()) {
            var index = data.push(value) - 1;
            createTodoItem(value, index);
            localStorage.setItem(dataLSKey, JSON.stringify(data));
        }

        textField.value = emptyString;
    }

    function createTodoItem(text, index) {
        var li = document.createElement(elementNameLi);
        var itemText = document.createTextNode(text);
        var removeSpan = document.createElement(elementNameSpan);

        removeSpan.setAttribute(attributeNameClass, 'glyphicon glyphicon-remove pull-right');
        removeSpan.isRemove = true;
        removeSpan.index = index;

        li.appendChild(itemText);
        li.appendChild(removeSpan);
        li.setAttribute(attributeNameClass, 'list-group-item');

        todoList.appendChild(li);
    }

    function removeTodoItemListener(event) {
        var element = event.target;
        if (element.isRemove) {
            this.removeChild(element.parentNode);
            data.splice(element.index, 1);
            localStorage.setItem(dataLSKey, JSON.stringify(data));
        }
    }

    return {
        init: init
    };
})();