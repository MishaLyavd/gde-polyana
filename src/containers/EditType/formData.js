const data = {
    title: 'Редактирование типа заведения',
    method: 'patch',
    url: '/api/v1/place-types/',
    pathname: 'id',
    bodyType: 'form',
    message: 'Изменения сохранены',
    redirect: '/lk',
    inputs: [
        {
            name: 'id',
            label: 'id',
            type: 'text'
        },
        {
            name: 'name',
            label: 'Название',
            type: 'text'
        }
    ],
    validations: {
        id: {
            pattern: /^[a-z_\-]*$/i,
            size: [3, 32],
            required: true
        },
        name: {
            pattern: /^[а-яёa-z0-9,.!?:;"'№&()_‒\-\s]*$/i,
            size: [3, 32],
            required: true
        }
    }
}

export default data;