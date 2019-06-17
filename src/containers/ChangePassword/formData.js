const data = {
    title: 'Изменение пароля',
    method: 'patch',
    url: '/api/v1/users/',
    pathname: 'userName',
    bodyType: 'form',
    message: 'Изменения сохранены',
    loadForPlace: false,
    captcha: true,
    redirect: '/lk',
    inputs: [
        {
            name: 'oldPassword',
            label: 'Старый пароль',
            type: 'password'
        },
        {
            name: 'password',
            label: 'Новый пароль',
            type: 'password'
        },
        {
            name: 'confirmPassword',
            label: 'Подтвердить пароль',
            type: 'password'
        }
    ],
    validations: {
        oldPassword: {
            pattern: /^[a-z0-9_‒\-]*$/i,
            size: [4, 24],
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