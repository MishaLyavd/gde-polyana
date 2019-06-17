const data = {
    title: 'Вход',
    method: 'post',
    url: '/api/v1/login',
    bodyType: 'form',
    message: 'Вход выполнен',
    loadForPlace: false,
    redirect: '/',
    changeUser: true,
    inputs: [
        {
            name: 'userName',
            label: 'Логин',
            type: 'text'
        },
        {
            name: 'password',
            label: 'Пароль',
            type: 'password'
        },
        {
            name: 'rememberMe',
            label: 'Запомнить?',
            type: 'checkbox',
            one: true
        }
    ],
    validations: {
        userName: {
            pattern: /^[а-яёa-z0-9,.!?:;"'№&()_‒\-\s]*$/i,
            size: [4, 20],
            required: true
        },
        password: {
            pattern: /^[a-z0-9_‒\-]*$/i,
            size: [4, 24],
            required: true
        },
        rememberMe: {
            required: false
        }
    }
}

export default data;