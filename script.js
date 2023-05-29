//讀取xml文件
fetch('rate.xml')
	.then(response => response.text())
	.then(data => {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(data, 'text/xml');

		//提出匯率數據
		const currencies = xmlDoc.getElementsByTagName('Currency');
		const rates = {};
		for (let i = 0; i < currencies.length; i++) {
			const currency = currencies[i];
			const spot = currency.getAttribute('Spot');
			const rate = parseFloat(currency.getAttribute('Rate'));
			rates[spot] = rate;
		}

		//處理表單
		const form = document.getElementById('converter');
		form.addEventListener('submit', function(event) {
			event.preventDefault();
			const amountInput = document.getElementById('amount');
			const amount = parseFloat(amountInput.value);
			if (isNaN(amount)) {
				alert('輸入的數值無效！請重新輸入');
				resetForm();
				return;
			}
			const result = document.getElementById('result');
			result.innerHTML = '';

			const currencies = ['USD', 'EUR', 'JPY', 'KRW', 'AUD'];
			currencies.forEach(currency => {
				const convertedAmount = (amount / rates['TWD'] * rates[currency]).toFixed(2);
				const resultText = `${convertedAmount} ${currency}`;
				const resultElement = document.createElement('p');
				resultElement.textContent = resultText;
				result.appendChild(resultElement);
			});
			resetForm();
		});
		//重新開始按鈕
		const resetButton = document.getElementById('resetButton');
		resetButton.addEventListener('click', resetForm);

		//重製表單
		function resetForm() {
		form.reset();
		const result = document.getElementById('result');
		result.innerHTML = '';
		}
	});
