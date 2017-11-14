var domBuilderModule = (function () {
    var add, clear, text, ul;

    function initControls() {
        add = document.getElementById('add');
        clear = document.getElementById('clear');
        text = document.getElementById('text');
        ul = document.getElementById('list');

        add.addEventListener('click', checkText);

        clear.addEventListener('click', function () {
            text.value = '';
        });
    }

    function checkText() {
        if (text.value.trim()) {
            createTodoItem();
        }

        text.value = '';
    }

    function createTodoItem() {
        var li = document.createElement('li');
        var itemText = document.createTextNode(text.value);
        var deleteBtn = document.createElement('button');
        var glyph = document.createElement('span');

        glyph.setAttribute('class', 'glyphicon glyphicon-remove');

        deleteBtn.appendChild(glyph);
        deleteBtn.setAttribute('class', 'close');
        deleteBtn.setAttribute('aria-label', 'Close');
        deleteBtn.addEventListener('click', removeTodoItem.bind(null, li));

        li.appendChild(itemText);
        li.appendChild(deleteBtn);
        li.setAttribute('class', 'list-group-item');

        ul.appendChild(li);
    }

    function removeTodoItem(li) {
        ul.removeChild(li);
    }

    return {
        initControls: initControls
    };
})();