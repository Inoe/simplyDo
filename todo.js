// Theming JSON
var themes = {
    "default" : {
        "name" : "Let's do! (default)",
        "main" : "#c0504d",
        "dark" : "#953735", // both border & deep part
        "text" : "#ffffff"
    },
    "calm" : {
        "name" : "I'll do.",
        "main" : "#607d8b",
        "dark" : "#455a64",
        "text" : "#ffffff"
    },
    "fresh" : {
        "name" : "Fresh!",
        "main" : "#689f38",
        "dark" : "#33691e",
        "text" : "#ffffff"
    }
};

// getting theme data
function get_themeData() {
    var themeData = new Array();
    var themeData_str = localStorage.getItem('appTheme');
    if (themeData_str !== null) {
        themeData = JSON.parse(themeData_str);
    }
    return themeData;
}
var themeData = get_themeData();

if (themeData[0] == undefined) {
    var themeName = "default";
} else {
    var themeName = themeData[0];
}
if (themeData[1] == undefined) {
    var themeMain = themes['default'].main;
} else {
    var themeMain = themeData[1];
}
if (themeData[2] == undefined) {
    var themeDark = themes['default'].dark;
} else {
    var themeDark = themeData[2];
}
if (themeData[3] == undefined) {
    var themeText = themes['default'].text;
} else {
    var themeText = themeData[3];
}

function get_catsId() { // mencari last ID Categories
    var catsId = new Array();
    var catsId_str = localStorage.getItem('catCounter');
    if (catsId_str !== null) {
        catsId = JSON.parse(catsId_str);
    } else {
        catsId = 0;
    }
    return catsId;
}

function get_todoId() { // mencari last ID todo
    var todoId = new Array();
    var todoId_str = localStorage.getItem('todoCounter');
    if (todoId_str !== null) {
        todoId = JSON.parse(todoId_str);
    } else {
        todoId = 0;
    }
    return todoId;
}

function get_cats() {
    var cats = new Array();
    var cats_str = localStorage.getItem('catList');
    if (cats_str !== null) {
        cats = JSON.parse(cats_str);
    }
    return cats;
}
function get_catData(a) {
    var catData = new Array();
    var catData_str = localStorage.getItem(a);
    if (catData_str !== null) {
        catData = JSON.parse(catData_str);
    }
    return catData;
}

function get_todos(a) {
    var todos = new Array();
    var todos_str = localStorage.getItem('todoOrder-' + a);
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}
function get_dones(a) {
    var dones = new Array();
    var dones_str = localStorage.getItem('doneOrder-' + a);
    if (dones_str !== null) {
        dones = JSON.parse(dones_str);
    }
    return dones;
}
function get_todoData(a) {
    var todoData = "";
    var todoData_str = localStorage.getItem('todo-' + a);
    if (todoData_str !== null) {
        todoData = JSON.parse(todoData_str);
    }
    return todoData;
}
// ga perlu get_doneData(a) kalau metodenya sama dengan get_todoData(a)
// kenapa sama? karena dengan sistem yang baru, todo itu standalone item. manajemen mana yang done mana yang masih todo via todoOrder dan doneOrder

function get_catState() { // check whether categories are enabled
    var catState = new Array();
    var catState_str = localStorage.getItem('catState');
    if (catState_str !== null) {
        catState = JSON.parse(catState_str);
    }
    return catState;
}

function add() {
    var taskInput = document.getElementsByClassName('task')[0];
    var task = taskInput.value;
    var todoCat = taskInput.id;
    var todoCatShort = todoCat.split("-")[1];
    
    if (task == "") {
        alert('Please input the task :)');
    } else {
        var todoCount = get_todoId() +1;
        localStorage.setItem('todoCounter', JSON.stringify(todoCount));
        
        localStorage.setItem('todo-' + todoCount, JSON.stringify(task));
        
        var todos = get_todos(todoCatShort);
        todos.push(todoCount);
        localStorage.setItem('todoOrder-' + todoCatShort, JSON.stringify(todos));
        
        document.getElementsByClassName('task')[0].value = "";
        
        // simulate click on category tab
        document.getElementById('cat-' + todoCatShort).click();
        
        return false;
    }
}

function check() {
    var id = this.getAttribute('id');
    var idCat = id.split("-")[0];
    var idPosition = id.split("-")[1];
    var idTodo = id.split("-")[2];
    var isHome = id.split("-")[3];
    
    // adding the entry to done
    var dones = get_dones(idCat);
    dones.push(idTodo);
    localStorage.setItem('doneOrder-' + idCat, JSON.stringify(dones));
    
    // deleting the entry from todo
    var todos = get_todos(idCat);
    todos.splice(idPosition, 1);
    localStorage.setItem('todoOrder-' + idCat, JSON.stringify(todos));
    
    // show(); diganti bawah ini, yak
    if (isHome == "viewAll") {
        show();
    } else {
        document.getElementById('cat-' + idCat).click();
    };
    
    return false;
}

function uncheck() {
    var id = this.getAttribute('id');
    var idCat = id.split("-")[0];
    var idPosition = id.split("-")[1];
    var idTodo = id.split("-")[2];
    var isHome = id.split("-")[3];
    
    // adding the entry to todo
    var todos = get_todos(idCat);
    todos.push(idTodo);
    localStorage.setItem('todoOrder-' + idCat, JSON.stringify(todos));
    
    // deleting the entry from done
    var dones = get_dones(idCat);
    dones.splice(idPosition, 1);
    localStorage.setItem('doneOrder-' + idCat, JSON.stringify(dones));
    
    if (isHome == "viewAll") {
        show();
    } else {
        document.getElementById('cat-' + idCat).click();
    };
    
    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var idCat = id.split("-")[0];
    var idPosition = id.split("-")[1];
    var idTodo = id.split("-")[2];
    var isDone = id.split("-")[3];
    var isHome = id.split("-")[4];
    
    if (isDone == "todo") {
        // removing entry from todo list
        var todos = get_todos(idCat);
        todos.splice(idPosition, 1);
        localStorage.setItem('todoOrder-' + idCat, JSON.stringify(todos));
    } else {
        // removing entry from done list
        var dones = get_dones(idCat);
        dones.splice(idPosition, 1);
        localStorage.setItem('doneOrder-' + idCat, JSON.stringify(dones));
    }
    
    // removing the entry itself
    localStorage.removeItem('todo-' + idTodo);
    
    if (isHome == "homeErase") {
        show();
    } else {
        document.getElementById('cat-' + idCat).click();
    };
    
    return false;
}

function defineBorder(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function colorToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function rgbToHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}

function empty_cat(a) {
    var todos = get_todos(a);
    for (var i=0; i<todos.length; i++) {
        localStorage.removeItem('todo-' + todos[i]);
    }
    var dones = get_dones(a);
    for (var i=0; i<dones.length; i++) {
        localStorage.removeItem('todo-' + dones[i]);
    }
    
    localStorage.removeItem('todoOrder-' + a);
    localStorage.removeItem('doneOrder-' + a);
}

function delete_cat(a) {
    empty_cat(a);
    
    // deleting the category ID from categories list
    var cats = get_cats();
    for (var i=0; i<cats.length; i++) {
        if (a == cats[i]) {
            cats.splice(i, 1);
        }
    }
    localStorage.setItem('catList', JSON.stringify(cats));
}

function clear_tasks() {
    var cats = get_cats();
    for (var i=0; i<cats.length; i++) {
        empty_cat(cats[i]);
    }
    empty_cat('home');
}

function preventHTML(text) {
    // preventing HTML code from running in the to-do list
    var textDisplay = text.replace(/</g, '&lt;');
    // textDisplay = text.replace(/>/g, '&gt;'); // Cukup 1 yang diubah. Kalau dua-duanya malah jadi HTML lagi.
    
    return textDisplay;
}

var menuButton = document.getElementsByClassName('menu')[0];
var pageTitle = document.getElementsByClassName('catTitle')[0];

function modify_page() {
    document.getElementsByClassName('header')[0].style.background = themeMain;
    
    pageTitle.style.display = ""; // make sure it is shown even if categories disabled
    pageTitle.style.color = themeText;
    
    menuButton.innerHTML = "&#10092;&#xFE0E;";
    // when the user clicks on menu button, process and reset the menu button appearance & function
    menuButton.onclick = function() {
        show();
        window.scrollTo(0, 0);
    };
    
    document.getElementById('categories').innerHTML = "";
    
    // hide the input
    document.getElementsByClassName('task')[0].style.display = "none";
    document.getElementById('add').style.display = "none";
    
    window.scrollTo(0, 0);
}

function show_help() {
    modify_page();
    document.getElementsByClassName('catTitle')[0].innerHTML = "Help";
    
    var pageContent = '' +
        '<div style="padding:12px;font-weight:bold;border-bottom:1px solid #bbb;">Task Management</div>' +
        '<div style="padding: 16px 12px; text-align: justify;">' +
        '<center><img style="border:1px solid rgba(0,0,0,0.3); margin:0 auto 12px auto;" src="images/help1.png" alt="[img]"></center>' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Task categories</span>' +
        'Switch between all tasks and categorized display with the <span class="helpSpan" style="background:#ef5350;">tabs</span>. ' +
        'Use <span class="helpSpan" style="background:#7e57c2;">+</span> to add more categories.' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Adding a new task</span>' +
        'Add a new task from the <span class="helpSpan" style="background:#42a5f5;">input</span>. ' +
        'Tasks inputted from the home screen will be saved as uncategorized.' +
        '<br>' +
        '<center><img style="border:1px solid rgba(0,0,0,0.3); margin:12px auto;" src="images/help2.png" alt="[img]"></center>' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Marking a task</span>' +
        'Tap/click on the <span class="helpSpan" style="background:#26c6da;">task text</span> to mark it as done. ' +
        'Tapping/clicking on the text of a done task will unmark it and return it as a to-do.' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Reordering tasks</span>' +
        'Simply <span class="helpSpan" style="background:#66bb6a;">drag and drop</span> to reorder tasks inside the list.' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Deleting a task</span>' +
        'Use <span class="helpSpan" style="background:#ff8f00;">&#10005;&#xFE0E;</span> to delete a task.<br>' +
        '</div>' +
        '<div style="padding:12px;font-weight:bold;border-bottom:1px solid #bbb;">Categories Management</div>' +
        '<div style="padding: 16px 12px; text-align: justify;">' +
        'You can manage your task categories from the <span class="helpMenu">&#65378;&#xFE0E;Manage Categories&#65379;&#xFE0E;</span> menu.<br>' +
        '<center><img style="border:1px solid rgba(0,0,0,0.3); margin:12px auto;" src="images/help3.png" alt="[img]"></center>' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Reordering categories</span>' +
        'To rearrange the order of categories displayed on the tabs, <span class="helpSpan" style="background:#ec407a;">drag and drop</span> the categories list.' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Editing a category</span>' +
        'To modify the name, colors and icon of an existing category, use <span class="helpSpan" style="background:#5c6bc0;">&#9998;&#xFE0E;</span> beside the category name.' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Emptying a category</span>' +
        'Emptying a category can be done with <span class="helpSpan" style="background:#26a69a;">&#9851;&#xFE0E;</span>. It will delete all tasks (to-do and done) inside it.' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Deleting a category</span>' +
        'To delete a category, use <span class="helpSpan" style="background:#8bc34a;">&#10005;&#xFE0E;</span>. ' +
        'Deleting a category will also delete the to-do and done tasks inside it.' +
        '<span class="helpItem" style="color:' + themeMain + ';">&#10095;&#xFE0E; Disabling &amp; re-enabling category system</span>' +
        'You have the option to disable or enable the category system with the <span class="helpSpan" style="background:#f9a825;">toggle</span>. ' +
        'When disabled, the existing categories (if any) along with the tasks inside them will be hidden. They will be available when you re-enable categories.' +
        '</div>' +
        '<div style="padding:12px;font-weight:bold;border-bottom:1px solid #bbb;">Style Management</div>' +
        '<div style="padding: 16px 12px; text-align: justify;">' +
        '<center><img style="border:1px solid rgba(0,0,0,0.3); margin:0 auto 12px auto;" src="images/help4.png" alt="[img]"></center>' +
        'You can change how the app looks from the <span class="helpMenu">&#65378;&#xFE0E;Appearance&#65379;&#xFE0E;</span> menu. ' +
        'Simply select one of the available <span class="helpSpan" style="background:#ff7043;">themes</span> to do so.' +
        '</div>';
    
    document.getElementById('todos').innerHTML = pageContent;
}

function show_about() {
    modify_page();
    document.getElementsByClassName('catTitle')[0].innerHTML = "About";
    
    var pageContent = '<div style="padding: 16px 12px;"><center>' +
        '<img style="margin-top:4px;" src="images/appIcon.png" alt="logo">' +
        '<span style="display:block; font-size:1.25em; font-weight:bold; padding:12px 0;">simplyDo</span>' +
        '<i>version 1.0</i><br>' +
        '&#xa9; 2017 Asmoro Budi Nugroho</center><br>' +
        'Keep track of what to do. In style.<br><br>' +
        'A free and open source customizable to-do list app with category support.<br><br>' +
        'This software is licensed under Eclipse Public Licensing (EPL). For more information, visit <a href="http://opensource.org/licenses/EPL-1.0" target="_blank">http://opensource.org/licenses/EPL-1.0</a><br><br>' +
        'Brought to you by <b>upforward</b><br>' +
        '<center><img style="margin:12px auto;" src = "images/upforward.png" alt="upforward logo"></center>' +
        '<a href="http://apps.upforward.net" target="_blank">http://apps.upforward.net</a><br></div>' +
        '<div style="padding:16px 12px; border-top:1px solid #bbb;">' +
        '<b>Libraries &amp; Other Asset</b><br>' +
        'Drag & Drop Support: <a href="https://rubaxa.github.io/Sortable/" target="_blank">Sortable JS</a> by Rubaxa<br>' +
        'Header Auto-hide Support: <a href="http://wicky.nillia.ms/headroom.js/" target="_blank">Headroom.js</a> by @WickyNilliams<br>' +
        'Unicode Icons Font: <a href="http://jslegers.github.io/emoji-icon-font/" target="_blank">Emoji Icon Font</a> by jslegers' +
        '</div>';

    document.getElementById('todos').innerHTML = pageContent;
}

function style_set() {
    modify_page();
    document.getElementsByClassName('catTitle')[0].innerHTML = "Appearance";
    
    var HTMLcat = '<div style="padding:12px 16px; border-bottom:1px solid #bbb; overflow:auto;">' +
        'Select Theme' +
        '</div>';
    
    for (var k in themes) {
        HTMLcat += '<div id="theme-' + k + '" class="themeList" style="background: ' + themes[k].main + '; color: ' + themes[k].text + '">'+themes[k].name+'</div>';
    }
    
    // change list of todos into list of themes
    document.getElementById('todos').innerHTML = HTMLcat;
    
    themeList = document.getElementsByClassName('themeList');
    
    var isOnList = 0;
    for (var i=0; i<themeList.length; i++) {
        if (themeList[i].id.split("-")[1] == themeName) {
            themeList[i].className += " checked";
            themeList[i].style.border = "2px solid #000";
            themeList[i].style.padding = "10px 6px 10px 38px"; // diubah karena nama theme akan bergeser kalau ditambahin border
        }
    }
    
    function themeListReset() {
        for (var i=0; i < themeList.length; i++) {
            themeList[i].className = "themeList";
            themeList[i].style.border = "";
            themeList[i].style.padding = "12px 8px 12px 40px"; // mengembalikan value karena diubah on click
        }
    }

    for (var i=0; i < themeList.length; i++) {
        themeList[i].onmouseover = function() {
            var themeId = this.id.split("-")[1];
            this.style.background = themes[themeId].dark;
        }
        themeList[i].onmouseout = function() {
            var themeId = this.id.split("-")[1];
            this.style.background = themes[themeId].main;
        }

        themeList[i].onclick = function() {
            themeListReset();
            
            this.className += " checked";
            this.style.border = "2px solid #000";
            this.style.padding = "10px 6px 10px 38px"; // diubah karena nama theme akan bergeser kalau ditambahin border
            
            // LALU UBAH ACTIVE THEME
            var themeId = this.id.split("-")[1];
            var mainCol = themes[themeId].main;
            var darkCol = themes[themeId].dark;
            var textCol = themes[themeId].text;
            
            var themeContent = new Array();
            themeContent.push(themeId);
            themeContent.push(mainCol);
            themeContent.push(darkCol);
            themeContent.push(textCol);
            
            localStorage.setItem('appTheme', JSON.stringify(themeContent));
            appTheme = themeId;
            themeName = themeId;
            themeMain = mainCol;
            themeDark = darkCol;
            themeText = textCol;
            
            document.getElementById('head').style.background = mainCol;
            document.getElementById('head').style.color = textCol;
            document.getElementById('head').style.borderBottomColor = darkCol;
            document.getElementById('categories').style.background = darkCol;
            document.getElementsByClassName('header')[0].style.background = mainCol;
            document.getElementsByClassName('header')[0].style.color = textCol;
            
            // agar list theme kembali ke warna semula di perangkat layar sentuh (hover kan berubah warna, layar sentuh onmouseout ga jalan)
            style_set();
        }
    }
}

function manage_cat() {
    modify_page();
    document.getElementsByClassName('catTitle')[0].innerHTML = "Manage Categories";
    
    var cats = get_cats();
    
    var HTMLcat = '<div style="padding:12px 16px; border-bottom:1px solid #bbb; overflow:auto;">' +
        '<label class="switchInfo">Enable Categories</label>' +
        '<label class="switch"><input type="checkbox" id="catToggle" checked><div class="slider"></div></label>' +
        '</div>';
    HTMLcat += '<div id="catMngWrap"></div>'; // content modified via script
    
    // change list of todos into list of categories
    document.getElementById('todos').innerHTML = HTMLcat;
    
    var catToggle = document.getElementById('catToggle');
    var catMngWrap = document.getElementById('catMngWrap');
    
    var catState = get_catState();
    
    if (catState == "0") {
        catToggle.removeAttribute('checked');
        
        var catMngContent = '<div class="catMngNotif">' +
            'Categories are currently disabled. To enable categories, use the toggle switch above.';
            '</div>';
    } else {
        catToggle.setAttribute('checked', 'checked');
        
        var catsNum = get_cats();
        if (catsNum.length == 0) {
            var catMngContent = '<div class="catMngNotif">' +
            'There are no categories available. You can make on from the app\'s home screen';
            '</div>';
        } else {
            var catMngContent = '<div style="padding:12px 16px;">Drag &amp; drop to rearrange categories</div>' +
                '<ul id="catOrderMng">';
            for(var i=0; i<cats.length; i++) {
                var catId = cats[i];
                var catData = get_catData('cat-' + catId);
                
                var catTodos = get_todos(catId);
                var catDones = get_dones(catId);
                if (catTodos.length > 0 || catDones.length > 0) {
                    var emptyBtnClass = "catEmpty";
                } else {
                    var emptyBtnClass = "catEmpty2";
                }
                
                var definedBorder = defineBorder(catData[1], -0.25);
                
                catMngContent += '<li class="catMng" id="catMng-' + catId + '"><span class="catEdit" id="catEdit-' + catId + '">&#9998;&#xFE0E;</span>' + catData[0] + '<span class="' + emptyBtnClass + '" id="catEmpty-' +catId +'">&#9851;&#xFE0E;</span><span class="catDel" id="catDel-' + catId + '">&#10005;&#xFE0E;</span></li>';
            };
            catMngContent += '</ul>';
        }
    }
    catMngWrap.innerHTML = catMngContent;
    
    catToggle.onclick = function() {
        if (catState == "0") {
            localStorage.setItem('catState', '1');
        } else {
            localStorage.setItem('catState', '0');
        }
        setTimeout(manage_cat, 400); // value 400 ini = 0.4s transisi CSS toggle, yak. Biar animasi jalan sebelum halaman berubah.
    }
    
    // define lists' button functions
    var catEditBtn = document.getElementsByClassName('catEdit');
    for (var i=0; i < catEditBtn.length; i++) {
        catEditBtn[i].addEventListener('click', showModal);
    };
    var catEmptyBtn = document.getElementsByClassName('catEmpty');
    for (var i=0; i < catEmptyBtn.length; i++) {
        catEmptyBtn[i].addEventListener('click', showModal);
    };
    var catDelBtn = document.getElementsByClassName('catDel');
    for (var i=0; i < catDelBtn.length; i++) {
        catDelBtn[i].addEventListener('click', showModal);
    };
    
    // SORTABLE in action
    var catLi = document.getElementById('catOrderMng');
    var sortable = Sortable.create(catLi, {
        delay: 100,
        onUpdate: function (catSort) {
            // Saving the acquired sorting (called each time upon sorting modification)
            listUpdate('manage_cat');
            manage_cat();
        }
    });
}

function show_cat() {
    // get the category data
    var catId = this.getAttribute('id');
    
    if(catId == "cat-home") {
        show();
    } else {
        var catData = get_catData(catId);
        var catName = catData[0];
        if (catData[1] == "default") {
            var catBg = themeMain;
        } else {
            var catBg = catData[1];
        }
        if (catData[3] == "default") {
            var catColor = themeText;
        } else {
            var catColor = catData[3];
        }
        
        var catTabs = document.getElementsByClassName('cat');
        for (var i=0; i<catTabs.length; i++) {
            catTabBg = catTabs[i].style.backgroundColor;
            catTabs[i].style.borderBottomColor = defineBorder(colorToHex(catTabBg), -0.25);
        };
        
        this.style.borderBottomColor = catBg;
        
        // split cat-*** to get ***
        // ID elemen harus unik, jadi ga bisa asal pake cat-***
        var idShort = catId.split("-")[1];
        
        document.getElementsByClassName('header')[0].style.background = catBg;
        document.getElementsByClassName('catTitle')[0].style.color = catColor;
        document.getElementsByClassName('catTitle')[0].innerHTML = catName;
        document.getElementsByClassName('task')[0].id = "task-" + idShort;
        if (catBg == "#ffffff") {
            document.getElementsByClassName('task')[0].style.background = "#ececec";
        }
        
        // get the list of todos
        var todos = get_todos(idShort);
        
        var todo2display = '<ul id="todoList">';
        for(var i=0; i<todos.length; i++) {
            var todoContent = get_todoData(todos[i]);
            
            todo2display += '<li class="unchecked-' + idShort + '" id="todo-' + todos[i] + '"><span class="todo" id="' + idShort + '-' + i + '-' + todos[i] + '-' + '">' + todoContent + '</span><span class="erase" id="' + idShort + '-' + i + '-' + todos[i] + '-todo-catErase">&#10005;&#xFE0E;</span></li>';
        };
        todo2display += '</ul>';
        
        // get the list of dones
        var dones = get_dones(idShort);
        
        var done2display = '<ul id="doneList">';
        for(var i=0; i<dones.length; i++) {
            var doneContent = get_todoData(dones[i]);
            
            done2display += '<li class="checked-' + idShort + '" id="done-' + dones[i] + '"><span class="done" id="' + idShort + '-' + i + '-' + dones[i] + '-' + '">' + doneContent + '</span><span class="erase" id="' + idShort + '-' + i + '-' + dones[i] + '-done-catErase">&#10005;&#xFE0E;</span></li>';
        };
        done2display += '</ul>';
        
        // now, show them!
        document.getElementById('todos').innerHTML = todo2display+done2display;
        
        // check for todos
        var list = document.getElementsByClassName('todo');
        for (var i=0; i < list.length; i++) {
            list[i].addEventListener('click', check);
        };
        
        // uncheck for dones
        var list2 = document.getElementsByClassName('done');
        for (var i=0; i < list2.length; i++) {
            list2[i].addEventListener('click', uncheck);
        };
        
        // erase button for both todos & dones
        var buttons = document.getElementsByClassName('erase');
        for (var i=0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', remove);
        };
        
        // SORTABLE in action
        var todoLi = document.getElementById('todoList');
        var sortableTodo = Sortable.create(todoLi, {
            delay: 100,
            onUpdate: function (todoSort) {
                listUpdate('todoList-' + idShort);
                
                // simulate click on category tab to prevent button confusion (lihat comment sortable show() )
                document.getElementById('cat-' + idShort).click();
            }
        });
        var doneLi = document.getElementById('doneList');
        var sortableDone = Sortable.create(doneLi, {
            delay: 100,
            onUpdate: function (doneSort) {
                listUpdate('doneList-' + idShort);
                
                // simulate click on category tab to prevent button confusion (lihat comment sortable show() )
                document.getElementById('cat-' + idShort).click();
            }
        });
    }
}

function show() {
    // define menu button function in case modified by modify_page()
    menuButton.innerHTML = "&#9776;&#xFE0E;";
    menuButton.onclick = function() {
        openMenu();
    }
    
    // modify page style according to theme
    document.getElementById('head').style.background = themeMain;
    document.getElementById('head').style.color = themeText;
    document.getElementById('head').style.borderBottomColor = themeDark;
    document.getElementById('preContent').style.background = themeMain;
    document.getElementById('preContent').style.color = themeMain;
    document.getElementById('preContent').style.borderBottomColor = themeDark;
    document.getElementById('categories').style.background = themeDark;
    
    // SHOWING THE CATEGORIES
    // get the list of cats
    var cats = get_cats();
    
    var HTMLcat = '<div class="cat" id="cat-home" style="background: ' + themeMain + '; border-right: 1px solid ' + themeDark + '; border-bottom: 1px solid ' + themeMain + ';">&#x1f315;&#xFE0E;</div>';
    for(var i=0; i<cats.length; i++) {
        var catId = cats[i];
        var catData = get_catData('cat-' + catId);
        
        if (catData[1] == "default") {
            var catTabBgcol = themeMain;
        } else {
            var catTabBgcol = catData[1];
        }
        if (catData[2] == "default") {
            var catTabIcon = catData[0].charAt(0);
        } else {
            var catTabIcon = catData[2];
        }
        if (catData[3] == "default") {
            var catTabText = themeText;
        } else {
            var catTabText = catData[3];
        }
        
        var definedBorder = defineBorder(catTabBgcol, -0.25);
        
        HTMLcat += '<div class="cat" id="cat-' + catId + '" style="background: ' + catTabBgcol + '; color: ' + catTabText + '; border-right: 1px solid ' + definedBorder + ';">' + catTabIcon + '</div>';
    };
    HTMLcat += '<div class="addCat"><span>&#x2715;&#xFE0E;</span></div>';
    
    // now, show them!
    var categoryTabs = document.getElementById('categories');
    var categoryName = document.getElementsByClassName('catTitle')[0];
    categoryTabs.innerHTML = HTMLcat;
    
    // ... or not (if categories is actually disabled by user)
    var catState = get_catState();
    if (catState == "0") {
        categoryTabs.style.display = "none";
        categoryName.style.display = "none";
        var uncategorizedTitle = "";
    } else {
        categoryTabs.style.display = "";
        categoryName.style.display = "";
        var uncategorizedTitle = '<div style="background:#ededed; padding:8px; font-weight:bold; border-bottom:1px solid #ccc;">Uncategorized</div>';
    }
    
    // When the user clicks on the tab, switch to it
    var catTab = document.getElementsByClassName('cat');
    for (var i=0; i < catTab.length; i++) {
        catTab[i].addEventListener('click', show_cat);
    };
    
    // When the user clicks on the button, open the modal dialog
    var addCat = document.getElementsByClassName('addCat')[0];
    addCat.style.color = defineBorder(themeDark, 0.45);
    addCat.addEventListener('click', showModal);
    
    // SHOWING THE INPUT
    // (make them appear in case were hidden because of opening menu)
    document.getElementsByClassName('task')[0].style.display = "block";
    document.getElementById('add').style.display = "block";
    
    // SHOWING THE TO-DO LIST
    // modify elements based on the category (All)
    document.getElementsByClassName('header')[0].style.background = themeMain;
    document.getElementsByClassName('catTitle')[0].style.color = "inherit";
    document.getElementsByClassName('catTitle')[0].innerHTML = "All Tasks";
    document.getElementsByClassName('task')[0].id = "task-home";
    
    var categoriesDisplay = '';
    
    var uncatTodos = get_todos('home');
    var uncatDones = get_dones('home');
    
    if (uncatTodos.length > 0 || uncatDones.length > 0) {
        if (cats.length > 0) {
            categoriesDisplay += uncategorizedTitle;
        }
        // show uncategorized todos
        categoriesDisplay += '<ul id="todoList-home">';
        for(var i=0; i<uncatTodos.length; i++) {
            var uncatTodoContent = preventHTML(get_todoData(uncatTodos[i]));
            
            categoriesDisplay += '<li class="unchecked-home" id="todo-' + uncatTodos[i] +'"><span class="todo" id="home-' + i + '-' + uncatTodos[i] + '-viewAll">' + uncatTodoContent + '</span><span class="erase" id="home-' + i + '-' + uncatTodos[i] + '-todo-homeErase">&#10005;&#xFE0E;</span></li>';
        };
        categoriesDisplay += '</ul>';
        
        // show uncategorized dones
        categoriesDisplay += '<ul id="doneList-home">';
        for(var i=0; i<uncatDones.length; i++) {
            var uncatDoneContent = get_todoData(uncatDones[i]);
            
            categoriesDisplay += '<li class="checked-home" id="done-' + uncatDones[i] +'"><span class="done" id="home-' + i + '-' + uncatDones[i] + '-viewAll">' + uncatDoneContent + '</span><span class="erase" id="home-' + i + '-' + uncatDones[i] + '-done-homeErase">&#10005;&#xFE0E;</span></li>';
        };
        categoriesDisplay += '</ul>';
    }
    
    if (catState !== 0) { // atau != "0"
        for(var i=0; i<cats.length; i++) {
            var catId = cats[i];
            var catData = get_catData('cat-' + catId);
            var catName = catData[0];
            if (catData[1] == "default") {
                var catBg = themeMain;
            } else {
                var catBg = catData[1];
            }
            if (catData[3] == "default") {
                var catTxt = themeText;
            } else {
                var catTxt = catData[3];
            }
            
            if (catBg == "#ffffff") { catBg = "#cecece"; };
            
            categoriesDisplay += '<div style="position:relative; padding:8px; font-weight:bold; border-bottom:1px solid '+catBg+'; border-right:6px solid '+catBg+';">' + catName + '</div>';
            
            // get the list of todos
            var todos = get_todos(catId);
            
            categoriesDisplay += '<ul class="homeTodo" id="todoList-' + catId + '">';
            for(var c=0; c<todos.length; c++) {
                var todoContent = get_todoData(todos[c]);
                
                categoriesDisplay += '<li class="unchecked-' + catId + '" id="todo-' + todos[c] +'"><span class="todo" id="' + catId + '-' + c + '-' + todos[c] + '-viewAll">' + todoContent + '</span><span class="erase" id="' + catId + '-' + c + '-' + todos[c] + '-todo-homeErase">&#10005;&#xFE0E;</span></li>';
            };
            categoriesDisplay += '</ul>';
            
            // get the list of dones
            var dones = get_dones(catId);
            
            categoriesDisplay += '<ul class="homeDone" id="doneList-' + catId + '">';
            for(var c=0; c<dones.length; c++) {
                var doneContent = get_todoData(dones[c]);
                
                categoriesDisplay += '<li class="checked-' + catId + '" id="done-' + dones[c] + '"><span class="done" id="' + catId + '-' + c + '-' + dones[c] + '-viewAll">' + doneContent + '</span><span class="erase" id="' + catId + '-' + c + '-' + dones[c] + '-done-homeErase">&#10005;&#xFE0E;</span></li>';
            };
            categoriesDisplay += '</ul>';
        };
    }
    // now, show them!
    document.getElementById('todos').innerHTML = categoriesDisplay;
    
    // check for todos
    var list = document.getElementsByClassName('todo');
    for (var i=0; i < list.length; i++) {
        list[i].addEventListener('click', check);
    };

    // uncheck for dones
    var list2 = document.getElementsByClassName('done');
    for (var i=0; i < list2.length; i++) {
        list2[i].addEventListener('click', uncheck);
    };

    // erase button for both todos & dones
    var buttons = document.getElementsByClassName('erase');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };

    // SORTABLE in action
    //// for uncategorized, we can simply use the ID like in show_cat()
    var todoLiHome = document.getElementById('todoList-home');
    // beda dengan di kategori (yang pasti ada ul-nya), kita perlu memastikan todoLiHome dkk ini ada, atau sortable create ga jalan
    if (todoLiHome) {
        var sortableTodoHome = Sortable.create(todoLiHome, {
            delay: 100,
            onUpdate: function (todoSortHome) {
                listUpdate('todoList-home');
                show(); // kalo ga di-show-in, entah kenapa menu-menu di-list kacau, misal klik x yang kehapus lebih dari 1
            }
        });
    }
    var doneLiHome = document.getElementById('doneList-home');
    if (doneLiHome) {
        var sortableDoneHome = Sortable.create(doneLiHome, {
            delay: 100,
            onUpdate: function (doneSortHome) {
                listUpdate('doneList-home');
                show();
            }
        });
    }
    //// for categorized ones, the IDs will vary, depend on how many categories the user made and/or deleted, so we use the classes instead
    var todoLiCat = document.getElementsByClassName('homeTodo');
    if (todoLiCat) {
        for (var i=0; i < todoLiCat.length; i++) {
            (function (i) {
                var todoLiCatId = todoLiCat[i].id.split("-")[1];
                var sortableTodoCat = Sortable.create(todoLiCat[i], {
                    delay: 100,
                    onUpdate: function (todoSortCat) {
                        listUpdate('todoList-' + todoLiCatId);
                        show();
                    }
                });
            })(i);
        }
    }

    var doneLiCat = document.getElementsByClassName('homeDone');
    if (doneLiCat) {
        for (var i=0; i < doneLiCat.length; i++) {
            (function (i) {
                var doneLiCatId = doneLiCat[i].id.split("-")[1];
                var sortableDoneCat = Sortable.create(doneLiCat[i], {
                    delay: 100,
                    onUpdate: function (doneSortCat) {
                        listUpdate('doneList-' + doneLiCatId);
                        show();
                    }
                });
            })(i);
        }
    }
}

document.getElementById('add').addEventListener('click', add);
// simulate click on 'add' when the user presses Enter on keyboard
document.getElementsByClassName('task')[0].onkeypress = function (e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;
    if (charCode == '13') {
        document.getElementById('add').click();
        return false;
    }
}

show();

// Modal Dialog for Add Categories
var modal = document.getElementById('addCatDialog');
var addCatWrapper = document.getElementsByClassName('addCat-wrapper')[0];
var addCatHeader = document.getElementsByClassName('addCat-header')[0];

function showModal() {
    // get the id of the element that triggers the modal
    var triggerId = this.id;
    var triggerType = triggerId.split("-")[0];
    var triggerIdNum = triggerId.split("-")[1];
    
    // define what to display in the modal
    addCatHeader.innerHTML = '<div id="addCat-title"><b>Add Category</b></div>' +
        '<div id="addCat-input">' +
            '<input type="text" id="catName" placeholder="Category Name">' +
        '</div>';
    
    addCatWrapper.innerHTML = '<input type="hidden" id="catColor" value="default">' + // value will be overridden when user select a color
        '<div class="optionTitle">Category Color</div>' +
        '<div class="colorSelect">' +
            '<div class="col" style="background:#e57373;"></div>' +
            '<div class="col" style="background:#ffb74d;"></div>' +
            '<div class="col" style="background:#fff176;"></div>' +
            '<div class="col" style="background:#aed581;"></div>' +
            '<div class="col" style="background:#4fc3f7;"></div>' +
            '<div class="col" style="background:#7986cb;"></div>' +
            '<div class="col" style="background:#ba68c8;"></div>' +
        '</div>' +
        '<div id="advancedOptions">' +
            '<div class="sliderInfo">You can also use these sliders to set your own color:</div>' +
            '<div id="colorSlider">' +
                '<span class="rgb">Red</span><span id="rVal">128</span>' +
                '<input type="range" id="colorR" min="0" max="255" value="128"><br>' +
                '<span class="rgb">Green</span><span id="gVal">128</span>' +
                '<input type="range" id="colorG" min="0" max="255" value="128"><br>' +
                '<span class="rgb">Blue</span><span id="bVal">128</span>' +
                '<input type="range" id="colorB" min="0" max="255" value="128"><br>' +
            '</div>' +
        '</div>' +
        '<div id="showAdvanced"><span id="showAdvText">Show Advanced Options</span><span id="showAdvButton">&#9660;&#xFE0E;</span></div>' + // Up pointing &#9650;&#xFE0E;
        '<div class="optionInfo"><i>If you don\'t pick a color, the category color will follow the theme.</i></div>' +
        '<div class="optionTitle">Icon<!-- & Texts --></div>' +
        '<div class="optionInfo">Pick an icon:</div>' +
        '<input type="hidden" id="catIcon" value="default">' + // overridden if user select an icon
        '<div id="iconSelect">' + // content modified via script
        '</div>' +
        '<div class="optionInfo"><i>If you don\'t pick an icon, the first letter of the category name will be used instead.</i></div>' +
        '<input type="hidden" id="catIcoColor" value="default">' + // overridden if user select a color
        '<div class="optionInfo">Pick a color for the category icon and name:</div>' +
        '<div class="colorSelect">' +
            '<div class="col2" id="textWhite" style="background:#ffffff; border: 1px solid #333;"></div>' +
            '<div class="col2" id="textBlack" style="background:#000000; border: 1px solid #333;"></div>' +
        '</div>' +
        '<div id="advancedOptions2">' +
            '<div class="sliderInfo">You can also use these sliders to set your own color:</div>' +
            '<div id="colorSlider2">' +
                '<span class="rgb">Red</span><span id="rVal2">0</span>' +
                '<input type="range" id="colorR2" min="0" max="255" value="0"><br>' +
                '<span class="rgb">Green</span><span id="gVal2">0</span>' +
                '<input type="range" id="colorG2" min="0" max="255" value="0"><br>' +
                '<span class="rgb">Blue</span><span id="bVal2">0</span>' +
                '<input type="range" id="colorB2" min="0" max="255" value="0"><br>' +
            '</div>' +
        '</div>' +
        '<div id="showAdvanced2"><span id="showAdvText2">Show Advanced Options</span><span id="showAdvButton">&#9660;&#xFE0E;</span></div>' +
        '<div class="optionInfo"><i>If you don\'t pick a color, the icon and name color will follow the theme.</i></div>' +
        '<div class="optionInfo">Tapping/clicking on a selected item in the color palettes/icon list will unselect it.</div>' +
        '<div id="addCat-buttons">' +
            '<span class="add">Add</span>' +
            '<span class="cancel">Cancel</span>' +
        '</div>';
    
    // Modal Dialog: Icon Set Display
    var iconJSON = '{"icons":[ ' +
            '{"reference":"&#x26a0;&#xFE0E;"},' +
            '{"reference":"&#x26a1;&#xFE0E;"},' +
            '{"reference":"&#x1f45c;&#xFE0E;"},' +
            '{"reference":"&#x1f5d1;&#xFE0E;"},' +
            '{"reference":"&#x2600;&#xFE0E;"},' +
            '{"reference":"&#x1f318;&#xFE0E;"},' +
            '{"reference":"&#x2605;&#xFE0E;"},' +
            '{"reference":"&#x2601;&#xFE0E;"},' +
            '{"reference":"&#x2602;&#xFE0E;"},' +
            '{"reference":"&#x2744;&#xFE0E;"},' +
            '{"reference":"&#x2699;&#xFE0E;"},' +
            '{"reference":"&#x1f58a;&#xFE0E;"},' +
            '{"reference":"&#x1f3a8;&#xFE0E;"},' +
            '{"reference":"&#x1f4da;&#xFE0E;"},' +
            '{"reference":"&#x1f3ac;&#xFE0E;"},' +
            '{"reference":"&#x266c;&#xFE0E;"},' +
            '{"reference":"&#x26f1;&#xFE0E;"},' +
            '{"reference":"&#x26fa;&#xFE0E;"},' +
            '{"reference":"&#x1f68d;&#xFE0E;"},' +
            '{"reference":"&#x2693;&#xFE0E;"},' +
            '{"reference":"&#x2708;&#xFE0E;"},' +
            '{"reference":"&#x26bd;&#xFE0E;"},' +
            '{"reference":"&#x1f3e0;&#xFE0E;"},' +
            '{"reference":"&#x1f3e2;&#xFE0E;"},' +
            '{"reference":"&#x1f5c1;&#xFE0E;"},' +
            '{"reference":"&#x1f5b9;&#xFE0E;"},' +
            '{"reference":"&#x1f5bc;&#xFE0E;"},' +
            '{"reference":"&#x1f3f7;&#xFE0E;"},' +
            '{"reference":"&#x1f4d2;&#xFE0E;"},' +
            '{"reference":"&#x2615;&#xFE0E;"},' +
            '{"reference":"&#x1f35c;&#xFE0E;"},' +
            '{"reference":"&#x2665;&#xFE0E;"},' +
            '{"reference":"&#x2640;&#xFE0E;"},' +
            '{"reference":"&#x2642;&#xFE0E;"},' +
            '{"reference":"&#x263a;&#xFE0E;"},' +
            '{"reference":"&#x2639;&#xFE0E;"},' +
            '{"reference":"&#x2702;&#xFE0E;"},' +
            '{"reference":"&#x260e;&#xFE0E;"},' +
            '{"reference":"&#x1f4fa;&#xFE0E;"},' +
            '{"reference":"&#x1f4fb;&#xFE0E;"},' +
            '{"reference":"&#x1f4f7;&#xFE0E;"},' +
            '{"reference":"&#x1f4f1;&#xFE0E;"},' +
            '{"reference":"&#x1f5a5;&#xFE0E;"},' +
            '{"reference":"&#x1f4bb;&#xFE0E;"},' +
            '{"reference":"&#x1f5b6;&#xFE0E;"},' +
            '{"reference":"&#x1f3ae;&#xFE0E;"},' +
            '{"reference":"&#x1f381;&#xFE0E;"},' +
            '{"reference":"&#x1f511;&#xFE0E;"},' +
            '{"reference":"&#x1f50f;&#xFE0E;"},' +
            '{"reference":"&#x1f6e0;&#xFE0E;"},' +
            '{"reference":"&#x1f374;&#xFE0E;"},' +
            '{"reference":"&#x2694;&#xFE0E;"},' +
            '{"reference":"&#x1f46a;&#xFE0E;"},' +
            '{"reference":"&#x1f6bc;&#xFE0E;"},' +
            '{"reference":"&#x1f44d;&#xFE0E;"},' +
            '{"reference":"&#x1f44e;&#xFE0E;"},' +
            '{"reference":"&#x1f451;&#xFE0E;"},' +
            '{"reference":"&#x1f340;&#xFE0E;"},' +
            '{"reference":"&#x2620;&#xFE0E;"},' +
            '{"reference":"&#x1f4c5;&#xFE0E;"},' +
            '{"reference":"&#x1f4a1;&#xFE0E;"},' +
            '{"reference":"&#x1f48a;&#xFE0E;"},' +
            '{"reference":"&#x1f5c4;&#xFE0E;"},' +
            '{"reference":"&#x1f48b;&#xFE0E;"},' +
            '{"reference":"&#x1f3c6;&#xFE0E;"},' +
            '{"reference":"&#x1f382;&#xFE0E;"},' +
            '{"reference":"&#x1f455;&#xFE0E;"},' +
            '{"reference":"&#x1f457;&#xFE0E;"},' +
            '{"reference":"&#x26d4;&#xFE0E;"},' +
            '{"reference":"&#x1f4b0;&#xFE0E;"}' +
        ']}';
      
    var iconData = JSON.parse(iconJSON);
    var iconDisplay = '';
    for (var i = 0; i < iconData.icons.length; i++) {
        iconDisplay += '<div class="ico" id="' + iconData.icons[i].reference + '">' + iconData.icons[i].reference + '</div>';
    }
    document.getElementById('iconSelect').innerHTML = iconDisplay;
    
    var span = document.getElementsByClassName('closeModal')[0];
    var cancel = document.getElementsByClassName('cancel')[0];
    var add = document.getElementsByClassName('add')[0];
    
    // Modal Dialog: Advanced Options Toggle
    var adv = document.getElementById('advancedOptions');
    var advToggle = document.getElementById('showAdvanced');
    var advText = document.getElementById('showAdvText');
    var advIndicator = document.getElementById('showAdvButton');
    
    var adv2 = document.getElementById('advancedOptions2');
    var advToggle2 = document.getElementById('showAdvanced2');
    var advText2 = document.getElementById('showAdvText2');
    var advIndicator2 = document.getElementById('showAdvButton2');
    
    advToggle.onclick = function() {
        if (adv.style.display == "block") {
            adv.style.display = "none";
            advText.innerHTML = "Show Advanced Options";
            advIndicator.innerHTML = "&#9660;&#xFE0E;";
        } else {
            adv.style.display = "block";
            advText.innerHTML = "Hide Advanced Options";
            advIndicator.innerHTML = "&#9650;&#xFE0E;";
        }
    }
    advToggle2.onclick = function() {
        if (adv2.style.display == "block") {
            adv2.style.display = "none";
            advText2.innerHTML = "Show Advanced Options";
            advIndicator2.innerHTML = "&#9660;&#xFE0E;";
        } else {
            adv2.style.display = "block";
            advText2.innerHTML = "Hide Advanced Options";
            advIndicator2.innerHTML = "&#9650;&#xFE0E;";
        }
    }
    
    var addCatTitle = document.getElementById('addCat-title');
    var addCatInput = document.getElementById('addCat-input');
    var addCatName = document.getElementById('catName');
    var catColorInput = document.getElementById('catColor');
    var colorSlider = document.getElementById('colorSlider');
    var catColorInput2 = document.getElementById('catIcoColor');
    var colorSlider2 = document.getElementById('colorSlider2');
    var palette = document.getElementsByClassName('col');
    var palette2 = document.getElementsByClassName('col2');
    var catIconInput = document.getElementById('catIcon');
    var iconSet = document.getElementsByClassName('ico');
    var rInput = document.getElementById('colorR');
    var gInput = document.getElementById('colorG');
    var bInput = document.getElementById('colorB');
    var rInput2 = document.getElementById('colorR2');
    var gInput2 = document.getElementById('colorG2');
    var bInput2 = document.getElementById('colorB2');
    
    // making sure the styling is default when no triggertype specified
    addCatHeader.style.background = "#ffffff";
    addCatHeader.style.color = "#000000";
    addCatHeader.style.borderBottomColor = "#dfdfdf";
    colorSlider.style.color = themeText;
    colorSlider2.style.background = themeMain;
    
    if (triggerIdNum !== undefined) {
        var catData = get_catData('cat-' + triggerIdNum);
        if (catData[1] == "default") {
            catBgCol = "default";
            catBgColDisplay = "#ffffff";
        } else {
            catBgCol = catData[1];
            catBgColDisplay = catData[1];
            addCatName.style.background = "#ffffff";
        }
        if (catData[3] == "default") {
            catTxtCol = "default";
            if (catBgCol == "default") {
                catTxtColDisplay = "#000000";
            } else {
                catTxtColDisplay = themeText;
            }
        } else {
            catTxtCol = catData[3];
            catTxtColDisplay = catData[3];
        }
        addCatName.value = catData[0];
        addCatHeader.style.background = catBgColDisplay;
        addCatHeader.style.color = catTxtColDisplay;
        addCatTitle.style.borderBottomColor = defineBorder(catBgColDisplay, -0.25);
    }
    
    if (triggerType == "catEdit") {
        addCatTitle.innerHTML = "<b>Edit Category</b>";
        addCatInput.style.display = "block"; // re-show in case being hidden by other triggerType
        
        var isOnPalette = 0;
        for (var i=0; i<palette.length; i++) {
            if (colorToHex(palette[i].style.backgroundColor) == catBgCol) {
                palette[i].style.border = "2px solid #000";
                isOnPalette += 1;
            }
        }
        if (isOnPalette == 0 && catBgCol !== "default") {
            var bgCol = addCatHeader.style.backgroundColor;
            bgCol = bgCol.replace('rgb(', '');
            bgCol = bgCol.replace(')', '');
            bgColR = bgCol.split(", ")[0];
            bgColG = bgCol.split(", ")[1];
            bgColB = bgCol.split(", ")[2];
            
            colorSlider.style.background = catData[1];
            colorSlider.style.border = "2px solid #000";
            
            rInput.value = bgColR;
            gInput.value = bgColG;
            bInput.value = bgColB;
            
            document.getElementById("rVal").innerHTML = bgColR;
            document.getElementById("gVal").innerHTML = bgColG;
            document.getElementById("bVal").innerHTML = bgColB;
        } else {
            colorSlider.style.background = "rgb(128, 128, 128)";
            rInput.value = '128';
            gInput.value = '128';
            bInput.value = '128';
            
            document.getElementById("rVal").innerHTML = '128';
            document.getElementById("gVal").innerHTML = '128';
            document.getElementById("bVal").innerHTML = '128';
        }
        
        // var isOnIconSet = 0; // ini tidak dibutuhkan selama tidak ada custom icon
        for (var i=0; i<iconSet.length; i++) {
            iconSet[i].style.background = catData[1];
            iconSet[i].style.color = catData[3];
            
            if (iconSet[i].innerHTML == catData[2]) {
                iconSet[i].style.border = "2px solid #000";
                iconSet[i].style.lineHeight = "44px";
                // icOnIconSet += 1;
            }
        }
        
        if (catBgCol !== "default") colorSlider2.style.background = catBgColDisplay;
        var isOnPalette2 = 0;
        for (var i=0; i<palette2.length; i++) {
            if (colorToHex(palette2[i].style.backgroundColor) == catTxtCol) {
                palette2[i].style.border = "2px solid #999";
                isOnPalette2 += 1;
            }
        }
        if (isOnPalette2 == 0 && catTxtCol !== "default") {
            var txtCol = addCatHeader.style.color;
            txtCol = txtCol.replace('rgb(', '');
            txtCol = txtCol.replace(')', '');
            txtColR = txtCol.split(", ")[0];
            txtColG = txtCol.split(", ")[1];
            txtColB = txtCol.split(", ")[2];
            
            colorSlider2.style.color = catData[3];
            colorSlider2.style.border = "2px solid #000";
            
            rInput2.value = txtColR;
            gInput2.value = txtColG;
            bInput2.value = txtColB;
            
            document.getElementById("rVal2").innerHTML = txtColR;
            document.getElementById("gVal2").innerHTML = txtColG;
            document.getElementById("bVal2").innerHTML = txtColB;
        } else {
            colorSlider2.style.color = "rgb(0, 0, 0)";
            rInput2.value = '0';
            gInput2.value = '0';
            bInput2.value = '0';
            
            document.getElementById("rVal2").innerHTML = '0';
            document.getElementById("gVal2").innerHTML = '0';
            document.getElementById("bVal2").innerHTML = '0';
        }
        
        // if the user doesn't pick another colors & icon, they will be saved as they are
        catColorInput.value = catData[1];
        catColorInput2.value = catData[3];
        catIconInput.value = catData[2];
        
        document.getElementById('addCat-buttons').innerHTML = '<span class="edit">Edit</span>' +
            '<span class="cancel">Cancel</span>';
        
        document.getElementsByClassName('edit')[0].onclick = function() {
            var catNameInput = addCatName.value;
            
            if (catNameInput == "") {
                alert("Please input category name :)");
            } else {
                if (catIconInput.value == "") {
                    var catIconEntry = catNameInput.charAt(0);
                } else {
                    var catIconEntry = catIconInput.value;
                }
                
                var catE = new Array();
                catE.push(catNameInput);
                catE.push(catColorInput.value);
                catE.push(catIconEntry);
                catE.push(catColorInput2.value);
                localStorage.setItem('cat-' + triggerIdNum, JSON.stringify(catE));
                
                addCatTitle.innerHTML = '<b>Category Edited</b>';
                addCatTitle.style.border = "";
                addCatInput.style.display = "none";
                
                // blank the input
                addCatName.value = "";
                
                var wrapperContent = '<div class="colorSelect"><center>';
                wrapperContent += 'Category <b>' + catNameInput + '</b> has been edited.';
                wrapperContent += '</center></div>';
                wrapperContent += '<div id="addCat-buttons"><span class="ok">OK</span></div>';
                
                document.getElementsByClassName('addCat-wrapper')[0].innerHTML = wrapperContent;
                
                // When the user clicks on <span> (OK), close the modal
                var oke = document.getElementsByClassName('ok')[0];
                oke.onclick = function() {
                    modal.style.display = "none";
                    manage_cat();
                }
            }
        }
        
        document.getElementsByClassName('cancel')[0].onclick = function() {
            modal.style.display = "none";
        }
    }
    
    if (triggerType == "catEmpty") {
        addCatTitle.innerHTML = "<b>Empty Category</b>";
        addCatTitle.style.borderBottomColor = catData[1]; // is this fine?
        addCatInput.style.display = "none";
        addCatWrapper.innerHTML = '<div class="colorSelect"><center>Are you sure you want to clear the content of category <b>' + catData[0] + '</b>?<br>' +
            'All tasks under the category will be deleted. ' +
            '<b>This action can\'t be undone.</b></center></div>' +
            '<div id="addCat-buttons">' +
                '<span class="confirm">Confirm</span>' +
                '<span class="cancel">Cancel</span>' +
            '</div>';
        
        document.getElementsByClassName('confirm')[0].onclick = function() {
            empty_cat(triggerIdNum);
            var triggerBtn = document.getElementById(triggerId);
            triggerBtn.className = "catEmpty2";
            triggerBtn.removeEventListener('click', showModal);
            
            addCatWrapper.innerHTML = '<div class="colorSelect"><center>Category <b>' + catData[0] + '</b> has been cleared.<br>' +
                'All tasks under the category has been deleted.</div>' +
                '<div id="addCat-buttons">' +
                    '<span class="ok">OK</span>' +
                '</div>';
            
            document.getElementsByClassName('ok')[0].onclick = function() {
                modal.style.display = "none";
            }
        }
        document.getElementsByClassName('cancel')[0].onclick = function() {
            modal.style.display = "none";
        }
    }
    
    if (triggerType == "catDel") {
        addCatTitle.innerHTML = "<b>Delete Category</b>";
        addCatTitle.style.borderBottomColor = catData[1]; // is this fine?
        addCatInput.style.display = "none";
        addCatWrapper.innerHTML = '<div class="colorSelect"><center>Are you sure you want to delete category <b>' + catData[0] + '</b>?<br>' +
            'All tasks under the category will also be deleted. ' +
            '<b>This action can\'t be undone.</b></center></div>' +
            '<div id="addCat-buttons">' +
                '<span class="confirm">Confirm</span>' +
                '<span class="cancel">Cancel</span>' +
            '</div>';
        
        document.getElementsByClassName('confirm')[0].onclick = function() {
            delete_cat(triggerIdNum);
            
            addCatWrapper.innerHTML = '<div class="colorSelect"><center>Category <b>' + catData[0] + '</b> has been deleted.<br>' +
                'All tasks under the category has also been deleted.</div>' +
                '<div id="addCat-buttons">' +
                    '<span class="ok">OK</span>' +
                '</div>';
            
            document.getElementsByClassName('ok')[0].onclick = function() {
                modal.style.display = "none";
                manage_cat();
            }
        }
        document.getElementsByClassName('cancel')[0].onclick = function() {
            modal.style.display = "none";
        }
    }
    
    if (triggerType == "clear_tasks") {
        addCatTitle.innerHTML = "<b>Clear All Tasks</b>";
        addCatInput.style.display = "none";
        addCatWrapper.innerHTML = '<div class="colorSelect"><center>Are you sure you want to delete all tasks?<br><br>' +
            '<span style="display:block; color:#c0504d; font-weight:bold; font-size:1.75em;">WARNING</span>' +
            '<span style="color:#c0504d; font-weight:bold;">This will delete ALL tasks in all categories and uncategorized ones.</span><br><br>' +
            '<b>This action can\'t be undone.</b><br><br>' +
            '<input type="checkbox" id="clearCheck">I understand the risk.</center></div>' +
            '<div id="addCat-buttons">' +
                '<span class="confirm">Confirm</span>' +
                '<span class="cancel">Cancel</span>' +
            '</div>';
        
        var understand = document.getElementById('clearCheck');
        
        document.getElementsByClassName('confirm')[0].onclick = function() {
            if (!understand.checked) {
                alert('Please check the checkbox if you understand the risk.');
            } else {
                clear_tasks();
                addCatWrapper.innerHTML = '<div class="colorSelect"><center>All tasks has been deleted.</div>' +
                    '<div id="addCat-buttons">' +
                        '<span class="ok">OK</span>' +
                    '</div>';
                
                document.getElementsByClassName('ok')[0].onclick = function() {
                    modal.style.display = "none";
                    show();
                }
            }
        }
        document.getElementsByClassName('cancel')[0].onclick = function() {
            modal.style.display = "none";
        }
    }
    
    // Modal Dialog: color chooser effect
    //// Category color
    
    function paletteReset() {
        for (var i=0; i < palette.length; i++) {
            palette[i].style.border = "";
        }
        colorSlider.style.border = "none";
    }
    function palette2Reset() {
        for (var i=0; i < palette2.length; i++) {
            palette2[i].style.border = "1px solid #333";
        }
        colorSlider2.style.border = "none";
    }
    function iconSetReset() {
        for (var i=0; i < iconSet.length; i++) {
            iconSet[i].style.border = "";
            iconSet[i].style.lineHeight = "48px"; // mengembalikan value karena diubah on click
        }
        // customIcon.style.border = "none";
    }
    
    for (var i=0; i < palette.length; i++) {
        palette[i].onclick = function() {
            paletteReset();
            
            // karena ternyata hasil dari this.style.backgroundColor tu rgb(r, g, b), convert dulu ke hex
            var selectedColor = colorToHex(this.style.backgroundColor);
            
            if (catColorInput.value == selectedColor) { // mengeklik warna yang sudah terpilih akan deselect warna tersebut
                // karena udah di-reset, border ga usah diubah lagi
                addCatTitle.style.background = "#fff";
                addCatInput.style.background = "#fff";
                addCatName.style.background = "#ececec";
                catColorInput.value = "default";
                colorSlider2.style.background = themeMain; // perlu reset? Ya.
                addCatTitle.style.borderBottomColor = "#dfdfdf";
                
                for (var c=0; c < iconSet.length; c++) {
                    iconSet[c].style.background = "#fff";
                    iconSet[c].style.color = "#000";
                    addCatTitle.style.color = "#000";
                }
            } else {
                this.style.border = "2px solid #000";
                addCatTitle.style.background = selectedColor;
                addCatInput.style.background = selectedColor;
                addCatName.style.background = "#fff";
                catColorInput.value = selectedColor;
                colorSlider2.style.background = selectedColor; // KALAU INI MEMANG PERLU, lebih intuitif kalo langsung berubah
                
                var definedBorder = defineBorder(selectedColor, -0.25);
                addCatTitle.style.borderBottomColor = definedBorder;
                
                if (catColorInput2.value == "default") {
                    colorSlider.style.color = themeText;
                    addCatTitle.style.color = themeText;
                } else {
                    colorSlider.style.color = catColorInput2.value;
                    addCatTitle.style.color = catColorInput2.value;
                }
                for (var c=0; c < iconSet.length; c++) {
                    iconSet[c].style.background = selectedColor;
                    if (catColorInput2.value == "default") {
                        iconSet[c].style.color = themeText;
                    } else {
                        iconSet[c].style.color = catColorInput2.value;
                    }
                }
            }
        }
    }
    for (var i=0; i < palette2.length; i++) {
        palette2[i].onclick = function() {
            palette2Reset();
            
            // karena ternyata hasil dari this.style.backgroundColor tu rgb(r, g, b), convert dulu ke hex
            var selectedColor = colorToHex(this.style.backgroundColor);
            
            if (catColorInput2.value == selectedColor) { // mengeklik warna yang sudah terpilih akan deselect warna tersebut
                if (catColorInput.value == "default") {
                    addCatTitle.style.color = "#000";
                    colorSlider.style.color = "#000";
                } else {
                    addCatTitle.style.color = themeText;
                    colorSlider.style.color = themeText;
                }
                // colorSlider2.style.color = "#000"; // perlu?
                catColorInput2.value = "default";
                
                if (catColorInput.value == "default") {
                    addCatTitle.style.background = "#fff";
                    addCatHeader.style.background = "#fff";
                }
                for (var c=0; c < iconSet.length; c++) {
                    if (catColorInput.value == "default") {
                        iconSet[c].style.color = "#000";
                        iconSet[c].style.background = "#fff";
                    } else {
                        iconSet[c].style.color = themeText;
                    }
                }
            } else {
                this.style.border = "2px solid #999";
                addCatTitle.style.color = selectedColor;
                colorSlider.style.color = selectedColor;
                // colorSlider2.style.color = selectedColor; // perlu? kayanya ga, ya, soalnya kalau slider udah diubah user, kereset ga bisa langsung pilih itu lagi
                catColorInput2.value = selectedColor;
                
                if (catColorInput.value == "default") {
                    addCatTitle.style.background = themeMain;
                    addCatTitle.style.borderBottomColor = themeDark;
                    addCatHeader.style.background = themeMain;
                }
                for (var c=0; c < iconSet.length; c++) {
                    if (catColorInput.value == "default") {
                        iconSet[c].style.background = themeMain;
                    }
                    iconSet[c].style.color = selectedColor;
                }
            }
        }
    }
    
    colorSlider.addEventListener('input', setColor);
    colorSlider.addEventListener('click', setColor);
    colorSlider2.addEventListener('input', setColor2);
    colorSlider2.addEventListener('click', setColor2);
    
    function setColor() {
        paletteReset();
        
        var rInput = document.getElementById("colorR");
        var gInput = document.getElementById("colorG");
        var bInput = document.getElementById("colorB");
        
        var rValue = rInput.value;
        var gValue = gInput.value;
        var bValue = bInput.value;
        
        var hexColor = "#"+rgbToHex(rValue)+rgbToHex(gValue)+rgbToHex(bValue);
        
        document.getElementById("rVal").innerHTML = rValue;
        document.getElementById("gVal").innerHTML = gValue;
        document.getElementById("bVal").innerHTML = bValue;
        
        colorSlider.style.border = "2px solid #000";
        colorSlider.style.background = hexColor;
        colorSlider2.style.background = hexColor;
        
        addCatTitle.style.background = hexColor;
        addCatInput.style.background = hexColor;
        addCatName.style.background = "#fff";
        catColorInput.value = hexColor;
        
        var definedBorder = defineBorder(hexColor, -0.25);
        addCatTitle.style.borderBottomColor = definedBorder;
        
        if (catColorInput2.value == "default") {
            colorSlider.style.color = themeText;
            addCatTitle.style.color = themeText;
        } else {
            colorSlider.style.color = catColorInput2.value;
            addCatInput.style.color = catColorInput2.value;
        }
        for (var c=0; c < iconSet.length; c++) {
            iconSet[c].style.background = hexColor;
            if (catColorInput2.value == "default") {
                iconSet[c].style.color = themeText;
            } else {
                iconSet[c].style.color = catColorInput2.value;
            }
        }
    }
    
    function setColor2() {
        palette2Reset();
        
        var rInput = document.getElementById("colorR2");
        var gInput = document.getElementById("colorG2");
        var bInput = document.getElementById("colorB2");
        
        var rValue = rInput.value;
        var gValue = gInput.value;
        var bValue = bInput.value;
        
        var hexColor = "#"+rgbToHex(rValue)+rgbToHex(gValue)+rgbToHex(bValue);
        
        document.getElementById("rVal2").innerHTML = rValue;
        document.getElementById("gVal2").innerHTML = gValue;
        document.getElementById("bVal2").innerHTML = bValue;
        
        colorSlider2.style.border = "2px solid #000";
        colorSlider.style.color = hexColor;
        colorSlider2.style.color = hexColor;
        
        addCatTitle.style.color = hexColor;
        catColorInput2.value = hexColor;
        
        if (catColorInput.value == "default") {
            addCatTitle.style.background = themeMain;
            addCatTitle.style.borderBottomColor = themeDark;
            addCatHeader.style.background = themeMain;
        }
        for (var c=0; c < iconSet.length; c++) {
            if (catColorInput.value == "default") {
                iconSet[c].style.background = themeMain;
            }
            iconSet[c].style.color = hexColor;
        }
    }
    
    for (var i=0; i < iconSet.length; i++) {
        if(triggerType == "catEdit" && catColorInput2.value == "default") iconSet[i].style.color = themeText;
        
        iconSet[i].onclick = function() {
            iconSetReset();
            
            if (catIconInput.value == this.id) { // mengeklik icon yang sudah terpilih akan deselect icon tersebut
                catIconInput.value = "default";
            } else {
                this.style.border = "2px solid #000";
                this.style.lineHeight = "44px"; // diubah karena icon akan bergeser kalau ditambahin border
                catIconInput.value = this.id;
            }
        }
    }
    
    // When the user clicks on <span> (Add), process!
    add.onclick = function() {
        var catNameInput = addCatName.value;
        
        if (catNameInput == "") {
            alert("Please input category name :)");
        } else {
            if (catIconInput.value == "default") {
                var catIconEntry = "default";
            } else {
                var catIconEntry = catIconInput.value;
            }
            
            var catCount = get_catsId() + 1;
            
            var cat = new Array();
            cat.push(catNameInput);
            cat.push(catColorInput.value);
            cat.push(catIconEntry);
            cat.push(catColorInput2.value);
            localStorage.setItem('cat-' + catCount, JSON.stringify(cat));
            
            // record last used ID
            localStorage.setItem('catCounter', JSON.stringify(catCount));
            
            // add the new category ID to categories list
            var cats = get_cats();
            cats.push(catCount);
            localStorage.setItem('catList', JSON.stringify(cats));
            
            addCatTitle.innerHTML = '<b>Category Added</b>';
            addCatTitle.style.border = "";
            addCatInput.style.display = "none";
            
            // blank the input
            addCatName.value = "";
            
            var wrapperContent = '<div class="colorSelect"><center>';
            wrapperContent += 'Category <b>' + catNameInput + '</b> hes been added.';
            wrapperContent += '</center></div>';
            wrapperContent += '<div id="addCat-buttons"><span class="ok">OK</span></div>';
            
            document.getElementsByClassName('addCat-wrapper')[0].innerHTML = wrapperContent;
            
            // When the user clicks on <span> (OK), close the modal
            var oke = document.getElementsByClassName('ok')[0];
            oke.onclick = function() {
                modal.style.display = "none";
                show();
            }
        }
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks on <span> (Cancel), close the modal
    cancel.onclick = function() {
        modal.style.display = "none";
    }
    
    modal.style.display = "block";
}

// Side Menu
var menuWrap = document.getElementById('sideWrap');
var sideMenu = document.getElementById('sideMenu');
var sideButton = document.getElementsByClassName('sideButton')[0];
var menuLists = document.getElementsByClassName('menuList');

document.getElementById('style_set').addEventListener('click', style_set);
document.getElementById('manage_cat').addEventListener('click', manage_cat);
document.getElementById('clear_tasks').addEventListener('click', showModal);
document.getElementById('help').addEventListener('click', show_help);
document.getElementById('about').addEventListener('click', show_about);

function openMenu() {
    menuWrap.style.left = 0;
    sideMenu.style.left = 0;
}
function closeMenu() {
    sideMenu.style.left = "-356px";
    menuWrap.style.left = "-100%";
}

// close menu
sideButton.addEventListener('click', closeMenu);

// Ini sebelumnya dipisah, untuk modal ditaruh di dalam fungsi showModal(), tapi ternyata kalo dipisah gitu, salah satu (yang dibaca duluan) ga jalan setelah kode yang dibaca belakangan dieksekusi
window.onclick = function(event) {
    // When the user clicks anywhere outside of the menu, close it
    if (event.target == menuWrap) {
        closeMenu();
    }
    // When the user clicks anywhere outside of the modal, close it
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// close menu when user clicks on menu lists
for (var i=0; i<menuLists.length; i++) {
    menuLists[i].addEventListener('click', closeMenu);
}

// DRAG AND DROP SYSTEM! \m/
function listUpdate(v) {
    var listType = v.split("-")[0];
    var listCatId = v.split("-")[1];
    var listItemId = v.split("-")[2];
    
    if (listType == "manage_cat") {
        // get the list order
        var catLi = document.getElementsByClassName('catMng');
        
        var catOrder = new Array;
        for (var i=0; i<catLi.length; i++) {
            var catLiId = catLi[i].id.split("-")[1];
            catOrder.push(catLiId);
        }
        // save the list order to localStorage
        localStorage.setItem('catList', JSON.stringify(catOrder));
    }
    // waw, perlu memisahkan antara todo dan done, nih
    if (listType == "todoList") {
        // get the list order
        var todoLi = document.getElementsByClassName('unchecked-' + listCatId);
        
        var liOrder = new Array;
        for (var i=0; i<todoLi.length; i++) {
            var todoLiId = todoLi[i].id.split("-")[1];
            liOrder.push(todoLiId);
        }
        // save the list order to localStorage
        localStorage.setItem('todoOrder-' + listCatId, JSON.stringify(liOrder));
    }
    if (listType == "doneList") {
        // get the list order
        var doneLi = document.getElementsByClassName('checked-' + listCatId);
        
        var liOrder = new Array;
        for (var i=0; i<doneLi.length; i++) {
            var doneLiId = doneLi[i].id.split("-")[1];
            liOrder.push(doneLiId);
        }
        // save the list order to localStorage
        localStorage.setItem('doneOrder-' + listCatId, JSON.stringify(liOrder));
    }
}

// Using headroom.min.js for auto-hiding header
var header = document.getElementById('head');
var headroom = new Headroom(header, {
    "offset": 60,
    "tolerance": 5
});
headroom.init();