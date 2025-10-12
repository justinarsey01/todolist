 // Load tasks on page load
        document.addEventListener('DOMContentLoaded', loadTasks);

        function addTask() {
            const taskInput = document.getElementById('taskInput').value.trim();
            const taskDate = document.getElementById('taskDate').value;
            const startTime = document.getElementById('startTime').value;
            const endTime = document.getElementById('endTime').value;
            const error = document.getElementById('error');

            // Validate inputs
            if (!taskInput || !taskDate || !startTime || !endTime) {
                error.style.display = 'block';
                setTimeout(() => error.style.display = 'none', 3000);
                return;
            }
            if (startTime >= endTime) {
                error.textContent = 'End time must be after start time!';
                error.style.display = 'block';
                setTimeout(() => {
                    error.style.display = 'none';
                    error.textContent = 'Please fill all fields!';
                }, 3000);
                return;
            }

            const task = {
                id: Date.now(),
                text: taskInput,
                date: taskDate,
                startTime: startTime,
                endTime: endTime,
                completed: false
            };

            saveTask(task);
            renderTask(task);

            // Clear inputs
            document.getElementById('taskInput').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('startTime').value = '';
            document.getElementById('endTime').value = '';
        }

        function renderTask(task) {
            const taskList = document.getElementById('taskList');
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');
            li.dataset.id = task.id;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.onclick = () => toggleComplete(task.id);

            const taskText = document.createElement('span');
            taskText.textContent = `${task.text} (${formatDate(task.date)}, ${formatTime(task.startTime)} - ${formatTime(task.endTime)})`;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTask(task.id);

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        }

        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }

        function formatTime(time) {
            const [hours, minutes] = time.split(':');
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            return `${formattedHours}:${minutes} ${period}`;
        }

        function saveTask(task) {
            let tasks = getTasks();
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function getTasks() {
            return JSON.parse(localStorage.getItem('tasks') || '[]');
        }

        function loadTasks() {
            const tasks = getTasks();
            tasks.forEach(renderTask);
        }

        function toggleComplete(id) {
            let tasks = getTasks();
            tasks = tasks.map(task => {
                if (task.id === id) {
                    task.completed = !task.completed;
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            refreshTaskList();
        }

        function deleteTask(id) {
            let tasks = getTasks();
            tasks = tasks.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            refreshTaskList();
        }

        function refreshTaskList() {
            document.getElementById('taskList').innerHTML = '';
            loadTasks();
        }
        var greet = new Date().getHours();
var mygreet = "";
if (greet <= 11) {
    mygreet = " Hi! Good Morning ";
} else if (greet <= 15) {
    mygreet = "Hi! Good afternoon ";
} else if (greet <= 20) {
    mygreet = "Hi! Good Evening";
} else {
    mygreet = " Hi! Good Evening";
}
        document.getElementById("mygreet").innerHTML=mygreet;