const data = {
    title: 'Бронирование столика',
    method: 'post',
    url: '/api/v1/booking',
    bodyType: 'form',
    message: 'Запрос отправлен',
    getPlace: true,
    loadForPlace: true,
    redirect: '/lk',
    inputs: [
        {
            name: 'placeId',
            type: 'internal'
        },
        {
            name: 'orderDate',
            label: 'День',
            type: 'date'
        },
        {
            name: 'orderTime',
            label: 'Время',
            type: 'time'
        },
        {
            name: 'numberOfPersons',
            label: 'Количество человек',
            type: 'number',
            min: 1,
            max: 12,
            step: 1
        }
    ],
    validations: {
        placeId: {
            required: true
        },
        orderDate: {
            required: true
        },
        orderTime: {
            required: true
        },
        numberOfPersons: {
            required: true
        }
    }
}

export default data;