const data = {
    title: 'Удаление заведения',
    method: 'delete',
    url: '/api/v1/places/',
    pathname: 'id',
    bodyType: 'form',
    message: 'Заведение удалено',
    loadForPlace: false,
    redirect: '/lk',
    inputs: [
        {
            name: 'id',
            label: 'id',
            type: 'text'
        }
    ],
    validations: {
        id: {
            pattern: /^[a-z_\-]*$/i,
            size: [3, 32],
            required: true
        }
    }
}

export default data;