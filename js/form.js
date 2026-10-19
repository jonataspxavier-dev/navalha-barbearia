/* Formulário de agendamento: máscara, validação e persistência local */

(function () {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const STORAGE_KEY = 'navalha-appointments';

  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const serviceSelect = document.getElementById('service');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const successBox = document.getElementById('formSuccess');

  const todayISO = new Date().toISOString().split('T')[0];

  function setError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message || '';
  }

  function maskPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  phoneInput.addEventListener('input', () => {
    phoneInput.value = maskPhone(phoneInput.value);
  });

  function getWeekdayHours(dateValue) {
    if (!dateValue) return null;
    const [year, month, day] = dateValue.split('-').map(Number);
    const weekday = new Date(year, month - 1, day).getDay();
    return BUSINESS_HOURS.find((entry) => entry.weekday === weekday) || null;
  }

  function timeToMinutes(value) {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 3) {
      setError('nameError', 'Informe seu nome completo.');
      return false;
    }
    setError('nameError');
    return true;
  }

  function validatePhone() {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length !== 11) {
      setError('phoneError', 'Telefone deve ter DDD + 9 dígitos. Ex: (11) 98888-7777.');
      return false;
    }
    setError('phoneError');
    return true;
  }

  function validateService() {
    if (!serviceSelect.value) {
      setError('serviceError', 'Selecione um serviço.');
      return false;
    }
    setError('serviceError');
    return true;
  }

  function validateDate() {
    const value = dateInput.value;
    if (!value) {
      setError('dateError', 'Escolha uma data.');
      return false;
    }
    if (value < todayISO) {
      setError('dateError', 'A data não pode estar no passado.');
      return false;
    }
    const dayHours = getWeekdayHours(value);
    if (!dayHours || !dayHours.open) {
      setError('dateError', 'Estamos fechados nessa data. Escolha outro dia.');
      return false;
    }
    setError('dateError');
    return true;
  }

  function validateTime() {
    const value = timeInput.value;
    if (!value) {
      setError('timeError', 'Escolha um horário.');
      return false;
    }
    const dayHours = getWeekdayHours(dateInput.value);
    if (!dayHours || !dayHours.open) {
      setError('timeError', '');
      return false;
    }
    const minutes = timeToMinutes(value);
    if (minutes < timeToMinutes(dayHours.open) || minutes >= timeToMinutes(dayHours.close)) {
      setError('timeError', `Fora do expediente (${dayHours.open} – ${dayHours.close}).`);
      return false;
    }
    setError('timeError');
    return true;
  }

  function saveAppointment(data) {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  [nameInput, phoneInput].forEach((input) => input.addEventListener('blur', () => {
    if (input === nameInput) validateName();
    if (input === phoneInput) validatePhone();
  }));
  serviceSelect.addEventListener('change', validateService);
  dateInput.addEventListener('change', () => {
    validateDate();
    validateTime();
  });
  timeInput.addEventListener('change', validateTime);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successBox.hidden = true;

    const validations = [validateName(), validatePhone(), validateService(), validateDate(), validateTime()];
    if (!validations.every(Boolean)) return;

    const service = SERVICES.find((item) => String(item.id) === serviceSelect.value);

    saveAppointment({
      name: nameInput.value.trim(),
      phone: phoneInput.value,
      service: service ? service.name : '',
      date: dateInput.value,
      time: timeInput.value,
      createdAt: new Date().toISOString(),
    });

    successBox.hidden = false;
    form.reset();
  });
})();
