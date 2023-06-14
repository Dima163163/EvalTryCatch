// Создаем переменную фильтр по типу type которой будет присвоен результат работы 
// фильтра с пераданными в него type и массив values через стрелочную функцию
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

// Создаем функцию для скрытия блоков ответа
	hideAllResponseBlocks = () => {
		//Создаем переменную в которой будет новый экземпляр массива
		//имеющего селекторы 'div.dialog__response-block'
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));

		//Проходим по массиву методом forEach и задаем стиль всем его элементам block display: none
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

// Создаем функцию для показа блоков в которую передаем параметры 
// blockSelector-селектор блока, msgText - текст сообщения, spanSelector - span селектор
	showResponseBlock = (blockSelector , msgText, spanSelector) => {
		// вызываем функцию скрытия боков
		hideAllResponseBlocks();
		// всем селекторам с передаваемым параметром blockSelector 
		// делаем style display: block
		document.querySelector(blockSelector).style.display = 'block';
		// если селектор spanSelector === true(т.е. если он есть)
		if (spanSelector) {
			// Текстовое значение textContent селектора spanSelector  присваиваем msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

// showError получит результат выполнения showResponseBlock с параметрами
// c blockSelector = '.dialog__response-block_error'
// spanSelector = '#error'
// и покажет textContent блока '.dialog__response-block_error'
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
// showResults получит результат выполнения showResponseBlock 
// c blockSelector = '.dialog__response-block_ok'
// spanSelector = '#ok'
// и покажет textContent блока '.dialog__response-block_ok'
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
// showNoResults получит результат выполнения showResponseBlock 
// и просто сделает для блока '.dialog__response-block_no-results'
// display: block без сообщений
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),


//создадим фильтр по типу кудв будем передавать тип и значения
	tryFilterByType = (type, values) => {
		//конструкция try попытается выполнить код внутри него
		try {
			//переменная valuesArray выполнит код представленный строкой выведет тип и 
			//значения разделив их запятой
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//переменная alertMsg выведет сообщение 'данные с типом' если значания есть
			//иначе выведет 'Отсутствуют данные типа'
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
				//передаем значение переменной alertMsg  в качестве параметра msgText 
				// в функцию showResults
			showResults(alertMsg);
			//в случае ошибки в try выполнится catch
		} catch (e) {
			// в функцию showError в качестве msgText с параметрами ошибки e
			showError(`Ошибка: ${e}`);
		}
	};
//Получаем селектор кнопки
const filterButton = document.querySelector('#filter-btn');
//вешаем на него событие по клику
filterButton.addEventListener('click', e => {
	//получаем селекторы select c id #type и input с id #data
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	//Если значение value из dataInput равно путой строке
	if (dataInput.value === '') {
		//выводим сообщение валидации что поле не должно быть пустым
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//вызываем функцию showNoResults
		showNoResults();
		// Если значение value из dataInput не пустое
	} else {
		//то сообщения валидации небудет
		dataInput.setCustomValidity('');
		//отменяем стандартное поведение у элемента на котором был click
		e.preventDefault();
		//вызываем функцию tryFilterByType и передаем туда value с typeInput и dataInput
		//предварительно убрав пробелы перед и после значений методом trim
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

