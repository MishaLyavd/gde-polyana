const data = {
    title: 'Регистрация',
    method: 'post',
    url: '/api/v1/users',
    bodyType: 'form',
    message: 'Регистрация выполнена',
    loadForPlace: false,
    redirect: '/login',
    captcha: true,
    inputs: [
        {
            name: 'userName',
            label: 'Логин',
            type: 'text'
        },
        {
            name: 'email',
            label: 'Почта',
            type: 'text'
        },
        {
            name: 'phoneNumber',
            label: 'Телефон',
            type: 'text'
        },
        {
            name: 'password',
            label: 'Пароль',
            type: 'password'
        },
        {
            name: 'confirmPassword',
            label: 'Подтвердить пароль',
            type: 'password'
        }
    ],
    validations: {
        userName: {
            pattern: /^[а-яёa-z0-9,.!?:;"'№&()_‒\-\s]*$/i,
            size: [4, 20],
            required: true
        },
        email: {
            pattern: /^[a-z0-9@,.!?:;"'№&()_‒\-\s]*$/i,
            size: [4, 50],
            required: true
        },
        phoneNumber: {
            pattern: /^[0-9()‒\-\+\s]*$/i,
            size: [7, 18],
            required: true
        },
        password: {
            pattern: /^[a-z0-9_‒\-]*$/i,
            size: [4, 24],
            required: true
        },
        confirmPassword: {
            pattern: /^[a-z0-9_‒\-]*$/i,
            size: [4, 24],
            required: true
        }
    }
}

export default data;