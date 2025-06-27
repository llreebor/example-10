// GLOBAL
// Initialize mobile menu functionality
function initializeMobileMenu() {
	// Select DOM elements
	const menu = document.querySelector('.mobile__menu')
	const burger = document.querySelector('.burger__btn')
	const body = document.querySelector('body')

	// Define mobile breakpoint for responsive behavior
	const MOBILE_BREAKPOINT = 1280

	// Exit if required elements are missing
	if (!menu || !burger || !body) return

	// Function to update menu state
	const updateMenuState = (isOpen) => {
		// Update ARIA attribute for accessibility
		burger.setAttribute('aria-expanded', isOpen)
		// Toggle active class for burger button styling
		burger.classList.toggle('active', isOpen)
		// Toggle menu visibility with animation
		menu.classList.toggle('is-open', isOpen)
		// Toggle body scroll lock
		body.classList.toggle('overflow-hidden', isOpen)
	}

	// Handle burger button click to toggle menu
	const handleBurgerClick = () => {
		const isOpening = !menu.classList.contains('is-open')
		updateMenuState(isOpening)
	}

	// Handle Escape key to close the menu
	const handleEscapeKey = (event) => {
		if (event.key === 'Escape' && menu.classList.contains('is-open')) {
			updateMenuState(false)
		}
	}

	// Handle window resize to reset menu state on desktop
	const handleWindowResize = () => {
		if (window.innerWidth >= MOBILE_BREAKPOINT) {
			updateMenuState(false)
		}
	}

	// Add event listeners
	burger.addEventListener('click', handleBurgerClick)
	document.addEventListener('keydown', handleEscapeKey)
	window.addEventListener('resize', handleWindowResize)

	// Initialize menu state on page load
	burger.setAttribute('aria-expanded', 'false')
	handleWindowResize()

	// Handle clicks on all links within topMenu and submenus
	const allMenuLinks = document.querySelectorAll('.mobile__menu a')
	allMenuLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			// Allow default behavior (navigation) if href is valid
			const href = link.getAttribute('href')
			if (href && href !== '#') {
				updateMenuState(false)
				// Navigation will happen automatically unless prevented
			} else {
				e.preventDefault() // Prevent default if href is empty or '#'
				updateMenuState(true)
			}
		})
	})
}
// Run initialization
initializeMobileMenu()

// Initialize accordion functionality
function initializeAccordion() {
	// Select all accordion containers
	const accordions = document.querySelectorAll('.accordion')

	// Exit if no accordions are found
	if (!accordions.length) return

	// Process each accordion independently
	accordions.forEach((accordion) => {
		const accordionItems = accordion.querySelectorAll('.accordion__item')

		// Skip if no items in this accordion
		if (!accordionItems.length) return

		// Set initial state for all accordion items in this accordion
		accordionItems.forEach((item, idx) => {
			const content = item.querySelector('.accordion__content')
			const trigger = item.querySelector('.accordion__trigger')

			if (!content || !trigger) return

			// Set ARIA attributes for accessibility
			trigger.setAttribute('aria-expanded', item.classList.contains('active'))
			content.setAttribute('aria-hidden', !item.classList.contains('active'))

			// Ensure content has active class if item is active
			if (item.classList.contains('active')) {
				content.classList.add('active')
			}
		})

		// Use event delegation for accordion triggers within this accordion
		accordion.addEventListener('click', (event) => {
			const trigger = event.target.closest('.accordion__trigger')
			if (!trigger) return // Exit if not a trigger

			const parent = trigger.closest('.accordion__item')
			if (!parent) return // Exit if no parent item

			const content = parent.querySelector('.accordion__content')
			if (!content) return

			// Toggle active state
			const isOpening = !parent.classList.contains('active')
			parent.classList.toggle('active')
			content.classList.toggle('active')
			// Update ARIA attributes
			trigger.setAttribute('aria-expanded', isOpening)
			content.setAttribute('aria-hidden', !isOpening)

			// Optional: Close other items in this accordion if only one should be open
			/*
			if (isOpening) {
				accordion.querySelectorAll('.accordion__item').forEach((otherItem) => {
					if (otherItem !== parent && otherItem.classList.contains('active')) {
						otherItem.classList.remove('active')
						const otherContent = otherItem.querySelector('.accordion__content')
						const otherTrigger = otherItem.querySelector('.accordion__trigger')
						if (otherContent && otherTrigger) {
							otherContent.classList.remove('active')
							otherTrigger.setAttribute('aria-expanded', 'false')
							otherContent.setAttribute('aria-hidden', 'true')
						}
					}
				})
			}
			*/
		})

		// Add keyboard support for accessibility within this accordion
		accordion.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				const trigger = event.target.closest('.accordion__trigger')
				if (!trigger) return

				event.preventDefault() // Prevent default scrolling for spacebar
				trigger.click() // Simulate click to reuse logic
			}
		})
	})
}
initializeAccordion()

// HOME PAGE
// Show more lawyers
function showMoreLawyers() {
	const btn = document.querySelector('.lawyer__more-btn')
	const hiddenBlocks = document.querySelectorAll(
		'.lawyers__item.lawyers__item-hidden'
	)

	if (!btn || !hiddenBlocks.length) return

	btn.addEventListener('click', () => {
		hiddenBlocks.forEach((block) => {
			block.classList.remove('lawyers__item-hidden')
		})

		btn.classList.add('hidden')
	})
}
showMoreLawyers()

// Hero Tabs
// Initializes tab navigation with accessibility features for a given tab container.
function toggleTabs(tabsId) {
	// Get the main tab container element
	const tabs = document.getElementById(tabsId)
	if (!tabs) return // Exit if the tab container is not found

	// Select all tab triggers and content panels
	const tabsTriggers = tabs.querySelectorAll('.tab-trigger')
	const tabsContents = tabs.querySelectorAll('.tab-content')

	// Sets the active tab and updates ARIA attributes and visual states.
	function setActiveTab(index) {
		// Update each tab trigger's state
		tabsTriggers.forEach((trigger, i) => {
			const isActive = i === index
			// Set ARIA attribute to indicate the selected tab
			trigger.setAttribute('aria-selected', isActive)
			// Set tabindex for keyboard accessibility
			trigger.setAttribute('tabindex', isActive ? '0' : '-1')
			// Toggle active class for visual styling
			trigger.classList.toggle('active', isActive)
		})

		// Update each content panel's visibility
		tabsContents.forEach((content, i) => {
			const isActive = i === index
			// Toggle hidden class to show only the active content
			content.classList.toggle('hidden', !isActive)
			// Set ARIA attribute to indicate visibility for screen readers
			content.setAttribute('aria-hidden', !isActive)
		})
	}

	// Add event listeners to each tab trigger
	tabsTriggers.forEach((trigger, index) => {
		// Handle click events to activate the tab
		trigger.addEventListener('click', () => {
			setActiveTab(index)
		})

		// Handle keyboard navigation
		trigger.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				// Activate tab on Enter or Space key press
				e.preventDefault()
				setActiveTab(index)
			} else if (e.key === 'ArrowRight') {
				// Navigate to the next tab with Arrow Right
				e.preventDefault()
				const nextIndex = (index + 1) % tabsTriggers.length
				setActiveTab(nextIndex)
				tabsTriggers[nextIndex].focus()
			} else if (e.key === 'ArrowLeft') {
				// Navigate to the previous tab with Arrow Left
				e.preventDefault()
				const prevIndex = (index - 1 + tabsTriggers.length) % tabsTriggers.length
				setActiveTab(prevIndex)
				tabsTriggers[prevIndex].focus()
			}
		})
	})

	// Initialize the first tab as active
	setActiveTab(0)
}
// Initialize tabs with the ID 'tabs'
toggleTabs('hero__tabs')

function initializeCustomSelect(selectId, optionsId, selectedOptionId) {
	const customSelect = document.getElementById(selectId)
	const selectedOption = document.getElementById(selectedOptionId)
	const customOptions = document.getElementById(optionsId)

	if (!customSelect || !selectedOption || !customOptions) return

	// Только после этого безопасно получать .getElementsByClassName
	const options = customOptions.getElementsByClassName('select__option')

	// Проверяем наличие хотя бы одной опции
	if (!options || options.length === 0) return

	customSelect.addEventListener('click', () => {
		customSelect.classList.toggle('active')
		customOptions.classList.toggle('hidden')
		selectedOption.classList.toggle('active')
	})

	for (let option of options) {
		option.addEventListener('click', () => {
			selectedOption.innerText = option.innerText
			selectedOption.classList.remove('active')
			customOptions.classList.add('hidden')
			customSelect.classList.remove('active')
		})
	}

	document.addEventListener('click', (event) => {
		const target = event.target
		if (!customSelect.contains(target) && !customOptions.contains(target)) {
			selectedOption.classList.remove('active')
			customOptions.classList.add('hidden')
			customSelect.classList.remove('active')
		}
	})
}
initializeCustomSelect(
	'select-legal-1',
	'options-legal-1',
	'selected-option-legal-1'
)
initializeCustomSelect(
	'select-city-1',
	'options-city-1',
	'selected-option-city-1'
)
initializeCustomSelect(
	'select-legal-2',
	'options-legal-2',
	'selected-option-legal-2'
)
initializeCustomSelect(
	'select-city-2',
	'options-city-2',
	'selected-option-city-2'
)
initializeCustomSelect('select-type', 'options-type', 'selected-option-type')
initializeCustomSelect('select-help', 'options-help', 'selected-option-help')

function initPagination() {
	const paginationItems = document.querySelectorAll('.pagination__item')

	if (!paginationItems.length) return

	paginationItems.forEach((item, index) => {
		// Пропускаем последний элемент (стрелка)
		const isLast = index === paginationItems.length - 1
		if (isLast) return

		item.addEventListener('click', function () {
			// Удаляем класс active у всех (кроме стрелки)
			paginationItems.forEach((el, idx) => {
				if (idx !== paginationItems.length - 1) {
					el.classList.remove('active')
				}
			})
			// Добавляем active на текущий
			item.classList.add('active')
		})
	})
}
initPagination()
