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
	// Select the accordion container (assuming items are inside a common parent)
	const accordion = document.querySelector('.accordion')
	const accordionItems = document.querySelectorAll('.accordion__item')

	// Exit if no accordion container or items are found
	if (!accordion || !accordionItems.length) return

	// Set initial state for all accordion items
	accordionItems.forEach((item) => {
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

	// Use event delegation for accordion triggers
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

		// Optional: Close other items if only one should be open
		/*
    if (isOpening) {
        document.querySelectorAll(".accordion-item").forEach((otherItem) => {
            if (otherItem !== parent && otherItem.classList.contains("active")) {
                otherItem.classList.remove("active");
                const otherContent = otherItem.querySelector(".accordion-content");
                const otherTrigger = otherItem.querySelector(".accordion-trigger");
                if (otherContent && otherTrigger) {
                    otherContent.classList.remove("active");
                    otherTrigger.setAttribute("aria-expanded", "false");
                    otherContent.setAttribute("aria-hidden", "true");
                }
            }
        });
    }
    */
	})

	// Add keyboard support for accessibility
	accordion.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			const trigger = event.target.closest('.accordion__trigger')
			if (!trigger) return

			event.preventDefault() // Prevent default scrolling for spacebar
			trigger.click() // Simulate click to reuse logic
		}
	})
}
initializeAccordion()
