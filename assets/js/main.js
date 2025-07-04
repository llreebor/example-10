// Initialize mobile menu functionality
function initializeMobileMenu() {
  // Select DOM elements
  const menu = document.querySelector(".mobile__menu");
  const burger = document.querySelector(".burger__btn");
  const body = document.querySelector("body");

  // Define mobile breakpoint for responsive behavior
  const MOBILE_BREAKPOINT = 1280;

  // Exit if required elements are missing
  if (!menu || !burger || !body) return;

  // Function to update menu state
  const updateMenuState = (isOpen) => {
    // Update ARIA attribute for accessibility
    burger.setAttribute("aria-expanded", isOpen);
    // Toggle active class for burger button styling
    burger.classList.toggle("active", isOpen);
    // Toggle menu visibility with animation
    menu.classList.toggle("is-open", isOpen);
    // Toggle body scroll lock
    body.classList.toggle("overflow-hidden", isOpen);
  };

  // Handle burger button click to toggle menu
  const handleBurgerClick = () => {
    const isOpening = !menu.classList.contains("is-open");
    updateMenuState(isOpening);
  };

  // Handle Escape key to close the menu
  const handleEscapeKey = (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      updateMenuState(false);
    }
  };

  // Handle window resize to reset menu state on desktop
  const handleWindowResize = () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      updateMenuState(false);
    }
  };

  // Add event listeners
  burger.addEventListener("click", handleBurgerClick);
  document.addEventListener("keydown", handleEscapeKey);
  window.addEventListener("resize", handleWindowResize);

  // Initialize menu state on page load
  burger.setAttribute("aria-expanded", "false");
  handleWindowResize();

  // Handle clicks on all links within topMenu and submenus
  const allMenuLinks = document.querySelectorAll(".mobile__menu a");
  allMenuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Allow default behavior (navigation) if href is valid
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        updateMenuState(false);
        // Navigation will happen automatically unless prevented
      } else {
        e.preventDefault(); // Prevent default if href is empty or '#'
        updateMenuState(true);
      }
    });
  });
}
// Run initialization
initializeMobileMenu();

function toggleMenuType() {
  const buttons = document.querySelectorAll(".bussiness__type-link");
  const menusDesktop = document.querySelectorAll(".main__menu");
  const menusMobile = document.querySelectorAll(".mobile__menu-accordion");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      button.classList.add("active");

      // Hide all menus
      menusDesktop.forEach((menu) => {
        menu.classList.add("hidden");
      });
      menusMobile.forEach((menu) => {
        menu.classList.add("hidden");
      });

      // Show target menu
      const targetMenu = document.querySelector(
        `.main__menu-${button.dataset.target}`
      );
      const targetMenuMobile = document.querySelector(
        `.mobile__menu-accordion-${button.dataset.target}`
      );
      targetMenu.classList.remove("hidden");
      targetMenuMobile.classList.remove("hidden");
    });
  });
}
toggleMenuType();
// Initialize accordion functionality
function initializeAccordion() {
  // Select all accordion containers
  const accordions = document.querySelectorAll(".accordion");

  // Exit if no accordions are found
  if (!accordions.length) return;

  // Process each accordion independently
  accordions.forEach((accordion) => {
    const accordionItems = accordion.querySelectorAll(".accordion__item");

    // Skip if no items in this accordion
    if (!accordionItems.length) return;

    // Set initial state for all accordion items in this accordion
    accordionItems.forEach((item, idx) => {
      const content = item.querySelector(".accordion__content");
      const trigger = item.querySelector(".accordion__trigger");

      if (!content || !trigger) return;

      // Set ARIA attributes for accessibility
      trigger.setAttribute("aria-expanded", item.classList.contains("active"));
      content.setAttribute("aria-hidden", !item.classList.contains("active"));

      // Ensure content has active class if item is active
      if (item.classList.contains("active")) {
        content.classList.add("active");
      }
    });

    // Use event delegation for accordion triggers within this accordion
    accordion.addEventListener("click", (event) => {
      const trigger = event.target.closest(".accordion__trigger");
      if (!trigger) return; // Exit if not a trigger

      const parent = trigger.closest(".accordion__item");
      if (!parent) return; // Exit if no parent item

      const content = parent.querySelector(".accordion__content");
      if (!content) return;

      // Toggle active state
      const isOpening = !parent.classList.contains("active");
      parent.classList.toggle("active");
      content.classList.toggle("active");
      // Update ARIA attributes
      trigger.setAttribute("aria-expanded", isOpening);
      content.setAttribute("aria-hidden", !isOpening);

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
    });

    // Add keyboard support for accessibility within this accordion
    accordion.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        const trigger = event.target.closest(".accordion__trigger");
        if (!trigger) return;

        event.preventDefault(); // Prevent default scrolling for spacebar
        trigger.click(); // Simulate click to reuse logic
      }
    });
  });
}
initializeAccordion();

// Show more lawyers
function showMoreLawyers() {
  const btn = document.querySelector(".lawyer__more-btn");
  const hiddenBlocks = document.querySelectorAll(
    ".lawyers__item.lawyers__item-hidden"
  );

  if (!btn || !hiddenBlocks.length) return;

  btn.addEventListener("click", () => {
    hiddenBlocks.forEach((block) => {
      block.classList.remove("lawyers__item-hidden");
    });

    btn.classList.add("hidden");
  });
}
showMoreLawyers();

// Hero Tabs
function toggleTabs(tabsId) {
  // Get the main tab container element
  const tabs = document.getElementById(tabsId);
  if (!tabs) return; // Exit if the tab container is not found

  // Select all tab triggers and content panels
  const tabsTriggers = tabs.querySelectorAll(".tab-trigger");
  const tabsContents = tabs.querySelectorAll(".tab-content");

  // Sets the active tab and updates ARIA attributes and visual states.
  function setActiveTab(index) {
    // Update each tab trigger's state
    tabsTriggers.forEach((trigger, i) => {
      const isActive = i === index;
      // Set ARIA attribute to indicate the selected tab
      trigger.setAttribute("aria-selected", isActive);
      // Set tabindex for keyboard accessibility
      trigger.setAttribute("tabindex", isActive ? "0" : "-1");
      // Toggle active class for visual styling
      trigger.classList.toggle("active", isActive);
    });

    // Update each content panel's visibility
    tabsContents.forEach((content, i) => {
      const isActive = i === index;
      // Toggle hidden class to show only the active content
      content.classList.toggle("hidden", !isActive);
      // Set ARIA attribute to indicate visibility for screen readers
      content.setAttribute("aria-hidden", !isActive);
    });
  }

  // Add event listeners to each tab trigger
  tabsTriggers.forEach((trigger, index) => {
    // Handle click events to activate the tab
    trigger.addEventListener("click", () => {
      setActiveTab(index);
    });

    // Handle keyboard navigation
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        // Activate tab on Enter or Space key press
        e.preventDefault();
        setActiveTab(index);
      } else if (e.key === "ArrowRight") {
        // Navigate to the next tab with Arrow Right
        e.preventDefault();
        const nextIndex = (index + 1) % tabsTriggers.length;
        setActiveTab(nextIndex);
        tabsTriggers[nextIndex].focus();
      } else if (e.key === "ArrowLeft") {
        // Navigate to the previous tab with Arrow Left
        e.preventDefault();
        const prevIndex =
          (index - 1 + tabsTriggers.length) % tabsTriggers.length;
        setActiveTab(prevIndex);
        tabsTriggers[prevIndex].focus();
      }
    });
  });

  // Initialize the first tab as active
  setActiveTab(0);
}
// Initialize tabs with the ID 'tabs'
toggleTabs("hero__tabs");

// Custom Select
function initializeCustomSelect(selectId, optionsId, selectedOptionId) {
  const customSelect = document.getElementById(selectId);
  const selectedOption = document.getElementById(selectedOptionId);
  const customOptions = document.getElementById(optionsId);

  if (!customSelect || !selectedOption || !customOptions) return;

  // Только после этого безопасно получать .getElementsByClassName
  const options = customOptions.getElementsByClassName("select__option");

  // Проверяем наличие хотя бы одной опции
  if (!options || options.length === 0) return;

  customSelect.addEventListener("click", () => {
    customSelect.classList.toggle("active");
    customOptions.classList.toggle("hidden");
    selectedOption.classList.toggle("active");
  });

  for (let option of options) {
    option.addEventListener("click", () => {
      selectedOption.innerText = option.innerText;
      selectedOption.classList.remove("active");
      customOptions.classList.add("hidden");
      customSelect.classList.remove("active");
      selectedOption.classList.add("text-blue-200");
    });
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!customSelect.contains(target) && !customOptions.contains(target)) {
      selectedOption.classList.remove("active");
      customOptions.classList.add("hidden");
      customSelect.classList.remove("active");
    }
  });
}
initializeCustomSelect(
  "select-city-1",
  "options-city-1",
  "selected-option-city-1"
);
initializeCustomSelect("select-type", "options-type", "selected-option-type");
initializeCustomSelect("select-help", "options-help", "selected-option-help");
initializeCustomSelect("select-city", "options-city", "selected-option-city");
initializeCustomSelect(
  "select-price",
  "options-price",
  "selected-option-price"
);

// Pagination
function initPagination() {
  const paginationItems = document.querySelectorAll(".pagination__item");

  if (!paginationItems.length) return;

  paginationItems.forEach((item, index) => {
    const isLast = index === paginationItems.length - 1;
    if (isLast) return;

    item.addEventListener("click", function () {
      paginationItems.forEach((el, idx) => {
        if (idx !== paginationItems.length - 1) {
          el.classList.remove("active");
        }
      });
      item.classList.add("active");
    });
  });
}
initPagination();

// Toggles the visibility of the filters drawer and handles outside clicks to close it
function toggleFiltersVisibility() {
  // Select DOM elements for the filters drawer, close button, and trigger button
  const filters = document.querySelector(".filters-drawer");
  const filtersCloseBtn = document.querySelector(".filters-close");
  const filtersTriggerBtn = document.querySelector(".filters-trigger");

  // Exit early if any required elements are missing
  if (!filters || !filtersCloseBtn || !filtersTriggerBtn) {
    console.warn("Required elements for filters not found");
    return;
  }

  // Toggle filters visibility when trigger button is clicked
  const toggleFilters = () => {
    filters.classList.toggle("active");
    filtersTriggerBtn.classList.toggle("active");
  };

  // Close filters when close button is clicked
  const closeFilters = () => {
    filters.classList.remove("active");
    filtersTriggerBtn.classList.remove("active");
  };

  // Close filters when clicking outside the filters drawer
  const handleOutsideClick = (event) => {
    // Check if the click is outside the filters drawer and trigger button
    if (
      !filters.contains(event.target) &&
      !filtersTriggerBtn.contains(event.target)
    ) {
      closeFilters();
    }
  };

  // Add event listener for the trigger button
  filtersTriggerBtn.addEventListener("click", toggleFilters);

  // Add event listener for the close button
  filtersCloseBtn.addEventListener("click", closeFilters);

  // Add event listener for clicks anywhere on the document
  document.addEventListener("click", handleOutsideClick);
}
// Initialize the filters functionality
toggleFiltersVisibility();

// Slide Animation
/* SLIDE UP */
let slideUp = (target, duration = 300) => {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.boxSizing = "border-box";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.style.border = "none";

  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
    target.style.removeProperty("border");
  }, duration);
};
/* SLIDE DOWN */
let slideDown = (target, duration = 300) => {
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;
  if (display === "none") display = "grid";
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.border = "none";

  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  target.style.removeProperty("border");

  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
    target.style.removeProperty("border");
  }, duration);
};
/* TOOGLE */
const slideToggle = (target, duration = 300) => {
  if (window.getComputedStyle(target).display === "none") {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

/**
 * Initializes the toggle functionality for showing/hiding filters on mobile.
 * When the "More Filters" button is clicked, the hidden filters section
 * will slide open or closed, and the button will toggle its active state.
 */
function initMobileFilterToggle() {
  const hiddenFilters = document.querySelector(".filters__group");
  const triggerBtn = document.querySelector(".filters__more-btn");

  // Exit early if required elements are not found
  if (!hiddenFilters || !triggerBtn) return;

  triggerBtn.addEventListener("click", () => {
    slideToggle(hiddenFilters);
    triggerBtn.classList.toggle("active");
  });
}

// Initialize the filter toggle functionality
initMobileFilterToggle();

// Autocomplete
function initializeAutocomplete(selector, suggestions) {
  const inputs = document.querySelectorAll(selector);

  inputs.forEach((input) => {
    const label = input.closest(".autocomplete-label");
    if (!label) return;

    let list = label.querySelector(".autocomplete-list");

    if (!list) {
      list = document.createElement("ul");
      list.className = "autocomplete-list";
      label.appendChild(list);
    }

    input.addEventListener("input", () => {
      const value = input.value.trim().toLowerCase();
      list.innerHTML = "";

      if (!value) {
        label.classList.remove("active");
        return;
      }

      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value)
      );

      if (filtered.length === 0) {
        label.classList.remove("active");
        return;
      }

      filtered.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        li.addEventListener("click", () => {
          input.value = item;
          label.classList.remove("active");
        });
        list.appendChild(li);
      });

      label.classList.add("active");
    });

    document.addEventListener("click", (e) => {
      if (!label.contains(e.target)) {
        label.classList.remove("active");
      }
    });
  });
}
const rechtsgebieden = [
  "Strafrecht",
  "Arbeidsstrafrecht",
  "Familierecht",
  "Ondernemingsrecht",
  "Fiscaal recht",
  "Bestuursrecht",
  "Burgerlijk recht"
];

initializeAutocomplete(".autocomplete-input-area", rechtsgebieden);
initializeAutocomplete(".autocomplete-input-name", rechtsgebieden);
initializeAutocomplete(".autocomplete-input-jurisdiction", rechtsgebieden);

// Modal
function toggleModal(btnId, modalId, closeBtnId) {
  // Select DOM elements
  const modal = document.getElementById(modalId);
  const btn = document.getElementById(btnId);
  const close = document.getElementById(closeBtnId);
  const body = document.querySelector("body");

  // Exit if any required element is missing
  if (!modal || !btn || !close || !body) return;

  // Get focusable elements for focus trapping
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const toggleModalState = (isOpen) => {
    modal.classList.toggle("active", isOpen);
    btn.setAttribute("aria-expanded", isOpen);
    body.classList.toggle("overflow-hidden", isOpen);
  };

  // Closes the modal and returns focus to the open button
  const closeModal = () => {
    toggleModalState(false);
    body.classList.remove("overflow-hidden");
    btn.focus(); // Restore focus to the open button
  };

  // Handle open button click
  btn.addEventListener("click", () => {
    toggleModalState(true);
    body.classList.add("overflow-hidden");
    if (firstFocusable) firstFocusable.focus(); // Set focus to first focusable element
  });

  // Handle close button click
  close.addEventListener("click", closeModal);

  // Handle click on modal backdrop to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Implement focus trap for accessibility
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && modal.classList.contains("active")) {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus(); // Move to last focusable element
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus(); // Move to first focusable element
      }
    }
  });

  // Ensure modal is closed on page load
  toggleModalState(false);
}
toggleModal("modal-btn", "modal", "modal-close-btn");
