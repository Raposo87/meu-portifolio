let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Função para fechar o menu
const closeMenu = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Adiciona evento de click em cada link da navegação
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu(); // Fecha o menu quando clicar em um link
    });
});

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Opcional: Fechar menu quando clicar fora
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        closeMenu();
    }
});

// -------- efeito cartas --------//

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Toggle active class
    if (card.classList.contains('active')) {
      card.classList.remove('active');
    } else {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    }
  });
});

// Opcional: Remove active ao clicar fora das cartas
document.addEventListener('click', (e) => {
  if (!e.target.closest('.card')) {
    cards.forEach(card => card.classList.remove('active'));
  }
});

newEventForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const imageFile = imageInput.files[0];
  let imageData = null;
  
  try {
      // Processamento assíncrono da imagem
      if (imageFile) {
          imageData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target.result);
              reader.onerror = (error) => reject(error);
              reader.readAsDataURL(imageFile);
          });
      }
      
      await saveEvent(imageData); // Aguarda o salvamento
      
  } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao processar evento: ' + error.message);
  }
});

function renderCarousel(upcomingEvents) {
  carouselTrack.innerHTML = '';
  currentPosition = 0; // Resetar posição
  
  if (upcomingEvents.length === 0) {
      carouselTrack.innerHTML = '<p class="carousel-item">Nenhum evento nas próximas 4 horas.</p>';
      return;
  }
  
  upcomingEvents.forEach(event => {
      const eventDate = new Date(event.dateTime);
      const formattedDate = eventDate.toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Sao_Paulo'
      });
      
      const carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      carouselItem.innerHTML = `
          ${event.image ? `<img src="${event.image}" alt="${event.name}">` : ''}
          <div class="event-content">
              <h3>${event.name}</h3>
              <p class="date">${formattedDate}</p>
              <p class="location">📍 ${event.location}</p>
              <p>${event.description}</p>
          </div>
      `;
      
      carouselItem.addEventListener('click', () => {
          const eventElement = document.querySelector(`[data-id="${event.id}"]`);
          if (eventElement) eventElement.scrollIntoView({ behavior: 'smooth' });
      });
      
      carouselTrack.appendChild(carouselItem);
  });
  
  startCarousel();
}