const data = {
    title: 'Редактирование пользователя',
    method: 'patch',
    url: '/api/v1/users/',
    pathname: 'userName',
    bodyType: 'form',
    message: 'Изменения сохранены',
    loadForPlace: false,
    getId: true,
    redirect: '/lk',
    boolean: 'isManagerRoleRequested',
    inputs: [
        {
            name: 'userName',
            label: 'Логин',
            type: 'text',
        },
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
        },
        {
            name: 'isManagerRoleRequested',
            label: 'Заявка на менеджера',
            type: 'radio',
            text: ['Да', 'Нет'],
            values: ['true', 'false'],
        },
    ],
    validations: {
        userName: {
            pattern: /^[а-яёa-z0-9,.!?:;"'№&()_‒\-\s]*$/i,
            size: [4, 20],
            required: true
        },
        oldPassword: {
            pattern: /^[a-z0-9_‒\-]*$/i,
            size: [4, 24],
            required: false
        },
        password: {
            pattern: /^[a-z0-9_‒\-]*$/i,
            size: [4, 24],
            required: false
        },
        confirmPassword: {
            pattern: /^[a-z0-9_‒\-]*$/i,
            size: [4, 24],
            required: false
        },
        isManagerRoleRequested: {
            size: [1],
            required: false
        }
    }
}

export default data;