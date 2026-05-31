const STORAGE_KEY = 'tasks_v1'

// Elements
const openFormBtn = document.getElementById('openFormBtn')
const taskModal = document.getElementById('taskModal')
const closeFormBtn = document.getElementById('closeFormBtn')
const cancelBtn = document.getElementById('cancelBtn')
const taskForm = document.getElementById('taskForm')
const taskListEl = document.getElementById('taskList')
const messageEl = document.getElementById('message')
const modalTitle = document.getElementById('modalTitle')

const totalCount = document.getElementById('totalCount')
const doneCount = document.getElementById('doneCount')
const todoCount = document.getElementById('todoCount')

// form fields
const taskIdInput = document.getElementById('taskId')
const titleInput = document.getElementById('title')
const descInput = document.getElementById('description')
const dueInput = document.getElementById('dueDate')
const priorityInput = document.getElementById('priority')
const completedInput = document.getElementById('completed')

let tasks = []

function loadTasks(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    tasks = raw ? JSON.parse(raw) : []
  }catch(e){ tasks = [] }
}

function saveTasks(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

// Validation helpers
function clearFieldErrors(){
  document.querySelectorAll('.field-error').forEach(el=>el.remove())
}

function showFieldError(inputEl, msg){
  const err = document.createElement('div')
  err.className = 'field-error'
  err.textContent = msg
  // Place error after the input's parent (label) so it displays cleanly
  const parent = inputEl.parentNode || inputEl
  if(parent.nextSibling) parent.parentNode.insertBefore(err, parent.nextSibling)
  else parent.parentNode.appendChild(err)
}

function validateTaskForm(){
  clearFieldErrors()
  const errors = []
  const title = titleInput.value.trim()
  const due = dueInput.value
  const priority = priorityInput.value

  if(!title) errors.push({el: titleInput, msg: 'Tiêu đề là bắt buộc'})

  if(due){
    const d = Date.parse(due)
    if(Number.isNaN(d)) errors.push({el: dueInput, msg: 'Ngày không hợp lệ'})
    else{
      // don't allow due date before today
      const today = new Date()
      today.setHours(0,0,0,0)
      if(d < today.getTime()) errors.push({el: dueInput, msg: 'Ngày phải bằng hoặc sau hôm nay'})
    }
  }

  if(!['low','medium','high'].includes(priority)) errors.push({el: priorityInput, msg: 'Mức ưu tiên không hợp lệ'})

  errors.forEach(e=> showFieldError(e.el, e.msg))
  return errors.length === 0
}

function showMessage(text, warn=false){
  messageEl.textContent = text
  messageEl.classList.remove('hidden')
  messageEl.classList.toggle('confirm', warn)
  setTimeout(()=> messageEl.classList.add('hidden'), 2000)
}

function openModal(edit=false){
  taskModal.classList.remove('hidden')
  modalTitle.textContent = edit ? 'Sửa công việc' : 'Thêm công việc'
}

function closeModal(){
  taskModal.classList.add('hidden')
  taskForm.reset()
  taskIdInput.value = ''
}

function renderTasks(){
  taskListEl.innerHTML = ''
  if(!tasks.length){
    taskListEl.innerHTML = '<div class="muted">Chưa có công việc nào. Nhấn "Thêm công việc" để bắt đầu.</div>'
    updateTaskSummary()
    return
  }

  tasks.forEach(t => {
    const card = document.createElement('div')
    card.className = 'task-card' + (t.completed ? ' task-completed' : '')

    const main = document.createElement('div'); main.className = 'task-main'
    const title = document.createElement('p'); title.className = 'task-title'; title.textContent = t.title
    const meta = document.createElement('div'); meta.className = 'task-meta'
    const due = t.dueDate ? `Hạn: ${t.dueDate}` : 'Không có hạn'
    meta.textContent = `${due} • Ưu tiên: ${t.priority}`
    const desc = document.createElement('div'); desc.className = 'muted'; desc.textContent = t.description || ''
    main.appendChild(title); main.appendChild(meta); if(t.description) main.appendChild(desc)

    const actions = document.createElement('div'); actions.className = 'task-actions'

    const checkbox = document.createElement('input'); checkbox.type='checkbox'; checkbox.checked = !!t.completed
    checkbox.title = 'Đánh dấu hoàn thành'
    checkbox.addEventListener('change', ()=>{
      t.completed = checkbox.checked
      saveTasks(); renderTasks(); showMessage('Cập nhật trạng thái')
    })

    const editBtn = document.createElement('button'); editBtn.className='btn'; editBtn.textContent='Sửa'
    editBtn.addEventListener('click', ()=> startEditTask(t.id))

    const delBtn = document.createElement('button'); delBtn.className='btn'; delBtn.textContent='Xóa'
    delBtn.addEventListener('click', ()=> deleteTask(t.id))

    actions.appendChild(checkbox); actions.appendChild(editBtn); actions.appendChild(delBtn)

    card.appendChild(main); card.appendChild(actions)
    taskListEl.appendChild(card)
  })

  updateTaskSummary()
}

function updateTaskSummary(){
  const total = tasks.length
  const done = tasks.filter(t=>t.completed).length
  totalCount.textContent = total
  doneCount.textContent = done
  todoCount.textContent = total - done
}

function startEditTask(id){
  const t = tasks.find(x=>x.id===id)
  if(!t) return
  taskIdInput.value = t.id
  titleInput.value = t.title
  descInput.value = t.description || ''
  dueInput.value = t.dueDate || ''
  priorityInput.value = t.priority || 'medium'
  completedInput.checked = !!t.completed
  openModal(true)
}

function deleteTask(id){
  if(!confirm('Bạn có chắc muốn xóa công việc này?')) return
  tasks = tasks.filter(t=>t.id!==id)
  saveTasks(); renderTasks(); showMessage('Đã xóa', true)
}

taskForm.addEventListener('submit', e=>{
  e.preventDefault()
  const id = taskIdInput.value
  // validate
  if(!validateTaskForm()){
    showMessage('Vui lòng sửa lỗi trong form')
    return
  }
  const data = {
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    dueDate: dueInput.value || null,
    priority: priorityInput.value,
    completed: completedInput.checked
  }

  if(id){
    const idx = tasks.findIndex(t=>t.id===id)
    if(idx>-1){ tasks[idx] = {...tasks[idx], ...data }
    }
    showMessage('Cập nhật công việc')
  }else{
    const newTask = { id: String(Date.now()), ...data }
    tasks.unshift(newTask)
    showMessage('Thêm công việc')
  }

  saveTasks(); renderTasks(); closeModal()
})

openFormBtn.addEventListener('click', ()=>{ taskForm.reset(); taskIdInput.value=''; openModal(false) })
closeFormBtn.addEventListener('click', closeModal)
cancelBtn.addEventListener('click', closeModal)
taskModal.addEventListener('click', e=>{ if(e.target===taskModal) closeModal() })

// initialize
loadTasks(); renderTasks()
