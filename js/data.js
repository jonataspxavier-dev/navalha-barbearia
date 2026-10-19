/* Dados estáticos do site — fictícios, para portfólio */

const SERVICES = [
  { id: 1, name: 'Corte Clássico', description: 'Tesoura e máquina, acabamento na navalha.', duration: 30, price: 45 },
  { id: 2, name: 'Barba Completa', description: 'Modelagem, toalha quente e hidratação.', duration: 30, price: 40 },
  { id: 3, name: 'Corte + Barba', description: 'O combo completo com acabamento premium.', duration: 55, price: 75 },
  { id: 4, name: 'Degradê', description: 'Fade americano com máquina de precisão.', duration: 40, price: 55 },
  { id: 5, name: 'Sobrancelha', description: 'Design e aparo na navalha.', duration: 15, price: 20 },
  { id: 6, name: 'Pezinho', description: 'Acabamento de contorno entre cortes.', duration: 15, price: 15 },
];

const GALLERY = [
  { id: 1, src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=700&h=525&q=75&auto=format&fit=crop', alt: 'Barbeiro finalizando o corte de um cliente com secador' },
  { id: 2, src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&h=525&q=75&auto=format&fit=crop', alt: 'Barba sendo aparada com tesoura' },
  { id: 3, src: 'https://images.unsplash.com/photo-1536520002442-39764a41e987?w=700&h=525&q=75&auto=format&fit=crop', alt: 'Ambiente interno da barbearia com fileira de cadeiras e espelhos' },
  { id: 4, src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=700&h=525&q=75&auto=format&fit=crop', alt: 'Ferramentas de barbeiro organizadas no balcão: máquinas, tesoura e pente' },
  { id: 5, src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=700&h=525&q=75&auto=format&fit=crop', alt: 'Close do acabamento de um corte degradê' },
  { id: 6, src: 'https://images.unsplash.com/photo-1621645582931-d1d3e6564943?w=700&h=525&q=75&auto=format&fit=crop', alt: 'Cadeira clássica de barbeiro em couro e cromo' },
];

const TESTIMONIALS = [
  { id: 1, quote: 'Melhor barbearia que já fui. Atendimento pontual e corte impecável.', author: 'Rafael M.' },
  { id: 2, quote: 'O agendamento online facilitou muito, não perco mais tempo esperando.', author: 'Carlos E.' },
  { id: 3, quote: 'Ambiente excelente e o pessoal é muito atencioso. Recomendo!', author: 'Bruno S.' },
  { id: 4, quote: 'Faço a barba lá há meses, nunca decepcionou.', author: 'Thiago A.' },
];

/* 0 = Domingo ... 6 = Sábado. open/close em minutos desde 00:00, null = fechado */
const BUSINESS_HOURS = [
  { day: 'Domingo', weekday: 0, open: null, close: null },
  { day: 'Segunda-feira', weekday: 1, open: '09:00', close: '19:00' },
  { day: 'Terça-feira', weekday: 2, open: '09:00', close: '19:00' },
  { day: 'Quarta-feira', weekday: 3, open: '09:00', close: '19:00' },
  { day: 'Quinta-feira', weekday: 4, open: '09:00', close: '19:00' },
  { day: 'Sexta-feira', weekday: 5, open: '09:00', close: '20:00' },
  { day: 'Sábado', weekday: 6, open: '09:00', close: '17:00' },
];
