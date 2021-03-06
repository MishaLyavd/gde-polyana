const data = {
    title: 'Редактирование заведения',
    method: 'patch',
    url: '/api/v1/places/',
    pathname: 'id',
    bodyType: 'form',
    message: 'Изменения сохранены',
    loadForPlace: true,
    workingTime: true,
    getId: true,
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
            required: false
        },
        description: {
            size: [0, 512],
            required: false
        },
        address: {
            size: [1],
            required: false
        },
        coordinates: {
            size: [1],
            required: false
        },
        phone: {
            pattern: /^[0-9()‒\-\+\s]*$/i,
            size: [7, 18],
            required: false
        },
        types: {
            size: [1],
            required: false
        },
        cuisines: {
            size: [0],
            required: false
        },
        avgCheck: {
            size: [1],
            required: false
        }
    }
}

export default data;