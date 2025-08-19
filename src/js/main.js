// Initialize mobile menu and submenu functionality
function initializeMobileMenu() {
	// Select main DOM elements for mobile menu
	const menu = document.querySelector("#mobile-menu")
	const overlay = document.querySelector("#mobile-menu-overlay")
	const burger = document.querySelector("#burger")
	const body = document.querySelector("body")

	// Define mobile breakpoint for responsive behavior
	const MOBILE_BREAKPOINT = 992

	// Exit if required elements are missing
	if (!menu || !burger || !body || !overlay) return

	// ============================
	// MENU TOGGLE FUNCTIONALITY
	// ============================

	const updateMenuState = (isOpen) => {
		burger.setAttribute("aria-expanded", isOpen)
		burger.classList.toggle("active", isOpen)

		menu.classList.toggle("is-open", isOpen)
		menu.classList.toggle("-translate-x-full", !isOpen)
		menu.classList.toggle("translate-x-0", isOpen)

		overlay.classList.toggle("opacity-0", !isOpen)
		overlay.classList.toggle("opacity-100", isOpen)
		overlay.classList.toggle("pointer-events-none", !isOpen)
		overlay.classList.toggle("pointer-events-auto", isOpen)

		body.classList.toggle("overflow-hidden", isOpen)
	}

	const handleBurgerClick = () => {
		const isOpening = !menu.classList.contains("is-open")
		updateMenuState(isOpening)
	}

	const handleOverlayClick = (event) => {
		if (event.target === overlay) updateMenuState(false)
	}

	const handleEscapeKey = (event) => {
		if (event.key === "Escape" && menu.classList.contains("is-open")) {
			updateMenuState(false)
		}
	}

	const handleWindowResize = () => {
		if (window.innerWidth >= MOBILE_BREAKPOINT) {
			updateMenuState(false)
		}
	}

	// Add event listeners for main menu
	burger.addEventListener("click", handleBurgerClick)
	overlay.addEventListener("click", handleOverlayClick)
	document.addEventListener("keydown", handleEscapeKey)
	window.addEventListener("resize", handleWindowResize)

	burger.setAttribute("aria-expanded", "false")
	handleWindowResize()

	// ============================
	// SUBMENU FUNCTIONALITY
	// ============================

	// Check if there are submenu triggers at all
	const submenuTriggersExist = menu.querySelector(".submenu-trigger")

	if (submenuTriggersExist) {
		menu.addEventListener("click", (event) => {
			const trigger = event.target.closest(".submenu-trigger")
			if (!trigger) return

			const submenuItem = trigger.closest(".with-submenu")
			if (submenuItem) {
				submenuItem.classList.toggle("active")
			}
		})
	}
}

// Run initialization
initializeMobileMenu()

// Initialize accordion functionality
function initializeAccordion() {
	// Select the accordion container (assuming items are inside a common parent)
	const accordion = document.querySelector(".accordion")
	const accordionItems = document.querySelectorAll(".accordion-item")

	// Exit if no accordion container or items are found
	if (!accordion || !accordionItems.length) return

	// Set initial state for all accordion items
	accordionItems.forEach((item) => {
		const content = item.querySelector(".accordion-content")
		const trigger = item.querySelector(".accordion-trigger")

		if (!content || !trigger) return

		// Set ARIA attributes for accessibility
		trigger.setAttribute("aria-expanded", item.classList.contains("active"))
		content.setAttribute("aria-hidden", !item.classList.contains("active"))

		// Ensure content has active class if item is active
		if (item.classList.contains("active")) {
			content.classList.add("active")
		}
	})

	// Use event delegation for accordion triggers
	accordion.addEventListener("click", (event) => {
		const trigger = event.target.closest(".accordion-trigger")
		if (!trigger) return // Exit if not a trigger

		const parent = trigger.closest(".accordion-item")
		if (!parent) return // Exit if no parent item

		const content = parent.querySelector(".accordion-content")
		if (!content) return

		// Toggle active state
		const isOpening = !parent.classList.contains("active")
		parent.classList.toggle("active")
		content.classList.toggle("active")

		// Update ARIA attributes
		trigger.setAttribute("aria-expanded", isOpening)
		content.setAttribute("aria-hidden", !isOpening)

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
	accordion.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			const trigger = event.target.closest(".accordion-trigger")
			if (!trigger) return

			event.preventDefault() // Prevent default scrolling for spacebar
			trigger.click() // Simulate click to reuse logic
		}
	})
}
initializeAccordion()
