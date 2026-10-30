// -------------------------
// Flatpickr
// -------------------------

flatpickr("#date", {
    enableTime: true,
    dateFormat: "d F Y, h:i K",
    minDate: "today",
    inline: true,
    time_24hr: false
});


//-------------------------
// Overlay

let popup = document.querySelector("#submitPopup");
let overlay = document.querySelector("#submitOverlay");
let xbtn = document.querySelector("#xbutton");

// -------------------------
// Custom dropdown — Budget
// -------------------------
(function initBudgetSelect() {
    const root = document.getElementById('budget-select');
    if (!root) return;

    const trigger = root.querySelector('#budget-trigger');
    const menu    = root.querySelector('#budget-menu');
    const valueEl = root.querySelector('.rx-select-value');
    const hidden  = root.querySelector('#budget');
    const errorEl = document.getElementById('budget-error');
    const options = Array.from(menu.querySelectorAll('[role="option"]'));

    let activeIndex = -1;

    function open() {
        root.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        menu.focus();
        activeIndex = Math.max(
            0,
            options.findIndex(o => o.getAttribute('aria-selected') === 'true')
        );
        highlight(activeIndex);
    }

    function close() {
        root.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
    }

    function highlight(i) {
        options.forEach((o, idx) => o.classList.toggle('active', idx === i));
        if (options[i]) options[i].scrollIntoView({ block: 'nearest' });
    }

    function select(li) {
        options.forEach(o => o.setAttribute('aria-selected', 'false'));
        li.setAttribute('aria-selected', 'true');

        const value = li.dataset.value;
        hidden.value = value;
        valueEl.textContent = value;
        valueEl.removeAttribute('data-placeholder');

        root.classList.add('has-value');
        root.classList.remove('invalid');
        if (errorEl) errorEl.textContent = '';

        close();
        trigger.focus();
    }

    trigger.addEventListener('click', () => {
        root.classList.contains('open') ? close() : open();
    });

    options.forEach(li => li.addEventListener('click', () => select(li)));

    root.addEventListener('keydown', (e) => {
        const isOpen = root.classList.contains('open');

        if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            close();
            return;
        }

        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, options.length - 1);
            highlight(activeIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, 0);
            highlight(activeIndex);
        } else if (e.key === 'Home') {
            e.preventDefault(); activeIndex = 0; highlight(activeIndex);
        } else if (e.key === 'End') {
            e.preventDefault(); activeIndex = options.length - 1; highlight(activeIndex);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select(options[activeIndex]);
        } else if (e.key === 'Tab') {
            close();
        }
    });

    document.addEventListener('click', (e) => {
        if (!root.contains(e.target) && root.classList.contains('open')) close();
    });
})();


// -------------------------
// EmailJS
// -------------------------

emailjs.init({
    publicKey: "g8HV-03jEpvzhDv5D"
});


// -------------------------
// Form
// -------------------------

const form = document.querySelector("#leftSecForm");

form.addEventListener("submit", function (event) {

     event.preventDefault();

    // --- Validate custom budget dropdown ---
    const budgetValue = document.querySelector('#budget').value;
    if (!budgetValue) {
        const wrapper = document.getElementById('budget-select');
        const errEl   = document.getElementById('budget-error');
        wrapper.classList.add('invalid');
        if (errEl) errEl.textContent = 'Please select a budget range.';
        document.getElementById('budget-trigger').focus();
        return;
    }
    // --- End budget check ---

    // Get normal fields
    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;
    const organization = document.querySelector("#organization").value;
    const budget = document.querySelector("#budget").value;
    const message = document.querySelector("#message").value;
    const date = document.querySelector("#date").value;
   



    // Get selected services
    const selectedServices = document.querySelectorAll(
        'input[name="services"]:checked'
    );

    const services = Array.from(selectedServices)
        .map(service => service.value)
        .join(", ");


     const termsAccepted = document.querySelector("#terms").checked
    ? "Yes"
    : "No";

    // Data we send to EmailJS
    const templateParams = {
        name: name,
        phone: phone,
        email: email,
        organization: organization,
        budget: budget,
        services: services,
        date: date,
        message: message,
        terms_accepted: termsAccepted
    };


    // Send email
    emailjs.send(
        "service_86ikhka",
        "template_1kqvwf3",
        templateParams
    )
    .then(function () {

        overlay.classList.add("show");
        popup.classList.add("show");

        form.reset();

    })
    .catch(function (error) {

        alert(error);


    });

});


xbtn.addEventListener("click", ()=>{

    overlay.classList.remove("show");
    popup.classList.remove("show");

});
overlay.addEventListener("click", ()=>{
       
    overlay.classList.remove("show");
    popup.classList.remove("show");       

});