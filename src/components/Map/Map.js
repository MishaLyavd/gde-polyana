import React from "react";
import { Route, Link, BrowserRouter as Router , Switch } from 'react-router-dom';
import styles from "./Map.css";
import noImg from '../ListItems/images/no-img.png';

class MyMap extends React.Component {
	constructor(props) {
		super(props);
		this.changeAddress = this.props.address;
        this.mapMode = this.props.mapMode;
        this.center = this.props.center === undefined ? [55.0297, 82.9200] : this.props.center;
		this.load = false;
		this.myCollection = null;
		this.state = {
			load: false,
			pointers: this.props.pointers
		}
  	}

  	render() {
		if (this.state.load && this.mapMode === 'pointers' && this.state.pointers) {
			this.addPointers();
		}
    	return (
      		<div className={styles.block} id='map' />
    	);
  	}

  	componentWillReceiveProps(nextProps) {
    	if (this.state.pointers !== nextProps.pointers) {
        	this.setState({
          		pointers: nextProps.pointers
			});
    	}
	}

	componentDidMount = () => {
    	this.addScript();
  	}

	createCollection() {
    	if (!this.myCollection) {
      		this.myCollection = new ymaps.GeoObjectCollection(null, {
        		preset: 'islands#darkOrangeIcon',
      		});
    	}
  	}

  	addPointers() {
		const { pointers } = this.state;
		this.createCollection();
        this.myCollection.removeAll();
        for (let pointer of pointers) {
            let myPlacemark = new ymaps.Placemark([pointer.coordinates[0], pointer.coordinates[1]], {
                balloonContentBody: [
                	`<div style="display: flex; align-items: flex-start">`,
                		`<img src=${pointer.avatar || noImg} alt="avatar"
                    		style="user-select: none; margin-right: 15px; width: 125px" />`,
                    	`<div style="display: flex; flex-direction: column; align-items: stretch;
                      		justify-content: flex-start; align-self: stretch; flex-grow: 1">`,
                      		`<div style="font-weight: bold; padding: 3px 0; font-family: 'Roboto-Regular'">${pointer.name}</div>`,
                      		`<div style="padding: 3px 0; font-family: 'Roboto-Regular'">${pointer.types.join(", ")}</div>`,
                      		`<div style="padding: 3px 0; font-family: 'Roboto-Regular'">Кухня: ${pointer.cuisines.join(", ")}</div>`,
                      		`<div style="padding: 3px 0; font-family: 'Roboto-Regular'">Телефон: ${pointer.phone}</div>`,
							`<div style="padding: 3px 0; font-family: 'Roboto-Regular'">Адрес: ${pointer.address}</div>`,
							`<a href='/nsk/places/${pointer.id}' style="padding: 3px 0; font-family: 'Roboto-Regular'; margin-left: auto; color: #F76226">Подробнее...</a>`, 
                    	`</div>`,
                  	`</div>`,
                ].join('')
            });
            this.myCollection.add(myPlacemark);
        }
        this.myMap.geoObjects.add(this.myCollection);
  	}

  handleLoad = () => {
    window.ymaps.ready(() => {
        var myPlacemark;
        this.myMap = new ymaps.Map('map', {
            center: this.center,
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
		});
		this.setState({
			load: true
		});
      
        if (this.mapMode === 'reverseGeo') {
        	this.myMap.events.add('click', (e) => {
            var coords = e.get('coords');
    
            // Если метка уже создана – просто передвигаем ее.
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
                myPlacemark = createPlacemark(coords);
                this.myMap.geoObjects.add(myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                myPlacemark.events.add('dragend', function () {
                    getAddress(myPlacemark.geometry.getCoordinates());
                });
            }
            getAddress(coords);
          });
        }
  
      // Создание метки.
      function createPlacemark(coords) {
          return new ymaps.Placemark(coords, {
              iconCaption: 'поиск...'
          }, {
              preset: 'islands#darkOrangeIcon',
              draggable: true
          });
      }
  
      // Определяем адрес по координатам (обратное геокодирование).
      const getAddress = (coords) => {
          myPlacemark.properties.set('iconCaption', 'поиск...');
          let address = null;
          ymaps.geocode(coords).then(function (res) {
              var firstGeoObject = res.geoObjects.get(0);
  
              myPlacemark.properties
                  .set({
                      // Формируем строку с данными об объекте.
                      iconCaption: [
                          // Название населенного пункта или вышестоящее административно-территориальное образование.
                          firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                          // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                      ].filter(Boolean).join(', '),
                      // В качестве контента балуна задаем строку с адресом объекта.
                      balloonContent: firstGeoObject.getAddressLine(),
                  });
              let fullAddress = firstGeoObject.getAddressLine().split(', ');
              address = fullAddress.slice(2).join(', ');
          }).then(() => {
            this.changeAddress([address, coords]);
          })
      }
    });
  }

  addScript() {
      const script = document.createElement('script');
      script.src = "https://api-maps.yandex.ru/2.1/?apikey=7bc4279b-3241-4492-8259-6d1acef5872e&lang=ru_RU";
      script.type = "text/javascript";
      document.querySelector('head').appendChild(script);
      script.onload = () => {
        this.load = true;
        if (this.handleLoad) {
            this.handleLoad();
        }
      }
  }
}

export default MyMap;