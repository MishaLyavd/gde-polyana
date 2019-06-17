const data = {
    title: 'Изменение роли пользователя',
    method: 'patch',
    url: '/api/v1/roles/',
    pathname: 'userName',
    bodyType: 'form',
    redirect: '/lk',
    message: 'Роль изменена',
    inputs: [
        {
            name: 'userName',
            label: 'Логин',
            type: 'text'
        },
        {
            name: 'userRole',
            label: 'Роль',
            type: 'text'
        }
    ],
    validations: {
        userName: {
            pattern: /^[а-яёa-z0-9,.!?:;"'№&()_‒\-\s]*$/i,
            size: [4, 20],
            required: true
        },
        userRole: {
            pattern: /^[а-яёa-z0-9,.!?:;"'№&()_‒\-\s]*$/i,
            size: [3, 32],
            required: true
        }
    }
}

export default data;