const data = {
    title: 'Удаление кухни',
    method: 'delete',
    url: '/api/v1/place-cuisines/',
    pathname: 'id',
    bodyType: 'form',
    message: 'Кухня удалена',
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