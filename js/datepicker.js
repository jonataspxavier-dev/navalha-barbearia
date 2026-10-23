/* Seletor customizado de data (calendário) e horário (grade de horários) */

(function () {
  const picker = document.getElementById('datePicker');
  const timeSlotsEl = document.getElementById('timeSlots');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  if (!picker || !timeSlotsEl || !dateInput || !timeInput) return;

  const MONTH_NAMES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  const MAX_MONTHS_AHEAD = 2;
  const SLOT_STEP_MINUTES = 30;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = null;

  const daysEl = document.getElementById('datepickerDays');
  const monthLabelEl = document.getElementById('currentMonth');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function toISODate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function getHoursFor(date) {
    return BUSINESS_HOURS.find((entry) => entry.weekday === date.getDay()) || null;
  }

  function isMonthAtMin(year, month) {
    return year === today.getFullYear() && month === today.getMonth();
  }

  function isMonthAtMax(year, month) {
    const maxDate = new Date(today.getFullYear(), today.getMonth() + MAX_MONTHS_AHEAD, 1);
    return year === maxDate.getFullYear() && month === maxDate.getMonth();
  }

  function renderCalendar() {
    monthLabelEl.textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
    prevBtn.disabled = isMonthAtMin(viewYear, viewMonth);
    nextBtn.disabled = isMonthAtMax(viewYear, viewMonth);

    const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    let html = '';
    for (let i = 0; i < firstWeekday; i++) {
      html += '<span class="datepicker__day datepicker__day--empty"></span>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const hours = getHoursFor(date);
      const isPast = date < today;
      const isClosed = !hours || !hours.open;
      const disabled = isPast || isClosed;
      const isSelected = selectedDate && isSameDay(date, selectedDate);

      const classes = ['datepicker__day'];
      if (isSelected) classes.push('is-selected');
      if (disabled) classes.push('is-disabled');

      html += `<button type="button" class="${classes.join(' ')}" data-date="${toISODate(date)}" ${disabled ? 'disabled' : ''} aria-pressed="${isSelected ? 'true' : 'false'}">${day}</button>`;
    }

    daysEl.innerHTML = html;

    daysEl.querySelectorAll('button[data-date]:not([disabled])').forEach((btn) => {
      btn.addEventListener('click', () => selectDate(btn.dataset.date));
    });
  }

  function selectDate(isoDate) {
    const [y, m, d] = isoDate.split('-').map(Number);
    selectedDate = new Date(y, m - 1, d);

    dateInput.value = isoDate;
    dateInput.dispatchEvent(new Event('change', { bubbles: true }));

    timeInput.value = '';
    timeInput.dispatchEvent(new Event('change', { bubbles: true }));

    renderCalendar();
    renderTimeSlots();
  }

  function renderTimeSlots() {
    if (!selectedDate) {
      timeSlotsEl.innerHTML = '<p class="timeslots__hint">Selecione uma data primeiro.</p>';
      return;
    }

    const hours = getHoursFor(selectedDate);
    if (!hours || !hours.open) {
      timeSlotsEl.innerHTML = '<p class="timeslots__hint">Fechado nesse dia. Escolha outra data.</p>';
      return;
    }

    const openMinutes = timeToMinutes(hours.open);
    const closeMinutes = timeToMinutes(hours.close);

    const isToday = isSameDay(selectedDate, today);
    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

    const slots = [];
    for (let m = openMinutes; m < closeMinutes; m += SLOT_STEP_MINUTES) {
      if (isToday && m <= nowMinutes) continue;
      slots.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
    }

    if (slots.length === 0) {
      timeSlotsEl.innerHTML = '<p class="timeslots__hint">Nenhum horário disponível para essa data.</p>';
      return;
    }

    timeSlotsEl.innerHTML = slots
      .map(
        (slot) =>
          `<button type="button" class="timeslot" data-time="${slot}" aria-pressed="${timeInput.value === slot ? 'true' : 'false'}">${slot}</button>`
      )
      .join('');

    timeSlotsEl.querySelectorAll('button[data-time]').forEach((btn) => {
      btn.addEventListener('click', () => selectTime(btn.dataset.time));
    });
  }

  function selectTime(time) {
    timeInput.value = time;
    timeInput.dispatchEvent(new Event('change', { bubbles: true }));

    timeSlotsEl.querySelectorAll('.timeslot').forEach((btn) => {
      const isActive = btn.dataset.time === time;
      btn.classList.toggle('is-selected', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  prevBtn.addEventListener('click', () => {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    renderCalendar();
  });

  renderCalendar();
  renderTimeSlots();

  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('reset', () => {
      selectedDate = null;
      viewYear = today.getFullYear();
      viewMonth = today.getMonth();
      renderCalendar();
      renderTimeSlots();
    });
  }
})();
