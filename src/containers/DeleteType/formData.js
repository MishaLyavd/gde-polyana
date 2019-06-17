const data = {
    title: 'Удаление типа заведения',
    method: 'delete',
    url: '/api/v1/place-types/',
    pathname: 'id',
    bodyType: 'form',
    message: 'Тип заведения удален',
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