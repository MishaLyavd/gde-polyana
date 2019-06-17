const data = {
    title: 'Удаление пользователя',
    method: 'delete',
    url: '/api/v1/users/',
    pathname: 'userName',
    bodyType: 'form',
    message: 'Пользователь удален',
    redirect: '/lk',
    inputs: [
        {
            name: 'userName',
            label: 'Логин',
            type: 'text'
        }
    ],
    validations: {
        userName: {
            pattern: /^[а-яёa-z0-9,.!?:;"'№&()_‒\-\s]*$/i,
            size: [4, 20],
            required: true
        }
    }
}

export default data;