const data = {
    title: 'Регистрация заведения',
    method: 'post',
    url: '/api/v1/places',
    bodyType: 'form',
    message: 'Заведение зарегистрировано',
    loadForPlace: true,
    workingTime: true,
    redirect: '/lk',
    inputs: [
        {
            name: 'id',
            label: 'Адрес страницы',
            type: 'text'
        },
        {
            name: 'name',
            label: 'Название',
            type: 'text'
        },
        {
            name: 'phone',
            label: 'Телефон',
            type: 'text'
        },
        {
            name1: 'WorkOpenHourTime',
            name2: 'WorkOpenMinuteTime',
            label: 'Время открытия по будням',
            type: 'workingTime'
        },
        {
            name1: 'WorkCloseHourTime',
            name2: 'WorkCloseMinuteTime',
            label: 'Время закрытия по будням',
            type: 'workingTime'
        },
        {
            name1: 'WeekOpenHourTime',
            name2: 'WeekOpenMinuteTime',
            label: 'Время открытия по выходным',
            type: 'workingTime'
        },
        {
            name1: 'WeekCloseHourTime',
            name2: 'WeekCloseMinuteTime',
            label: 'Время закрытия по выходным',
            type: 'workingTime'
        },
        {
            name: 'avgCheck',
            label: 'Средний чек',
            type: 'radio',
            text: ['500 — 1 500 руб.', '1 500 — 2 500 руб.', '2 500 руб.'],
            values: ['OneDollar', 'TwoDollars', 'ThreeDollars'],
            buttons: ['$', '$$', '$$$']
        },
        {
            name: 'types',
            label: 'Тип заведения',
            type: 'checkbox'
        },
        {
            name: 'cuisines',
            label: 'Тип кухни',
            type: 'checkbox'
        },
        {
            name: 'description',
            label: 'Описание',
            type: 'textarea'
        },
        {
            name: 'address',
            label: 'Адрес',
            type: 'map'
        },
        {
            name: 'coordinates',
            type: 'internal'
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
        },
        description: {
            size: [0, 512],
            required: false
        },
        address: {
            required: true
        },
        coordinates: {
            required: true
        },
        phone: {
            pattern: /^[0-9()‒\-\+\s]*$/i,
            size: [7, 18],
            required: true
        },
        types: {
            required: true
        },
        cuisines: {
            required: false
        },
        avgCheck: {
            required: true
        }
    }
}

export default data;