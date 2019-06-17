const data = {
    title: 'Загрузка аватара',
    method: 'post',
    url: '/api/v1/upload',
    bodyType: 'formData',
    message: 'Аватар сохранен',
    loadForPlace: false,
    redirect: '/lk',
    getId: true,
    inputs: [
        {
            name: 'id',
            label: 'id',
            type: 'text'
        },
        {
            name: 'avatar',
            label: 'Изображение',
            type: 'file'
        }
    ],
    validations: {
        id: {
            pattern: /^[a-z_\-]*$/i,
            size: [3, 32],
            required: true
        },
        avatar: {
            required: true
        }
    }
}

export default data;