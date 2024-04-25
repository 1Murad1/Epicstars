import WOW from 'wow.js'
import { homePageText } from './lang.js'

// Проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebP() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image()
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2)
		}
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp'
		document.documentElement.classList.add(className)
	})
}

//form value

const inputName = document.querySelector('#nameInput')
const phoneInput = document.querySelector('#phoneInput')

function placeholderValue(input, valueRu, valueEn) {
	if (currentLang === 'ru') {
		input.placeholder = valueRu
	} else {
		input.placeholder = valueEn
	}
}

//preloader

document.body.onload = () => {
	setTimeout(() => {
		let preloader = document.querySelector('.preloader')

		if (!preloader.classList.contains('done')) {
			preloader.classList.add('done')
		}
	}, 1000)
}

// Плавный скрол якоря к блокам
export function scrollAnchor() {
	const anchors = document.querySelectorAll('a[href*="#"]')

	let header = document.querySelector('header')

	let headerOffset = header.offsetHeight
	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()

			const blockID = anchor.getAttribute('href').substr(1)
			let elementPosition = document
				.getElementById(blockID)
				?.getBoundingClientRect().top
			let offsetPosition = elementPosition + window.pageYOffset - headerOffset
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})
		})
	}
}

//Добавление фона для header при скроле страницы
export function addShadowHeader() {
	const header = document.querySelector('#header')
	if (window.pageYOffset > 0) {
		header?.classList.add('shadow')
	}
	window.addEventListener('scroll', function () {
		const scrollPosition = window.pageYOffset
		if (scrollPosition > 0) {
			header?.classList.add('shadow')
		} else {
			header?.classList.remove('shadow')
		}
	})
}

//мультиязычность

const allLang = ['ru', 'en']
let currentLang = localStorage.getItem('language') || checkBrowserLang() || 'ru'
const langButtons = document.querySelectorAll('[data-btn]')
const currentPathName = window.location.pathname
let currentText = {}

function checkPagePathName() {
	switch (currentPathName) {
		case '/':
			currentText = homePageText
			break
		default:
			currentText = homePageText
			break
	}
}

function changeLang() {
	for (const key in currentText) {
		const elem = document.querySelector(`[data-lang=${key}]`)
		if (elem) {
			elem.innerHTML = currentText[key][currentLang]
		}
	}
}

function resetActiveClass(arr, activeClass) {
	arr.forEach(elem => {
		elem.classList.remove(activeClass)
	})
}

function checkActiveLangButton() {
	switch (currentLang) {
		case 'ru':
			document.querySelectorAll('[data-btn="ru"]').forEach(btn => {
				btn.classList.add('language-btn-active')
			})
			break
		case 'en':
			document.querySelectorAll('[data-btn="en"]').forEach(btn => {
				btn.classList.add('language-btn-active')
			})
			break
		default:
			document.querySelectorAll('[data-btn="ru"]').forEach(btn => {
				btn.classList.add('language-btn-active')
			})
			break
	}
}

function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase()
	const result = allLang.some(elem => {
		return elem === navLang
	})
	if (result) {
		return navLang
	}
}

export function configurationLanguage() {
	checkPagePathName()
	changeLang()
	checkActiveLangButton()
	langButtons.forEach(btn => {
		btn.addEventListener('click', e => {
			currentLang = e.currentTarget.dataset.btn
			localStorage.setItem('language', e.currentTarget.dataset.btn)
			resetActiveClass(langButtons, 'language-btn-active')
			btn.classList.add('language-btn-active')
			changeLang()
			placeholderValue(inputName, 'Ваше имя', 'Your name')
			placeholderValue(phoneInput, 'Номер телефона', 'Phone number')
		})
	})
}

//скролл наверх

export function scrollTop() {
	const buttonScrollTop = document.querySelector('.link-arrow-top')
	window.addEventListener('scroll', e => {
		const scrollY = window.scrollY || document.documentElement.scrollTop
		scrollY > 300
			? buttonScrollTop?.classList?.remove('hidden')
			: buttonScrollTop?.classList?.add('hidden')
		buttonScrollTop?.addEventListener('click', e => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		})
	})
}

//wow animation
export function wowAnimationInit() {
	setTimeout(function () {
		const wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: true,
			live: true,
		})
		wow.init()
	}, 400)
}
