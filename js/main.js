
function login(){
  const defaultUser = 'admin'
  const defaultPassword = 'admin123'
  const formLogin = document.querySelector('#form-login')
  const loading = document.querySelector('.loading')
  const login = document.querySelector('.login')
  const panel = document.querySelector('.panel')

  formLogin.addEventListener('submit', function(e){
    e.preventDefault()
    const user = document.forms['form-login']['user'].value
    const password = document.forms['form-login']['password'].value
    const verifyLogin = user === defaultUser && password === defaultPassword ? true : false

    if(!verifyLogin){
      formLogin.reset()
      return alert("Usuário ou senha incorretos, tente novamente!")
    }
    
    loading.classList.remove('hidden')
    login.classList.add('hidden')

    setTimeout(function(){
      panel.classList.remove('hidden')
      loading.classList.add('hidden')
    },600)
  })
}

function panel(){
  const buttons = document.querySelectorAll('.panel a')
  const registerCustomer = document.querySelector('.register-customer')
  const listCustomers = document.querySelector('.list-customers')
  const panel = document.querySelector('.panel')

  buttons.forEach((button) => {
    button.addEventListener("click", function(e){
      e.preventDefault()
      const option = button.dataset.option
      
      switch(option){
        case 'register-customer':
          registerCustomer.classList.remove('hidden')
          panel.classList.add('hidden')
          break
        case 'list-customer':
          listCustomers.classList.remove('hidden')
          panel.classList.add('hidden')
          break
      }
    })
  })
}

function listCustomers(){
  const list = document.querySelector('.customers')
  let htmlCustomer = ''
  fetch('http://localhost:5000/api/customers').then(response => {
    response.json().then(data => {
      data.forEach((customer) => {
        htmlCustomer += `
          <li>
            ${customer.name} - ${customer.age} anos - ${customer.email}
            <a href = "#" class = "button-delete">[excluir]</a>
          </li>
        `
      })

      list.innerHTML = htmlCustomer
    })
  })
}

login()
panel()
listCustomers()